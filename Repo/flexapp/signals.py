from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from flexapp.models import Profile


#Signal which creates profile after user registration
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

post_save.connect(create_user_profile, sender=User)
