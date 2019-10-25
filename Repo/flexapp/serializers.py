from rest_framework import serializers
from .models import *

class UserCredentialSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserCredential
        fields = ('id', 'email', 'password')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('name', 'birthday', 'height', 'weight', 'bench', 'squat', 'deadlift', 'flexScore')

class FlexSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogEntries
        fields = ('weight', 'reps') 

    