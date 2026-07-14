# AI Interactive Log Analyzer

An intelligent, chat-based tool that helps users analyze application logs interactively. Users can paste logs directly or upload images of log files, and the system automatically extracts text using OCR, classifies and aggregates log entries, and provides actionable insights powered by an LLM.

## Features

- **Text Log Input**: Paste logs directly into the chat interface
- **Image Upload**: Upload screenshots or log images for OCR-based text extraction
- **AI-Powered Analysis**: Contextual root-cause detection and troubleshooting suggestions using Google Gemini
- **Interactive Chat**: Ask follow-up questions about patterns, errors, and possible fixes
- **Visual Insights**: Charts showing error trends, severity distribution, and time-based patterns
- **Session History**: Save and review analysis sessions

## Tech Stack

- **Frontend**: React
- **Backend**: FastAPI, Python
- **OCR**: pytesseract
- **Data Processing**: pandas
- **Visualization**: matplotlib
- **AI/LLM**: Google Gemini

## Installation

### Backend

1. Install dependencies:

```bash
cd log-analyzer-backend
pip install -r requirements.txt
```

2. Set up environment variables:

```bash
export GEMINI_API_KEY="your_api_key"
```

3. Run the server:

```bash
uvicorn main:app --reload
```

### Frontend

1. Install dependencies:

```bash
cd log-analyzer-frontend
npm install
```

2. Run the app:

```bash
npm run dev
```

## Usage

1. Start both backend and frontend servers
2. Open the frontend in your browser
3. Paste logs or upload images
4. View AI-powered analysis and visualizations
5. Ask follow-up questions in the chat

## Architecture

- Logs/images → Frontend → FastAPI backend
- Backend → OCR (pytesseract) → Text extraction
- Backend → pandas → Structured data
- Backend → Google Gemini → Analysis & suggestions
- Backend → matplotlib → Visualizations
- Frontend → Display results
