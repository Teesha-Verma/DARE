from fastapi import FastAPI
from crew.crew import dare_crew
from utils.validators import validate_payload

app = FastAPI()

@app.post("/analyze")
async def analyze(payload: dict):
    if not validate_payload(payload):
        return {"error": "Invalid request"}

    result = dare_crew.kickoff(inputs=payload)
    return {"result": result}
