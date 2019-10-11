"""
FLEXapp project views details
"""
from django.shortcuts import render
from django.http import Http404, HttpResponse
from django.views import View
from django.contrib.auth import login, authenticate

from rest_framework import viewsets

from .models import *
from .serializers import *
from .forms import SignUpForm

# Create your views here.
class UserView(viewsets.ModelViewSet):
    queryset = UserCredential.objects.all()
    serializer_class = UserCredentialSerializers

class LoginView(View):
    email = ''
    password = ''

    def get(self, request):
        return render(request, 'login.html')

    def post(self, request):
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user = UserCredential.objects.get(email=email, password=password)
        except UserCredential.DoesNotExist:
            raise Http404("Invalid email or password.")

        if user is not None:
            login(request, user)
            return render(request, 'stats.html', {'userId': user.id})
        return render(request, 'login.html')

class SignupView(View):

    def get(self, request):
        form = SignUpForm()
        return render(request, 'signup.html', {'form': form})

    def post(self, request):
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email')
            raw_data = form.cleaned_data.get('password')
            user = authenticate(email=email, password=raw_data)
            login(request, user)
            return render(request, 'stats.html')


class StatsView(View):
    user_id = ''
    
    def get(self, request):
        user_id = request.GET.get('userId')

        try:
            profile = Profile.objects.get(user=user_id)
        except Profile.DoesNotExist:
            raise Http404("User does not exist.")       
        return render(request, 'stats.html', {
            'bench': profile.bench,
            'squat': profile.squat,
            'deadlift': profile.deadlift
        })
