def safety_decision(score):
    if score >= 75:
        return "block_content"
    elif score >= 50:
        return "warn_user"
    return "allow"
