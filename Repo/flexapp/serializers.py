from rest_framework import serializers
from .models import UserCredential

class UserCredentialSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserCredential
        fields = ('id','email','password')