from pipelines.ocr_pipeline import analyze_screenshot
from pipelines.text_pipeline import analyze_text
# from pipelines.voice_pipeline import analyze_voice

from rag_template.rag_retriever import get_template
from rag_template.rag_generator import generate_report


def main():
    # ------------------ DETECTION DEMO ------------------

    print("\n--- TEXT TEST ---")
    msg = "Aapka bank account turant block ho jayega, link par click karo"
    print(analyze_text(msg))

    print("\n--- SAFE TEXT TEST ---")
    msg2 = "Hi, I recently bought a device and would like a refund"
    print(analyze_text(msg2))

    print("\n--- SCREENSHOT TEST ---")
    # Make sure sample_ss.png exists
    print(analyze_screenshot("sample_ss.png"))

    # print("\n--- VOICE TEST ---")
    # print(analyze_voice("sample.wav"))

    # ------------------ REPORT GENERATION ------------------

    print("\nDescribe what happened (this will be converted into a report):\n")
    incident_text = input("> ")

    print("\nWhat type of complaint do you want?\n")
    print("1. Cybercrime Complaint")
    print("2. FIR Narrative")
    print("3. Platform Report\n")

    choice = input("Enter choice (1/2/3): ").strip()

    type_map = {
        "1": "cybercrime",
        "2": "fir",
        "3": "platform"
    }

    complaint_type = type_map.get(choice)
    if not complaint_type:
        print("Invalid choice.")
        return

    template = get_template(complaint_type)
    report = generate_report(template, incident_text)

    print("\n========== COPY-PASTE REPORT ==========\n")
    print(report)
    print("\n========== END ==========\n")


if __name__ == "__main__":
    main()
