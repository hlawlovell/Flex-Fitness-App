from django.contrib.auth.forms import UserCreationForm
from .models import UserCredential


class SignUpForm(UserCreationForm):

    class Meta:
        model = UserCredential
        fields = ('email', 'password')