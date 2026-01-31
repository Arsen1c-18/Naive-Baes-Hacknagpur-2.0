from groq import Groq
import os

client = Groq(api_key=os.environ["GROQ_API_KEY"])

def generate_report(template: str, incident_text: str) -> str:
    prompt = f"""
{template}

USER INCIDENT DESCRIPTION:
{incident_text}

Generate a structured, formal report suitable for official submission.
Do not ask questions.
Do not invent facts.
"""

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "system",
                "content": "You generate formal complaint reports."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
        max_tokens=400
    )

    return completion.choices[0].message.content
