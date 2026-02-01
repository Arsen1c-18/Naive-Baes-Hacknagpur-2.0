import os
from twilio.rest import Client
from supabase import create_client
from fastapi import HTTPException

supabase = create_client(
    os.environ["SUPABASE_URL"],
    os.environ["SUPABASE_KEY"]
)

twilio = Client(
    os.environ["TWILIO_ACCOUNT_SID"],
    os.environ["TWILIO_AUTH_TOKEN"]
)

FROM_NUMBER = os.environ["TWILIO_PHONE_NUMBER"]

CYBERCELL_NUMBER = "+919999999999"
POLICE_NUMBER = "+91112"


def verify_user(access_token: str):
    user = supabase.auth.get_user(access_token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid user")
    return user


def send_alert(to_number: str, message: str):
    twilio.messages.create(
        body=message,
        from_=FROM_NUMBER,
        to=to_number
    )


def trigger_critical_alerts(
    access_token: str,
    incident_text: str,
    emergency_contact: str,
    location: str = "India"
):
    user = verify_user(access_token)

    alert_msg = (
        "CRITICAL DIGITAL SAFETY ALERT \n\n"
        f"User: {user.user.email}\n"
        f"Location: {location}\n\n"
        "A high-risk digital incident was detected.\n\n"
        f"Incident summary:\n{incident_text[:300]}...\n\n"
        "Please take immediate action."
    )

    if emergency_contact:
        send_alert(emergency_contact, alert_msg)

    send_alert(CYBERCELL_NUMBER, alert_msg)

