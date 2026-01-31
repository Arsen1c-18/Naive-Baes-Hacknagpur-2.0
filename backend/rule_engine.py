import re

RULES = {
    "bank impersonation scam": [
        r"bank", r"account.*block", r"upi", r"verify", r"link"
    ],
    "job scam": [
        r"job", r"work from home", r"registration fee", r"easy money"
    ],
    "OTP or KYC fraud": [
        r"otp", r"kyc", r"verification code"
    ],
    "threat based extortion": [
        r"if you don't", r"otherwise", r"leak", r"expose", r"pay"
    ],
    "sexual harassment": [
        r"send photo", r"explicit", r"sleep with", r"touch"
    ]
}

def rule_based_detect(text: str):
    text = text.lower()
    hits = []

    for label, patterns in RULES.items():
        for pattern in patterns:
            if re.search(pattern, text):
                hits.append(label)
                break

    return hits
