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

from django.http import Http404, JsonResponse
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

            user_serializer = UserSerializers(user)
            profile_serializer = ProfileSerializer(profile)

            response = {
                'created': True,
                'user':user_serializer.data,
                'profile': profile_serializer.data,
            }
            return Response(response)

        else:
            form = UserCreationForm()
            response = {
                'created': False,
            }
            return JsonResponse(response)

    #Render the sign up page
    def get(self, request):
        form = UserCreationForm()
        response = {
            'created': False,
            'form': form
        }
        return JsonResponse(response)

class ProfileView(APIView):
    #Get user profile
    def get(self, request):

        current_user = request.user
        profile = Profile.objects.get(user=current_user)
        if profile is None:
            profile = Profile(user=current_user)
            profile.save()

        user_serializer = UserSerializers(current_user)
        profile_serializer = ProfileSerializer(profile)

        response = {
            'profile': profile_serializer,
            'user': user_serializer.data,
        }
        return JsonResponse(response)

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

        profile_serializer = ProfileSerializer(profile)

        response = {
            'profile': profile_serializer.data
        }
        return JsonResponse(response)

class DashboardView(APIView):

    #Get user exercises by date
    def get(self, request, year=d.year, month=d.month, day=d.day):
        current_user = request.user
        date = d(year, month, day)
        user_exercise = UserExercise.objects.filter(user=current_user, date=date)

        userexercise_serializer = UserExerciseSerializer(user_exercise)

        response = {
            'user_exercises': userexercise_serializer.data
        }
        return JsonResponse(response)

class UserExerciseView(APIView):

    #Get user exercise by id
    def get(self, request, id=0):

        current_user = request.user
        try:
            user_exercise = UserExercise.objects.get(user=current_user, id=id)
        except UserExercise.DoesNotExist:
            raise Http404('User exercise not found.')

        userexercise_serializer = UserExerciseSerializer(user_exercise)

        response = {
            'userexercise': userexercise_serializer.data
        }
        return JsonResponse(response)

    #delete user exercise by id
    def delete(self, request, id=0):
        current_user = request.user
        try:
            user_exercise = UserExercise.objects.get(user=current_user, id=id)
        except UserExercise.DoesNotExist:
            raise Http404('User exercise not found.')
        user_exercise.delete()
        userexercise_serializer = UserExerciseSerializer(user_exercise)
        response = {
            'deleted': True,
            'user_exercise': userexercise_serializer.data,
        }
        return JsonResponse(response)

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
        
        userexercise_serializer = UserExerciseSerializer(user_exercise)

        response = {
            'created': True,
            'user_exercise': userexercise_serializer.data,
        }
        return JsonResponse(response)
        
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
