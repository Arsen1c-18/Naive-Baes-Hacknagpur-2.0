from pipelines.ocr_pipeline import analyze_screenshot
from pipelines.text_pipeline import analyze_text
# from pipelines.voice_pipeline import analyze_voice

if __name__ == "__main__":

    print("\n--- TEXT TEST ---")
    msg = "Aapka bank account turant block ho jayega, link par click karo"
    print(analyze_text(msg))

    print("\n--- SAFE TEXT TEST ---")
    msg2 = "Hi, I recently bought a device and would like a refund"
    print(analyze_text(msg2))

    print("\n--- SCREENSHOT ---")
    print(analyze_screenshot("sample_ss.png"))

    # print("\n--- VOICE TEST ---")
    # print(analyze_voice("sample.wav"))
