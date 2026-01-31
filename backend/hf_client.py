import requests
from config import HF_API_URL, HF_HEADERS

def hf_zero_shot_classify(text: str, candidate_labels: list):
    payload = {
        "inputs": text,
        "parameters": {
            "candidate_labels": candidate_labels
        }
    }

    response = requests.post(
        HF_API_URL,
        headers=HF_HEADERS,
        json=payload,
        timeout=30
    )

    response.raise_for_status()
    return response.json()
