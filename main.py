import os
import shutil
import tempfile
from typing import Optional
from dotenv import load_dotenv

# Load env vars immediately
load_dotenv()

from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, validator
import requests

# Import pipelines and alerts
from pipelines.ocr_pipeline import analyze_screenshot
from pipelines.text_pipeline import analyze_text
from pipelines.voice_pipeline import analyze_voice
from rag_template.rag_retriever import get_template
from rag_template.rag_generator import generate_report

# Handle broken module gracefully
try:
    from alerts.twilio_alert import trigger_critical_alerts
except SyntaxError:
    print("WARNING: alerts/twilio_alert.py contains a SyntaxError (likely 'from=' keyword). Alerting crippled.")
    trigger_critical_alerts = None
except ImportError:
    trigger_critical_alerts = None

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI(title="Naive-Baes-Hacknagpur-2.0 Backend")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class TextRequest(BaseModel):
    text: str

class ReportRequest(BaseModel):
    complaint_type: str
    incident_text: str

    @validator('complaint_type')
    def normalize_type(cls, v):
        return v.lower().strip().replace(" ", "_")

    @validator('incident_text')
    def sanitize_text(cls, v):
        return v.strip()

class AlertRequest(BaseModel):
    # access_token removed, handled via header
    incident_text: str
    emergency_contact: Optional[str] = None
    location: str = "India"

# Endpoints

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/analyze/text")
def api_analyze_text(request: TextRequest):
    try:
        result = analyze_text(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/screenshot")
def api_analyze_screenshot(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Only images are allowed.")
    
    suffix = os.path.splitext(file.filename)[1] if file.filename else ""
    # Create a temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    try:
        result = analyze_screenshot(tmp_path)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Cleanup
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

@app.post("/analyze/voice")
def api_analyze_voice(file: UploadFile = File(...)):
    if not file.content_type.startswith("audio/") and file.content_type != "application/octet-stream":
         raise HTTPException(status_code=400, detail="Invalid file type. Only audio files are allowed.")

    suffix = os.path.splitext(file.filename)[1] if file.filename else ""
    # Create a temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    try:
        result = analyze_voice(tmp_path)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Cleanup
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

@app.post("/report/generate")
def api_generate_report(request: ReportRequest):
    try:
        # Check logic: get_template raises ValueError if invalid type
        template = get_template(request.complaint_type)
        report = generate_report(template, request.incident_text)
        return {"report": report}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except requests.RequestException:
        raise HTTPException(status_code=502, detail="External service (LLM) unreachable")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/alert/trigger")
def api_trigger_alert(request: AlertRequest, token: str = Depends(oauth2_scheme)):
    if trigger_critical_alerts is None:
        raise HTTPException(
            status_code=503, 
            detail="Alert system unavailable due to internal syntax error in twilio_alert module."
        )
    try:
        trigger_critical_alerts(
            token,
            request.incident_text,
            request.emergency_contact,
            request.location
        )
        return {"status": "Critical alerts triggered"}
    except HTTPException as he:
        # Re-raise authentication errors (401) correctly
        raise he
    except requests.RequestException:
        raise HTTPException(status_code=502, detail="External service (Supabase/Twilio) unreachable")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
