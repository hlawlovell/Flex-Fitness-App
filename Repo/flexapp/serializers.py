from rest_framework import serializers
from django.contrib.auth.models import User

from .models import *


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class FlexSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogEntries
        fields = ('weight', 'reps') 

class UserExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExercise
        fields = ('sets',)

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ('name',)

class LogEntrySerializer(serializers.Serializer):
    title = serializers.CharField(max_length=50)
    weight = serializers.DecimalField(max_digits=5, decimal_places=2)
    reps = serializers.IntegerField(max_value = 99, min_value = 1)
