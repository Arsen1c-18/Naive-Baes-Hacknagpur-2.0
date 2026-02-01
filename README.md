# 🛡️ Naive Baes - Digital Safety Companion

> **HackNagpur 2.0 Project**  
> *Empowering users against deepfakes, online harassment, and digital threats with AI.*

![Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-purple)
![Python](https://img.shields.io/badge/Python-3.10%2B-blue)
![React](https://img.shields.io/badge/React-18-blue)

---

## 📖 Overview

PS : S4H - 5 
**Safety Companion** is a comprehensive digital safety platform designed to be your personal guardian in the digital age. It leverages advanced AI to detect manipulated media and analyzes text for malicious intent, providing real-time protection and reporting tools.

Unlike standard safety apps,it uses a hybrid analysis approach—combining local, privacy-focused models (Whisper, EasyOCR) with powerful cloud LLMs (Llama 3 via Groq) for detailed explanations.

---

## 🏗️ Project Structure

The project follows a modern monorepo-style structure, separating the React frontend from the Python FastAPI backend.

```text
Naive-Baes-Hacknagpur-2.0/
├── backend/                  # Python FastAPI Backend
│   ├── alerts/               # Emergency alert modules (Twilio)
│   ├── pipelines/            # Core AI Logic Modules
│   │   ├── ocr_pipeline.py   # Image text extraction (EasyOCR + GPU)
│   │   ├── text_pipeline.py  # Text risk analysis (HF + LLM)
│   │   └── voice_pipeline.py # Audio transcription (Faster-Whisper)
│   ├── rag_template/         # Knowledge base for Safety Chatbot
│   ├── main.py               # API Entry point & Routes
│   ├── config.py             # Configuration management
│   ├── rule_engine.py        # Static rule-based detection
│   └── requirements.txt      # Python dependencies
│
└──
frontend/                 # React + Vite Frontend
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── contexts/         # React Context (Auth, etc.)
    │   ├── lib/              # Utilities (API, Supabase client)
    │   ├── pages/            # Application Routes
    │   │   ├── Auth/         # Login & Signup
    │   │   ├── MediaCheck.jsx    # Deepfake Detector UI
    │   │   ├── TextCheck.jsx     # Text Analysis UI
    │   │   └── ...
    │   └── App.jsx           # Main Router
    └── package.json          # Node dependencies

```

---

## 🌟 Key Features

| Feature | Description | Tech Powered By |
|---------|-------------|-----------------|
| **🕵️‍♀️ Media Guard** | Detect deepfakes and AI-generated content in images and audio. | `Faster-Whisper` • `EasyOCR` • `ML Classification` |
| **💬 Text Threat Analyzer** | Analyze DMs, emails, and comments for harassment, spam, or scams. | `Hugging Face` • `Llama 3 (Groq)` |
| **🤖 Safety Chatbot** | Interactive assistant for instant digital safety advice and guidelines. | `RAG Pipeline` • `LLM` |
| **🚨 Emergency Alerts** | One-click critical alerts to emergency contacts via SMS with location data. | `Twilio` • `Geolocation API` |
| **📝 Report Generator** | Generate formal, detailed reports for cybercrime reporting based on incidents. | `LLM Summarization` |

---

## ⚡ Performance Optimizations

We built this with speed in mind:
-   **🚀 GPU Acceleration**: The backend automatically detects CUDA-enabled GPUs to speed up OCR tasks (`ocr_pipeline.py`) by 10x.
-   **⚡ Tiny Whisper Model**: Switched to the `tiny` model for audio transcription (`voice_pipeline.py`), reducing latency to near-zero while maintaining sufficient accuracy for safety checks.
-   **🧠 Smart Caching & Logic**: The system intelligently skips expensive LLM calls for content detected as "Safe" (`text_pipeline.py`), ensuring instant feedback for the majority of user interactions.

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
-   **Node.js** (v18 or higher)
-   **Python** (v3.10 or higher)
-   **Supabase Account** (for Auth & DB)
-   **Groq API Key** (for AI analysis)

### 1️⃣ Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate
# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Configuration (.env)**  
Create a `.env` file in the `backend` folder:
```ini
SUPABASE_URL="your_supabase_url"
SUPABASE_KEY="your_supabase_anon_key"
GROQ_API_KEY="your_groq_api_key"
TWILIO_ACCOUNT_SID="your_twilio_sid"   # Optional
TWILIO_AUTH_TOKEN="your_twilio_token"  # Optional
TWILIO_PHONE_NUMBER="your_twilio_number" # Optional
HF_READ_TOKEN="your_huggingface_token"
```

**Run Server**
```bash
python main.py
# Server runs at http://localhost:8000
```

### 2️⃣ Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
```

**Configuration (.env)**  
Create a `.env` file in the `frontend` folder:
```ini
VITE_SUPABASE_URL="your_supabase_url"
VITE_SUPABASE_ANON_KEY="your_supabase_anon_key"
```

**Run Client**
```bash
npm run dev
# App runs at http://localhost:5173
```

---

## 🤝 Contributing

This project was built for **HackNagpur 2.0**. Contributions are welcome!
1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Built with ❤️ by the Naive Baes Team.*
