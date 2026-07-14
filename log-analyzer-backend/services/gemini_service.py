import json
import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


SYSTEM_PROMPT = """
You are an AI Log Analysis Assistant.

Your responsibilities:

- Analyze application logs.
- Answer follow-up questions using previous conversation.
- Explain errors clearly.
- Suggest practical debugging steps.
- Identify technologies whenever possible
  (Java, Spring Boot, Docker, Kubernetes, PostgreSQL,
   MySQL, MongoDB, Kafka, Redis, Python, Node.js, Linux, etc.)

If OCR text is present,
treat it as the uploaded log.

Return ONLY valid JSON.

Schema:

{
    "summary": "",
    "root_cause": "",
    "severity": "",
    "recommendations": [
        "",
        ""
    ]
}

Rules:

- Never return markdown.
- Never wrap JSON inside ``` blocks.
- Be concise.
- If information is insufficient,
  clearly mention that.
"""


def analyze_chat(messages):
    """
    Analyze a complete conversation using Gemini.
    """

    conversation = [SYSTEM_PROMPT]

    for message in messages:

        role = message["role"]
        content = message["content"]

        if role == "user":
            conversation.append(f"User: {content}")
        else:
            conversation.append(f"Assistant: {content}")

    prompt = "\n\n".join(conversation)

    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=prompt,
    )

    response_text = response.text.strip()

    # Remove markdown fences if Gemini adds them
    if response_text.startswith("```json"):
        response_text = (
            response_text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

    elif response_text.startswith("```"):
        response_text = (
            response_text
            .replace("```", "")
            .strip()
        )

    try:
        return json.loads(response_text)

    except Exception:

        return {
            "summary": response.text,
            "root_cause": "",
            "severity": "Unknown",
            "recommendations": []
        }