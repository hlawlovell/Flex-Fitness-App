from django.contrib import admin
from .models import UserCredential
from .models import Profile

# Register your models here.
admin.site.register(UserCredential)
admin.site.register(Profile)