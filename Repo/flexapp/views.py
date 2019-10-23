"""
FLEXapp project views details
"""

from django.views import View
from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required

from .models import *
from .serializers import *

# Create your views here.
class SignUpView(View):
    
    def post(self, request):
        
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            profile = Profile(user = user)
            profile.save()
            messages.success(request, 'Successful registraion. You can now log in.')
            return redirect('login')

    def get(self, request):
        form = UserCreationForm()
        return render(request, 'signup', {'form': form})

@login_required
class ProfileView(View):
    
    def get(self, request):
        current_user = request.user
        profile = Profile.objects.filter(user=current_user)
        if profile is None:
            profile = Profile(user=current_user)
            profile.save()
        response = {
            'profile': profile,
            'user': current_user
        }
        return render(request, 'profile', response) 

@login_required
class StatsView(View):
    
    def get(self, request):
        current_user = request.user
        profile = Profile.objects.filter(user=current_user)
        if profile is None:
            profile = Profile(user=current_user)
            profile.save()
        response = {
            'profile': profile
        }
        return render(request, 'stats', response) 

@login_required
class UserExerciseView(View):

    def post(self, request):