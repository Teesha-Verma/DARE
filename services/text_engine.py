import re

def extract_text_signals(text):
    signals = []

    if re.search(r"shocking|breaking|you won’t believe", text.lower()):
        signals.append("clickbait")

    if text.count("!") > 5:
        signals.append("emotional_language")

    if "source" not in text.lower():
        signals.append("source_missing")

    return signals
