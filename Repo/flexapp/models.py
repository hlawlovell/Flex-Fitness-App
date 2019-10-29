from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Profile(models.Model):

    name = models.CharField(max_length=50, null=True)
    birthday = models.DateField(null=True)
    height = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    weight = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    bench = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    squat = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    deadlift = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    flexScore = models.IntegerField(default=0)
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return self.user.username
class Exercise(models.Model):
    name = models.CharField(max_length=50, unique=True)
    isModifiable = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class UserExercise(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    sets = models.PositiveSmallIntegerField(null=True)

    def __str__(self):
        return self.date

    def __str__(self):
        return self.exercise.name

class LogEntries(models.Model):

    userExercise = models.ForeignKey(UserExercise, on_delete=models.CASCADE)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    reps = models.PositiveSmallIntegerField(null=True)

    def __str__(self):
        return self.userExercise.date
