from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Profile(models.Model):

    name = models.CharField(max_length=50)
    birthday = models.DateField()
    height = models.DecimalField(max_digits=6, decimal_places=2)
    weight = models.DecimalField(max_digits=6, decimal_places=2)
    bench = models.DecimalField(max_digits=6, decimal_places=2)
    squat = models.DecimalField(max_digits=6, decimal_places=2)
    deadlift = models.DecimalField(max_digits=6, decimal_places=2)
    flexScore = models.IntegerField()
    user = models.OneToOneField(User, on_delete = models.CASCADE, primary_key=True)

    def __str__(self):
        return self.user.email

class Exercise(models.Model):
    name = models.CharField(max_length=50)
    isModifiable = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class UserExercise(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    set = models.PositiveSmallIntegerField(null=True)

    def __str__(self):
        return self.date

class LogEntries(models.Model):
    userExercise = models.ForeignKey(UserExercise, on_delete=models.CASCADE)
    weight = models.DecimalField(max_digits=3, decimal_places=2)
    reps = models.PositiveSmallIntegerField(null=True)

    def __str__(self):
        return self.userExercise.date
