# Generated by Django 2.2.5 on 2019-10-11 04:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('flexapp', '0008_auto_20191011_1546'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usercredential',
            name='date_joined',
        ),
    ]
