"""
FLEXapp project views details
"""
from django.shortcuts import render
from django.http import Http404, HttpResponse
from django.views import View
from django.contrib.auth import login, authenticate

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer


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

class ProfileView(APIView):
    # serializer = ProfileSerializer
    # queryset = Profile.objects.all()
    def get(self, request):
        user_id = self.request.user.id
        Profile
        serializer = UserCredentialSerializers(user, many=False)
        return Response(serializer.data)


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

