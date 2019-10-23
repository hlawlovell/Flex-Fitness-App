"""
FLEXapp project views details
"""
from datetime import date as d
from django.views import View
from django.http import Http404
from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm

from .models import *

class SignUpView(View):

    #Register a new user
    def post(self, request):
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            profile = Profile(user=user)
            profile.save()
            messages.success(request, 'Successful registraion. You can now log in.')
            response = {
                'user':user,
                'profile': profile
            }
            login(request, user)
            return render(request, 'stats.html', response)
        else:
            messages.error(request, 'Invalid values.')
            form = UserCreationForm()
            return render(request, 'signup.html', {'form': form})

    #Render the sign up page
    def get(self, request):
        form = UserCreationForm()
        return render(request, 'signup.html', {'form': form})

class ProfileView(View):
    #Get user profile
    def get(self, request):
        current_user = request.user
        profile = Profile.objects.get(user=current_user)
        if profile is None:
            profile = Profile(user=current_user)
            profile.save()
        response = {
            'profile': profile,
            'user': current_user
        }
        return render(request, 'profile.html', response)

    #Update user profile
    def post(self, request):
        current_user = request.user
        profile = Profile.objects.get(user=current_user)
        if profile is None:
            profile = Profile(user=current_user)
        profile.name = request.POST['name']
        profile.birthday = request.POST['birthday']
        Profile.height = request.POST['height']
        Profile.weight = request.POST['weight']
        profile.save()
        messages.success(request, 'Profile saved.')
        response = {
            'profile': profile
        }
        return render(request, 'profile.html', response)

class StatsView(View):

    #The home view, which is the stats view
    def get(self, request):
        current_user = request.user
        profile = Profile.objects.get(user=current_user)
        if profile is None:
            profile = Profile(user=current_user)
            profile.save()
        response = {
            'profile': profile
        }
        return render(request, 'stats.html', response)

class DashboardView(View):

    #Get user exercises by date
    def get(self, request, year=d.year, month=d.month, day=d.day):
        current_user = request.user
        date = d(year, month, day)
        user_exercise = UserExercise.objects.filter(user=current_user, date=date)
        response = {
            'user_exercises': user_exercise
        }
        return render(request, 'dashboard.html', response)

class UserExerciseView(View):

    #Get user exercise by id
    def get(self, request, id=0):
        current_user = request.user
        try:
            user_exercise = UserExercise.objects.get(user=current_user, id=id)
        except UserExercise.DoesNotExist:
            raise Http404('User exercise not found.')
        response = {
            'userexercise': user_exercise
        }
        return render(request, 'userexercise.html', response)

    #delete user exercise by id
    def delete(self, request, id=0):
        current_user = request.user
        try:
            user_exercise = UserExercise.objects.get(user=current_user, id=id)
        except UserExercise.DoesNotExist:
            raise Http404('User exercise not found.')
        user_exercise.delete()
        messages.success(request, 'Successful deletion.')
        return redirect('userexercise.html', date = user_exercise.date)

    #Update existing user exercise, or create a new one if does not exist
    def post(self, request, id=0):
        current_user = request.user
        user_exercise = UserExercise.objects.get(user=current_user, id=id)
        if user_exercise is None:
            user_exercise = UserExercise(user=current_user)
        user_exercise.user = current_user
        user_exercise.exercise = request.POST['exercise']
        user_exercise.sets = request.POST['sets']
        user_exercise.date = request.POST['date']
        user_exercise.save()
        messages.success(request, 'User exercise created.')
        return redirect('dashboard.html', date=user_exercise.date)
