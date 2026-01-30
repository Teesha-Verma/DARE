import os
from dotenv import load_dotenv

load_dotenv()

LLM_PROVIDER = os.getenv("LLM_PROVIDER", "gemini")
LLM_MODEL = os.getenv("LLM_MODEL", "gemini/gemini-1.5-flash")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost/dare")
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

MOCK_MODE = os.getenv("MOCK_MODE", "false").lower() == "true"