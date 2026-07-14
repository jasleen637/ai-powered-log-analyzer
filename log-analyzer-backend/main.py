from typing import Optional

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from services.gemini_service import analyze_logs
from services.ocr_service import extract_text

app = FastAPI(
    title="AI Log Analyzer API",
    description="Backend API for AI-powered log analysis",
    version="1.0.0",
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def home():
    return {
        "status": "running",
        "message": "AI Log Analyzer Backend is running 🚀",
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
    }


@app.post("/analyze")
async def analyze(
        logs: Optional[str] = Form(None),
        image: Optional[UploadFile] = File(None),
):
    extracted_text = logs or ""

    # OCR (placeholder for now)
    if image:
        image_bytes = await image.read()
        extracted_text += extract_text(image_bytes)

    # Gemini Analysis
    analysis = analyze_logs(extracted_text)

    return {
        "status": "success",
        "logs_provided": logs is not None,
        "image_provided": image is not None,
        "analysis": analysis,
    }