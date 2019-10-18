from django.apps import AppConfig
from django.db.models.signals import post_save
from django.contrib.auth.models import User

from flexapp.signals import create_user_profile
class FlexappConfig(AppConfig):
    name = 'flexapp'

    def ready(self):
        post_save.connect(create_user_profile, sender=User)
