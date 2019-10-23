from rest_framework import serializers
from django.contrib.auth.models import User

from .models import *


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'