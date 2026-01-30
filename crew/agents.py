from crewai import Agent

intake_agent = Agent(
    role="Intake Agent",
    goal="Validate and normalize incoming digital content",
    backstory="Expert in content ingestion and metadata extraction",
    verbose=True
)

signal_agent = Agent(
    role="Evidence Agent",
    goal="Extract authenticity signals from content",
    backstory="Specialist in misinformation detection and media forensics",
    verbose=True
)

risk_agent = Agent(
    role="Reasoning Agent",
    goal="Compute defensible authenticity risk score",
    backstory="Expert in probabilistic reasoning and digital trust",
    verbose=True
)

policy_agent = Agent(
    role="Safety Agent",
    goal="Map risk score to platform safety and ethics policies",
    backstory="Trust and safety compliance specialist",
    verbose=True
)

report_agent = Agent(
    role="Report Agent",
    goal="Generate explainable risk assessment report",
    backstory="Professional technical writer for AI systems",
    verbose=True
)
