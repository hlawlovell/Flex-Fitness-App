"""URL configuration for flexapp
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
"""
from django.urls import path, include
from flexapp.views import SignUpView, StatsView, DashboardView, UserExerciseView

urlpatterns = [
    path('accounts/', include('django.contrib.auth.urls')),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('stats/', StatsView.as_view(), name='stats'),
    path('dashboard/<int:year>/<int:month>/<int:day>/', DashboardView.as_view(), name='dashboard'),
    path('userexercise/<int:id>/', UserExerciseView.as_view(), name='userexercise')
]
