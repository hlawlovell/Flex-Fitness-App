from .models import Profile, UserExercise, Exercise, LogEntries

from django.contrib.auth.models import User

# Register your models here.
admin.site.register(Profile)
admin.site.register(UserExercise)
admin.site.register(Exercise)
admin.site.register(LogEntries)
