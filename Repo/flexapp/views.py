"""
FLEXapp project views details
"""

from django.views import View
from django.views import generic
from django.urls import reverse_lazy
from django.core import serializers as sz
from django.contrib.auth.forms import UserCreationForm
from django.http import Http404, HttpResponse

from .models import *
from .serializers import *

# Create your views here.
class SignUpView(View):
    
    def post(self, request):
        
        username = request.POST.get("username")
        password = request.POST.get("password")

        if username.


class ProfileView(View):
    
    def get(self, request):
        current_user = request.user
        user_id = current_user.id

        profile = Profile.objects.filter(user=user_id)

class StatsView(View):
    
    def get(self, request):
        current_user = request.user
        user_id = current_user.id

        try:
            profile = Profile.objects.filter(user=user_id)

        except Profile.DoesNotExist:
            raise Http404("User does not exist.")  

        return HttpResponse(sz.serialize('json', profile), content_type='application/json')

class UserExerciseView(View):

    def post(self, request):
        current_user = request.user
        user_id = current_user.id