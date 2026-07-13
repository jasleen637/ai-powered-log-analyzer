from typing import Optional

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI Log Analyzer API",
    description="Backend API for AI-powered log analysis",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React frontend
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


@app.post("/analyze")
async def analyze(
        logs: Optional[str] = Form(None),
        image: Optional[UploadFile] = File(None),
):
    extracted_text = ""

    # Handle text logs
    if logs:
        extracted_text = logs

    # Handle uploaded image (OCR will be added later)
    if image:
        image_bytes = await image.read()

        # TODO:
        # extracted_text += extract_text_from_image(image_bytes)

    # TODO:
    # 1. Parse extracted text
    # 2. Analyze using Gemini
    # 3. Generate charts with matplotlib
    # 4. Process data using pandas

    return {
        "status": "success",
        "logs_provided": logs is not None,
        "image_provided": image is not None,
        "extracted_text_preview": (
            extracted_text[:200] if extracted_text else None
        ),
        "analysis": "Placeholder: Gemini analysis will appear here.",
        "recommendations": [],
        "charts": []
    }