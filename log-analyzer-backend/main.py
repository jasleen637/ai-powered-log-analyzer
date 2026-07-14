import json
from typing import Optional

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from services.gemini_service import analyze_chat
from services.ocr_service import extract_text

app = FastAPI(
    title="AI Log Analyzer API",
    description="Backend API for AI-powered log analysis",
    version="1.0.0",
)

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
        "message": "AI Log Analyzer Backend is running 🚀"
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }


@app.post("/chat")
async def chat(
        conversation: str = Form(...),
        image: Optional[UploadFile] = File(None),
):
    # Parse conversation JSON
    messages = json.loads(conversation)

    # OCR
    if image:
        image_bytes = await image.read()

        extracted_text = extract_text(image_bytes)

        if extracted_text:

            # Append OCR text to latest user message
            messages[-1]["content"] += (
                    "\n\nOCR Extracted Text:\n"
                    + extracted_text
            )

    # Gemini
    analysis = analyze_chat(messages)

    return {
        "status": "success",
        "analysis": analysis,
    }