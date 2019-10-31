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


from django.http import Http404
from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.db.models import Q




from .models import *
from .serializers import *

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

class DashboardView(APIView):

    #Get user exercises by date
    def get(self, request, year=d.year, month=d.month, day=d.day):
        
        date = d(year, month, day)
        user_exercises = UserExercise.objects.filter(user=request.user, date=date)
        for i in user_exercises:
            print(i)
        dash_exercises = []
        for ex in user_exercises:
            sets = []
            set_objects = ex.logentries_set.all()
            for s in set_objects:
                set_entry = "%d:%.2f" % (s.reps, s.weight)
                sets.append(set_entry)

            ex_name = ex.exercise.name
            exercise = {"title": ex_name, "sets": sets}
            dash_exercises.append(exercise)
            

        dash_response = {"exercises": dash_exercises}
        return Response(dash_response)
        
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
    


    

