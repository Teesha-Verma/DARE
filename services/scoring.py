def compute_risk(signals):
    weights = {
        "deepfake": 30,
        "audio_splice": 20,
        "metadata_missing": 15,
        "clickbait": 10,
        "emotional_language": 10,
        "compression": 10,
        "source_missing": 15
    }

    score = 0
    for key in signals:
        score += weights.get(key, 5)

    return min(score, 100)
