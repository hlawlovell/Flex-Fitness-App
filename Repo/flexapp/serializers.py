from rest_framework import serializers
from .models import *

class UserCredentialSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserCredential
        fields = ('id','email','password')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile