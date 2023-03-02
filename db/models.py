from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.conf import settings
from django.contrib.auth import get_user_model
from datetime import datetime


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
    lab_id = models.AutoField(primary_key=True)
    lab_number = models.IntegerField()
    title = models.CharField(max_length=20, default= "")
    date = models.DateField()
    help = models.URLField(blank=True)

class axis_average(models.Model):
    axis_id = models.ForeignKey("axis_labels", on_delete=models.CASCADE)
    lab_id = models.ForeignKey("lab", on_delete=models.CASCADE)
    student_id = models.ForeignKey(student,on_delete=models.CASCADE)
    date = models.DateField(default='2022-02-02')
    point = models.IntegerField()
    above = models.BooleanField()

class axis_labels(models.Model):
    pos_title = models.CharField(max_length=25)
    neg_title = models.CharField(max_length=25)
    risk = models.IntegerField(default=8)
    warn = models.IntegerField(default=7)
    avg = models.IntegerField(default=6)

class student_lab_risk(models.Model):
    student_id = models.ForeignKey("student", on_delete=models.CASCADE)
    lab_id = models.ForeignKey("lab", on_delete=models.CASCADE)
    axis_id = models.ForeignKey("axis_labels", on_delete=models.CASCADE)
    date = models.DateField()
    risk = models.BooleanField()
    warning = models.BooleanField()
    avg = models.BooleanField()


class message(models.Model):
    date = datetime.now()
    sender_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender_id')
    receiver_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver_id')
    sent_at = models.DateTimeField(default=date)
    message_content = models.TextField()
    related_lab = models.ForeignKey("lab", on_delete=models.CASCADE,blank=True, null=True)


class question(models.Model):
    x = models.ForeignKey(axis_labels, on_delete=models.CASCADE, related_name='x')
    y = models.ForeignKey(axis_labels, on_delete=models.CASCADE, related_name='y')

class survey(models.Model):
    lab_id = models.ForeignKey(lab,on_delete=models.CASCADE, default=1)
    question_1 = models.ForeignKey(question, on_delete=models.CASCADE, related_name='question_1')
    question_2 = models.ForeignKey(question, on_delete=models.CASCADE, related_name='question_2')
    question_3 = models.ForeignKey(question, on_delete=models.CASCADE, related_name='question_3')

class student_survey(models.Model):
    lab_id = models.ForeignKey(lab,on_delete=models.CASCADE, default=1)
    survey_id = models.ForeignKey(survey,on_delete=models.CASCADE, default=1)
    student_id = models.ForeignKey(student, on_delete=models.CASCADE,default=1)
    completed = models.BooleanField(default=False)

class tutor_teaching(models.Model):
    tutor_id = models.ForeignKey(tutor,on_delete=models.CASCADE)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    lab_id = models.ForeignKey(lab, on_delete=models.CASCADE)
