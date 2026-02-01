from hf_client import hf_zero_shot_classify
from labels import SCAM_LABELS
from rule_engine import rule_based_detect
from llm_wrapper import generate_risk_analysis


# Risk threshold logic (moved here)
def get_risk_level(confidence: float) -> str:
    if confidence >= 0.7:
        return "HIGH"
    elif confidence >= 0.4:
        return "MEDIUM"
    else:
        return "LOW"


def analyze_text(text: str):
    # Rule-based detection
    rule_hits = rule_based_detect(text)

    # ML detection via HF
    ml_result = hf_zero_shot_classify(text, SCAM_LABELS)

    top_label = ml_result["labels"][0]
    top_score = ml_result["scores"][0]

    # Fusion logic
    if rule_hits:
        final_label = rule_hits[0]
        confidence = max(top_score, 0.9)
        source = "rule + ml"
    else:
        final_label = top_label
        confidence = top_score
        source = "ml"

    risk_level = get_risk_level(confidence)

    # Optimization: Skip LLM explanation for safe content
    analysis_text = "Content appears safe. No further analysis required."
    if risk_level in ["MEDIUM", "HIGH"]:
        try:
            analysis_text = generate_risk_analysis(text, final_label, risk_level)
        except Exception as e:
            print(f"LLM Analysis failed: {e}")
            analysis_text = f"Automated analysis failed, but risk level is {risk_level}."

    return {
        "pattern_detected": final_label,
        "risk_level": risk_level,
        "confidence": round(confidence, 3),
        "rules_triggered": rule_hits,
        "decision_source": source,
        "analysis": analysis_text
    }
