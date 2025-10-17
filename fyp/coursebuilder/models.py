from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    duration = models.IntegerField()  # in months
    hours_per_day = models.IntegerField(default=2)
    level_has = models.CharField(max_length=100)
    level_required = models.CharField(max_length=100)
    language = models.CharField(max_length=50)
    outline = models.TextField()  # generated outline
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Week(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='weeks')
    week_number = models.IntegerField()
    title = models.CharField(max_length=200)
    content = models.TextField()

    class Meta:
        ordering = ['week_number']

    def __str__(self):
        return f"Week {self.week_number} - {self.course.title}"


class Day(models.Model):
    week = models.ForeignKey(Week, on_delete=models.CASCADE, related_name='days')
    day_number = models.IntegerField()
    title = models.CharField(max_length=200)
    content = models.TextField()
    video_url = models.URLField(blank=True, null=True)
    video_thumbnail = models.URLField(blank=True, null=True)

    class Meta:
        ordering = ['day_number']

    def __str__(self):
        return f"Day {self.day_number} - Week {self.week.week_number}"


# ---------- QUIZZES ----------

class Quiz(models.Model):
    week = models.ForeignKey(Week, on_delete=models.CASCADE, related_name='quizzes')
    title = models.CharField(max_length=200)
    content = models.TextField()  # JSON or text representation of questions
    total_marks = models.IntegerField(default=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Quiz - {self.title} (Week {self.week.week_number})"

class QuizSubmission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    score = models.FloatField(default=0)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'quiz']

    def __str__(self):
        return f"{self.user.username} - {self.quiz.title}"


# ---------- ASSIGNMENTS ----------

class Assignment(models.Model):
    week = models.ForeignKey(Week, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=200)
    description = models.TextField()
    due_date = models.DateTimeField()
    max_marks = models.IntegerField(default=100)
    content = models.TextField(blank=True, null=True)  # Optional detailed content
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Assignment - {self.title} (Week {self.week.week_number})"


class AssignmentSubmission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    submitted_file = models.FileField(upload_to='assignments/submissions/', blank=True, null=True)
    submitted_text = models.TextField(blank=True, null=True)
    grade = models.FloatField(blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    graded_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        unique_together = ['user', 'assignment']

    def __str__(self):
        return f"{self.user.username} - {self.assignment.title}"


# ---------- USER PROGRESS ----------

class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    current_week = models.IntegerField(default=1)
    current_day = models.IntegerField(default=1)
    completed_weeks = models.JSONField(default=list)
    completed_days = models.JSONField(default=list)
    completed_quizzes = models.JSONField(default=list)
    completed_assignments = models.JSONField(default=list)
    is_completed = models.BooleanField(default=False)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    last_accessed = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'course']

    def __str__(self):
        return f"{self.user.username} - {self.course.title}"

    def get_progress_percentage(self):
        total_weeks = self.course.weeks.count()
        total_quizzes = sum(week.quizzes.count() for week in self.course.weeks.all())
        total_assignments = sum(week.assignments.count() for week in self.course.weeks.all())

        completed_count = len(self.completed_days) + len(self.completed_quizzes) + len(self.completed_assignments)
        total_items = (total_weeks * 6) + total_quizzes + total_assignments  # 6 days per week assumed

        if total_items == 0:
            return 0
        return min(100, (completed_count / total_items) * 100)
