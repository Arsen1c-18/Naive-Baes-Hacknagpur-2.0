import easyocr
from pipelines.text_pipeline import analyze_text

# Initialize EasyOCR reader once (English + Hindi)
reader = easyocr.Reader(['en', 'hi'], gpu=False)


def extract_text_from_image(image_path: str) -> str:
    """
    Extract text from screenshot using EasyOCR
    """
    results = reader.readtext(image_path, detail=0)
    text = " ".join(results)
    return text.strip()


def analyze_screenshot(image_path: str):
    """
    Screenshot → OCR → Scam detection
    """
    extracted_text = extract_text_from_image(image_path)

    if not extracted_text:
        return {
            "error": "No readable text found in screenshot"
        }

    result = analyze_text(extracted_text)
    result["extracted_text"] = extracted_text
    return result
