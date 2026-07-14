import json
import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def analyze_logs(log_text: str):
    """
    Analyze application logs using Gemini.
    Returns structured JSON.
    """

    if not log_text.strip():
        return {
            "summary": "No logs were provided.",
            "root_cause": "",
            "severity": "Low",
            "recommendations": []
        }

    prompt = f"""
You are a Senior Site Reliability Engineer (SRE) and Backend Architect.

Your responsibility is to analyze application logs and provide accurate troubleshooting advice.

The logs may belong to:

- Java
- Spring Boot
- Python
- Node.js
- Docker
- Kubernetes
- PostgreSQL
- MySQL
- MongoDB
- Kafka
- Redis
- Nginx
- Apache
- Linux
- Windows
- AWS
- Azure
- GCP

Analyze the logs carefully.

Determine:

1. What happened?
2. What is the most likely root cause?
3. How severe is the issue?
4. What should the developer investigate?
5. What actions should be taken?

Return ONLY valid JSON.

Schema:

{{
    "summary": "",
    "root_cause": "",
    "severity": "Low | Medium | High | Critical",
    "recommendations": [
        "",
        "",
        ""
    ]
}}

Rules:

- Return ONLY JSON.
- Never use markdown.
- Never wrap JSON inside ``` blocks.
- Do not invent information.
- If the logs are incomplete, clearly state that additional logs are required.
- Keep summary concise.
- Root cause should be one paragraph maximum.
- Recommendations should be practical.
- Maximum 5 recommendations.
- Mention the technology/framework if you can identify it.

Logs:

{log_text}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=prompt,
    )

    response_text = response.text.strip()

    if response_text.startswith("```json"):
        response_text = response_text.replace("```json", "").replace("```", "").strip()

    elif response_text.startswith("```"):
        response_text = response_text.replace("```", "").strip()

    try:
        return json.loads(response_text)

    except Exception:

        return {
            "summary": response.text,
            "root_cause": "",
            "severity": "Unknown",
            "recommendations": []
        }