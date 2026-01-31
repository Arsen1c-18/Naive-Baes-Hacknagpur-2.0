import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

class SafetyChat:
    def __init__(self):
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        self.model = "llama-3.1-8b-instant"
        self.system_prompt = (
            "You are a Digital Safety Companion. Your sole purpose is to help users "
            "navigate scams, cybercrime, and online harassment. \n\n"
            "RULES:\n"
            "1. ONLY discuss safety, scams, harassment, or reporting fraud.\n"
            "2. If asked about unrelated topics, politely refuse and redirect the user.\n"
            "3. Provide actionable advice (e.g., block, report, secure accounts).\n"
            "4. Keep responses concise and supportive.\n"
        )

    def get_response(self, user_input):
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": user_input}
        ]
        try:
            completion = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.4,
                max_tokens=500
            )
            return completion.choices[0].message.content
        except Exception as e:
            return f"Error connecting to Safety Engine: {str(e)}"
