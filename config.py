import os

HF_API_URL = "https://router.huggingface.co/hf-inference/models/joeddav/xlm-roberta-large-xnli"
HF_HEADERS = {
    "Authorization": f"Bearer {os.environ['HF_TOKEN']}",
}
