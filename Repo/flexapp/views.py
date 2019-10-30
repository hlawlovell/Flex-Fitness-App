"""
FLEXapp project views details
"""
from datetime import date as d
from django.views import View
from django.contrib.auth import login, authenticate

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer

from django.http import Http404
from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializers import *

class SignUpView(APIView):

    #Register a new user
    def post(self, request):
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            profile = Profile(user=user)
            profile.save()
            messages.success(request, 'Successful registraion. You can now log in.')

            user_serializer = UserSerializers(user)
            profile_serializer = ProfileSerializer(profile)

            response = {
                'created': True,
                'user':user_serializer,
                'profile': profile_serializer
            }
            return Response(response)
        else:
            messages.error(request, 'Invalid values.')
            form = UserCreationForm()
            response = {
                'created': False,
            }
            return Response(response)

    #Render the sign up page
    def get(self, request):
        form = UserCreationForm()
        response = {
            'created': False,
            'form': form
        }
        return Response(response)

class ProfileView(APIView):
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
        return Response(response)

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
        return Response(response)

class StatsView(APIView):

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
        return Response(response)

class DashboardView(APIView):

    #Get user exercises by date
    def get(self, request, year=d.year, month=d.month, day=d.day):
        current_user = request.user
        date = d(year, month, day)
        user_exercise = UserExercise.objects.filter(user=current_user, date=date)
        response = {
            'user_exercises': user_exercise
        }
        return Response(response)

class UserExerciseView(APIView):

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
        return Response(response)

    #delete user exercise by id
    def delete(self, request, id=0):
        current_user = request.user
        try:
            user_exercise = UserExercise.objects.get(user=current_user, id=id)
        except UserExercise.DoesNotExist:
            raise Http404('User exercise not found.')
        user_exercise.delete()
        messages.success(request, 'Successful deletion.')
        response = {
            'deleted': True,
            'user_exercise': user_exercise,
        }
        return Response(response)

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
        response = {
            'created': True,
            'user_exercise': user_exercise,
        }
        return Response(response)
        
class FlexCardView(APIView):
    def get(self, request):

        # Return 6 {bench, squat, deadlift} objects
        bench = FlexSerializer(LogEntries.objects.filter(exercise__exercise__name='Bench').order_by('-id')[:6], many=True)
        squat = FlexSerializer(LogEntries.objects.filter(exercise__exercise__name='Squat').order_by('-id')[:6], many=True)
        deadlift = FlexSerializer(LogEntries.objects.filter(exercise__exercise__name='Deadlift').order_by('-id')[:6], many=True)

        bench_orm = get_orm(bench.data)
        squat_orm = get_orm(squat.data)
        deadlift_orm = get_orm(deadlift.data)

        content = {"bench" : bench_orm, "squat" : squat_orm, "deadlift" : deadlift_orm}
        return Response(content)
        
# Calculate one rep max
def get_orm(sets):
    orm_list = []
    for i in sets:
        weight = float(i.get("weight"))
        reps = i.get("reps")
        if reps == 1:
            orm_list.append(int(weight))
            continue
        orm = int(weight * (1+reps/30.0))
        orm_list.append(orm)
    return orm_list
