"""URL configuration for flexapp
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
"""
from django.urls import path, include
from flexapp.views import *

urlpatterns = [
    path('accounts/', include('django.contrib.auth.urls')),
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('stats/', StatsView.as_view(), name='stats'),

]
