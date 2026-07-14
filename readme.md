# 🤖 AI Interactive Log Analyzer

An AI-powered conversational log analysis assistant that helps developers understand application logs, stack traces, and error screenshots.

Users can paste logs directly or upload screenshots of logs, and the application automatically extracts text using OCR, analyzes the issue using Google Gemini, and provides structured root cause analysis with actionable recommendations. The assistant also supports follow-up questions, allowing users to have a natural conversation about the detected issues.

---

## ✨ Features

### 💬 Conversational AI Chat
- Chat-based interface for analyzing application logs
- Ask follow-up questions about previous responses
- Conversation history persists using browser session storage

### 📄 Log Analysis
- Paste application logs directly into the chat
- Analyze Java, Spring Boot, Docker, Kubernetes, PostgreSQL and other common backend logs
- Detect probable root cause
- Identify issue severity
- Generate troubleshooting recommendations

### 🖼 OCR Support
- Upload screenshots containing logs or error messages
- Extract text using Tesseract OCR
- Automatically combine OCR output with user prompts before analysis

### 🤖 AI-Powered Insights
Google Gemini provides:

- Issue summary
- Root cause analysis
- Severity assessment
- Actionable recommendations

### 💾 Session Persistence
- Conversation is stored using browser session storage
- Refreshing the page preserves the current chat

---

# 🏗 Architecture

```
                React + Material UI
                        │
                        ▼
              Chat Conversation
                        │
                        ▼
                 FastAPI Backend
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
     OCR Service                Conversation
 (Tesseract + Pillow)             History
          │                           │
          └─────────────┬─────────────┘
                        ▼
                  Google Gemini
                        │
                        ▼
           Structured AI Response
                        │
                        ▼
                  React Chat UI
```

---

# 🛠 Tech Stack

### Frontend

- React
- Material UI
- Axios

### Backend

- FastAPI
- Python

### AI

- Google Gemini API

### OCR

- Tesseract OCR
- pytesseract
- Pillow

### Storage

- Browser Session Storage

---

# 📂 Project Structure

```
AI-Interactive-Log-Analyzer/
│
├── frontend/
│   ├── components/
│   ├── service/
│   └── App.jsx
│
├── backend/
│   ├── services/
│   │     ├── gemini_service.py
│   │     └── ocr_service.py
│   │
│   ├── main.py
│   └── requirements.txt
│
└── README.md
```

---

# 🚀 Installation

## Backend

Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file

```text
GEMINI_API_KEY=YOUR_API_KEY
```

Run the backend

```bash
uvicorn main:app --reload
```

---

## Frontend

Install dependencies

```bash
cd frontend
npm install
```

Run the frontend

```bash
npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:8000
```

Swagger API:

```
http://localhost:8000/docs
```

---

# 💡 How It Works

1. User enters logs or uploads a screenshot.
2. OCR extracts text from uploaded images (if applicable).
3. The conversation history and extracted text are sent to the FastAPI backend.
4. Google Gemini analyzes the logs.
5. The assistant returns:
    - Summary
    - Root Cause
    - Severity
    - Recommendations
6. Users can ask follow-up questions in the same conversation.

---

# 📌 Example Use Cases

- Analyze Java stack traces
- Debug Spring Boot exceptions
- Investigate Docker container failures
- Understand Kubernetes pod errors
- Troubleshoot PostgreSQL connection issues
- Analyze screenshots of production logs

---

# 🔮 Future Enhancements

- PDF log support
- Advanced OCR preprocessing
- Download analysis reports
- Metrics visualization for structured logs
- Support for additional LLM providers

---

# 👩‍💻 Author

**Jasleen Kaur Wahi**

Built as a full-stack AI application combining OCR, LLMs, and conversational interfaces to simplify application log analysis.