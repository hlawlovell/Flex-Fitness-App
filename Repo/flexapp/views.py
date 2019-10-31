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
from rest_framework import status


from django.http import Http404, JsonResponse
from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.db.models import Q




from .models import *
from .serializers import *

class SignUpView(View):
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
            'profile': profile
        } 
        return render(request, 'stats.html', response)



            'profile': profile_serializer.data
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

class DashboardView(APIView):

    #Get user exercises by date
    def get(self, request, year=d.year, month=d.month, day=d.day):
        
        date = d(year, month, day)
        exercises = UserExercise.objects.filter(user=request.user, date=date)
        content_exercises = []
        for e in exercises:
            content_sets = []
            set_objects = e.logentries_set.all()
            for s in set_objects:
                set_entry = "%d:%.2f" % (s.reps, s.weight)
                content_sets.append(set_entry)

            exercise_name = e.exercise.name
            content_exercise = {"title": exercise_name, "sets": content_sets}
            content_exercises.append(content_exercise)
            

        content = {"exercises": dash_exercises}
        return Response(content)
        
    # Post 
    def post(self, request, year=d.year, month=d.month, day=d.day):
        date = d(year, month, day)
        current_user = request.user
        serializer = LogEntrySerializer(data=request.data)

        if serializer.is_valid():
            name = serializer.data.get('title')
            weight = serializer.data.get('weight')
            reps = serializer.data.get('reps')
            user_exercise = UserExercise.objects.filter(user=current_user, exercise__name=name, date=date)
            if user_exercise.exists():
                new_entry = LogEntries.objects.create(userExercise = user_exercise[0], weight = weight, reps = reps)
            else:
                exercise = Exercise.objects.get(name=name)
                new_user_exercise = UserExercise.objects.create(user=current_user, exercise=exercise, date=date)
                new_entry = LogEntries.objects.create(userExercise = new_user_exercise, weight = weight, reps = reps)

            return Response({"status": "success"}, status=status.HTTP_201_CREATED)
        return Response({"status": "failed"}, status=status.HTTP_400_BAD_REQUEST)


class ExerciseView(APIView):
    
    # Returns list of exercise names
    def get(self, request):

        exercises = Exercise.objects.filter(Q(user=request.user) | Q(isModifiable=False))
        serializer = ExerciseSerializer(exercises, many=True)
        return Response(serializer.data)

    # Add exercise to list
    def post(self, request):
        serializer = ExerciseSerializer(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            new_exercise = Exercise.objects.create(name=name , user=request.user, isModifiable=True)
            return Response({"status": "success"}, status=status.HTTP_201_CREATED)
        return Response({"status": "failed"}, status=status.HTTP_400_BAD_REQUEST)



        
class FlexCardView(APIView):
    def get(self, request):


        # serializer = UserExerciseSerializer(UserExercise.objects.filter(user=request.user), many=True)
        # bench = serializer.data


        bench_exercise = UserExercise.objects.filter(user=request.user, exercise__name='Bench').order_by('-id')[:6]
        squat_exercise = UserExercise.objects.filter(user=request.user, exercise__name='Squat').order_by('-id')[:6]
        deadlift_exercise = UserExercise.objects.filter(user=request.user, exercise__name='Squat').order_by('-id')[:6]

        bench_orms = get_orms(bench_exercise)
        squat_orms = get_orms(squat_exercise)
        deadlift_orms = get_orms(deadlift_exercise)

        profile = Profile.objects.get(user=request.user)
        flexscore = get_flexscore(bench_orms, squat_orms, deadlift_orms, profile.weight)

        content = {"bench": bench_orms, "squat": squat_orms, "deadlift": deadlift_orms, "flexscores": flexscore}

        
        
        return Response(content)

def get_orms(exercise):

    orm_list = []


    for e in exercise:
        sets = FlexSerializer(e.logentries_set.all(), many=True)
        e_orm = get_max_orm(sets.data)
        orm_list.append(e_orm)
    
    return orm_list
    

# Return highest one rep max given a number of 'sets'
def get_max_orm(sets):
    max_orm = 0
    for s in sets:
        weight = float(s.get("weight"))
        reps = s.get("reps")
        if reps == 1:
            orm_list.append(int(weight))
            continue
        orm = int(weight * (1+reps/30.0))
        if orm > max_orm:
            max_orm = orm
    return max_orm

def get_flexscore(bench, squat, deadlift, weight):
    flexscores = []
    min_range = min(len(bench), len(squat), len(deadlift))
    for i in range(min_range):
        total = bench[i] + squat[i] + deadlift[i]
        wilks = get_wilks(total, weight)
        flexscores.append(wilks)

    return flexscores

def get_wilks(total, weight):

    weight = float(weight)
    a = -216.0475144
    b = 16.2606339
    c = -0.002388645
    d = -0.00113732
    e = 0.00000701863
    f = -000.00000001291 

    wilks_coef = 500 / (a + (b * weight) + (c * weight ** 2) + (d * weight ** 3) + (e * weight ** 4) + (f * weight ** 5))
    wilks_total = total * wilks_coef
    
    return int(wilks_total)
    


    

