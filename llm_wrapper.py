from groq import Groq
import os

client = Groq(api_key=os.environ["GROQ_API_KEY"])

def generate_risk_analysis(input_text, label, risk_level):
    prompt = f"""
    Analyze the following content flagged as a '{label}' with a '{risk_level}' risk level.
    CONTENT: "{input_text}"
    
    1. Provide a 2-sentence explanation of why this is labeled as HIGH, MEDIUM, or LOW risk.
    2. Provide 3 immediate safety steps for the user if the risk is HIGH or MEDIUM.
    
    Format:
    Explanation: [Text]
    Next Steps: [Bullet points]
    """
    
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You are a cybersecurity risk analyst."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )
    return response.choices[0].message.content