from pydantic import BaseModel

class InputSchema(BaseModel):
    title: str
    duration: str
    hours_per_day: int
    level_has: str
    level_required: str
    language: str