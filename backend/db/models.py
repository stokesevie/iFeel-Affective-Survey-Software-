from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.conf import settings
from django.contrib.auth import get_user_model


User = get_user_model()
# Create your models here.

class db(models.Model):
    fname = models.CharField(max_length=30, default = 'John')
    sname = models.CharField(max_length=30, default = 'Smith')
    email = models.CharField(max_length=30,primary_key=True, default='johnsmith@mail.com')
    password = models.CharField(max_length=20, default="password")
    staff = models.BooleanField(default=False)

    def _str_(self):
        return self.fname


class student(models.Model):
    username = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,primary_key=True, default='2444030s')
    level = models.IntegerField()

class tutor(models.Model):
    username = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,primary_key=True, default='2444030s' )

class course(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    title = models.CharField(max_length=20)
    level = models.IntegerField()
    start_date = models.DateField()
    end_date = models.DateField()

class student_enroll(models.Model):
    student_id = models.ForeignKey("student", on_delete=models.CASCADE)
    lab_id = models.ForeignKey("course", on_delete=models.CASCADE)
    
class lab(models.Model):
    course_id = models.ForeignKey("course", on_delete=models.CASCADE)
    lab_id = models.CharField(max_length=10, primary_key=True, default='1')
    date = models.DateField()

class axis(models.Model):
    lab_id = models.ForeignKey("lab", on_delete=models.CASCADE)
    x_id = models.ForeignKey("axis_labels", on_delete=models.CASCADE, related_name='x_id')
    y_id= models.ForeignKey("axis_labels", on_delete=models.CASCADE, related_name='y_id')
    x = models.IntegerField()
    y = models.IntegerField()

class axis_labels(models.Model):
    pos_title = models.CharField(max_length=20)
    neg_title = models.CharField(max_length=20)
    risk = models.IntegerField()
    warn = models.IntegerField()
    avg = models.IntegerField()

class student_lab_risk(models.Model):
    student_id = models.ForeignKey("student", on_delete=models.CASCADE)
    lab_id = models.ForeignKey("lab", on_delete=models.CASCADE)
    axis_id = models.ForeignKey("axis", on_delete=models.CASCADE)
    date = models.DateField()
    risk = models.BooleanField()
    warning = models.BooleanField()
    avg = models.BooleanField()


class message(models.Model):
    sender_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender_id')
    receiver_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver_id')
    sent_at = models.DateTimeField()
    message_content = models.TextField()