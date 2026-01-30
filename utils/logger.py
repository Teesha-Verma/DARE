import datetime

def log_event(agent, message):
    print(f"[{datetime.datetime.now()}] {agent}: {message}")
