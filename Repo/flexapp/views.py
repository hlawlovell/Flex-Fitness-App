from django.shortcuts import render
from rest_framework import viewsets
from .models import UserCredential
from .serializers import UserCredentialSerializers

# Create your views here.
class UserView(viewsets.ModelViewSet):
    queryset = UserCredential.objects.all()
    serializer_class = UserCredentialSerializers