from django.db import models

# Create your models here.
class UserCredential(models.Model):

    email = models.EmailField(max_length=50, unique=True)
    #userName = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

class Profile(models.Model):

    name = models.CharField(max_length=50)
    birthday = models.DateField()
    height = models.DecimalField(max_digits=6, decimal_places=2)
    weight = models.DecimalField(max_digits=6, decimal_places=2)
    bench = models.DecimalField(max_digits=6, decimal_places=2)
    squat = models.DecimalField(max_digits=6, decimal_places=2)
    deadlift = models.DecimalField(max_digits=6, decimal_places=2)
    flexScore = models.IntegerField()
    user = models.ForeignKey(UserCredential, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.user.email
class Exercise(models.Model):
    name = models.CharField(max_length=50)
    isModifiable = models.BooleanField(default=False)

class UserExercise(models.Model):
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    set = models.PositiveSmallIntegerField(null=True)

class LogEntries(models.Model):
    exercise = models.ForeignKey(UserExercise, on_delete=models.CASCADE)
    weight = models.DecimalField(max_digits=3, decimal_places=2)
    reps = models.PositiveSmallIntegerField(null=True)
