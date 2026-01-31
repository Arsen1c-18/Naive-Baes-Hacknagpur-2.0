from groq import Groq
import os

client = Groq(api_key=os.environ["GROQ_API_KEY"])

def generate_report(template: str, incident_text: str) -> str:
    prompt = f"""
{template}

USER INCIDENT DESCRIPTION:
{incident_text}

Write a complete, structured complaint that can be directly copied and submitted.
Do not ask questions.
Do not invent details.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You write formal complaint documents."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3,
        max_tokens=450
    )

    return response.choices[0].message.content
