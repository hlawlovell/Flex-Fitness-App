from rest_framework import serializers
from .models import *

from django.contrib.auth.models import User


class UserCredentialSerializers(serializers.ModelSerializer):
    class Meta:
        model = User

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile