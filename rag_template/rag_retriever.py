import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def get_template(complaint_type: str) -> str:
    template_map = {
        "cybercrime": "cybercrime.txt",
        "fir": "fir.txt",
        "platform": "platform.txt"
    }

    filename = template_map.get(complaint_type)
    if not filename:
        raise ValueError("Invalid complaint type")

    path = os.path.join(BASE_DIR, filename)

    with open(path, "r", encoding="utf-8") as f:
        return f.read()
