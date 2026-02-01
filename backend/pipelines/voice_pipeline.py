from faster_whisper import WhisperModel
from pipelines.text_pipeline import analyze_text

whisper = WhisperModel("tiny", compute_type="int8", cpu_threads=4)

def analyze_voice(audio_path: str):
    segments, _ = whisper.transcribe(audio_path)
    text = " ".join(segment.text for segment in segments)

    result = analyze_text(text)
    result["transcribed_text"] = text
    return result
