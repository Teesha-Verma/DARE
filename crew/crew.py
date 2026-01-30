from crewai import Crew
from .tasks import intake_task, signal_task, risk_task, policy_task, report_task

dare_crew = Crew(
    agents=[
        intake_task.agent,
        signal_task.agent,
        risk_task.agent,
        policy_task.agent,
        report_task.agent
    ],
    tasks=[
        intake_task,
        signal_task,
        risk_task,
        policy_task,
        report_task
    ],
    verbose=True
)
