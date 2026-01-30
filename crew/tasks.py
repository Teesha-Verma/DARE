from crewai import Task
from .agents import intake_agent, signal_agent, risk_agent, policy_agent, report_agent

intake_task = Task(description="Validate input and extract metadata", agent=intake_agent)
signal_task = Task(description="Extract authenticity and manipulation signals", agent=signal_agent)
risk_task = Task(description="Calculate overall risk score", agent=risk_agent)
policy_task = Task(description="Determine safe platform actions", agent=policy_agent)
report_task = Task(description="Generate user-facing report", agent=report_agent)
