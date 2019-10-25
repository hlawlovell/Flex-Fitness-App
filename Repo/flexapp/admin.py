from django.contrib import admin
from .models import UserCredential
from .models import Profile
from .models import Exercise
from .models import UserExercise
from .models import LogEntries

# Register your models here.
admin.site.register(UserCredential)
admin.site.register(Profile)
admin.site.register(Exercise)
admin.site.register(UserExercise)
admin.site.register(LogEntries)
