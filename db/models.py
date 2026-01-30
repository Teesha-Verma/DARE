from sqlalchemy import Column, Integer, String, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(String)
    content_type = Column(String)
    signals = Column(JSON)
    risk_score = Column(Integer)
    decision = Column(String)
