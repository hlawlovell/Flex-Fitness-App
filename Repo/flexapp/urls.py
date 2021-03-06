"""URL configuration for flexapp
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
"""
from django.urls import path, include
from flexapp.views import SignUpView, DashboardView, UserExerciseView, FlexCardView, ProfileView, ExerciseView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('flexcard/', FlexCardView.as_view(), name='flexcard'),
    path('dashboard/<int:year>/<int:month>/<int:day>/', DashboardView.as_view(), name='dashboard'),
    path('userexercise/<int:id>/', UserExerciseView.as_view(), name='userexercise'),
    path('accounts/',  include('rest_auth.urls')),
    path('exercises/', ExerciseView.as_view(), name='exercises')
    # path('profile/', ProfileView.as_view(), name='profile')

]