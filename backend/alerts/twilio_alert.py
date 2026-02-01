import os
from twilio.rest import Client
from supabase import create_client
from fastapi import HTTPException


supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
twilio_sid = os.getenv("TWILIO_ACCOUNT_SID")
twilio_token = os.getenv("TWILIO_AUTH_TOKEN")
FROM_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")

supabase = None
if supabase_url and supabase_key:
    try:
        supabase = create_client(supabase_url, supabase_key)
    except Exception as e:
        print(f"Warning: Supabase init failed: {e}")

twilio = None
if twilio_sid and twilio_token:
    try:
        twilio = Client(twilio_sid, twilio_token)
    except Exception as e:
        print(f"Warning: Twilio init failed: {e}")

CYBERCELL_NUMBER = "+919999999999"
POLICE_NUMBER = "+91112"


def verify_user(access_token: str):
    if not supabase:
        # Mock user for dev/demo if Supabase is missing
        print("Supabase not configured, bypassing verification")
        class MockUser:
            pass
        user_obj = MockUser()
        user_obj.user = MockUser()
        user_obj.user.email = "demo@example.com"
        return user_obj

    user = supabase.auth.get_user(access_token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid user")
    return user


def send_alert(to_number: str, message: str):
    if not twilio or not FROM_NUMBER:
        print(f"Twilio not configured. Would send '{message}' to {to_number}")
        return

    try:
        twilio.messages.create(
            body=message,
            from_=FROM_NUMBER,
            to=to_number
        )
    except Exception as e:
        print(f"Failed to send Twilio alert: {e}")


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

