import os

HF_API_URL = "https://router.huggingface.co/hf-inference/models/joeddav/xlm-roberta-large-xnli"
HF_LLM_URL = "https://router.huggingface.co/hf-inference/models/google/gemma-2-2b-it"
HF_HEADERS = {
    "Authorization": f"Bearer {os.environ['HF_TOKEN']}",
}
