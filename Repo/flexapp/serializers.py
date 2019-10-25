from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Profile, Exercise, UserExercise, LogEntries


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class ExerciseSerializar(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

class UserExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExercise
        field = '__all__'

class LogEntriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogEntries
        field = '__all__'


