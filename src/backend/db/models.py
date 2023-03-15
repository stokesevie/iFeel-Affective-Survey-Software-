from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.conf import settings
from django.contrib.auth import get_user_model
from datetime import datetime


User = get_user_model()

# models for the database


# defining custom field that will limit the values entered to integer field is in a defined range

class IntegerRangeField(models.IntegerField):
    def __init__(self, verbose_name=None, name=None, min_value=None, max_value=None,default=None, **kwargs):
        self.min_value, self.max_value = min_value, max_value
        models.IntegerField.__init__(self, verbose_name, name,default=default, **kwargs)
    def formfield(self, **kwargs):
        defaults = {'min_value': self.min_value, 'max_value':self.max_value}
        defaults.update(kwargs)
        return super(IntegerRangeField, self).formfield(**defaults)

class student(models.Model):
    username = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,primary_key=True)
    level = IntegerRangeField(min_value=1,max_value=5)

class tutor(models.Model):
    username = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,primary_key=True)

class course(models.Model):
    id = models.CharField(max_length=15, primary_key=True)
    title = models.CharField(max_length=40)
    level = IntegerRangeField(min_value=1,max_value=5)
    start_date = models.DateField()
    end_date = models.DateField()

class tutor_teaching(models.Model):
    tutor_id = models.ForeignKey(tutor,on_delete=models.CASCADE)
    course_id = models.ForeignKey(course, on_delete=models.CASCADE)

# student enrollment in a course logs their flag

class student_enroll(models.Model):
    student_id = models.ForeignKey(student, on_delete=models.CASCADE)
    tutor_teaching_id = models.ForeignKey(tutor_teaching, on_delete=models.CASCADE)
    flag = models.BooleanField(default=False)

# can define website to link to if help needed with lab

class lab(models.Model):
    course_id = models.ForeignKey(course, on_delete=models.CASCADE)
    lab_id = models.AutoField(primary_key=True)
    lab_number = IntegerRangeField(min_value=1,max_value=10)
    title = models.CharField(max_length=40, default= "")
    date = models.DateField()
    help = models.URLField(blank=True)

class axis_labels(models.Model):
    pos_title = models.CharField(max_length=25)
    neg_title = models.CharField(max_length=25)
    risk = IntegerRangeField(min_value=1,max_value=10,default=9)
    warn = IntegerRangeField(min_value=1,max_value=10,default=8)

class axis_average(models.Model):
    axis_id = models.ForeignKey(axis_labels, on_delete=models.CASCADE)
    lab_id = models.ForeignKey(lab, on_delete=models.CASCADE)
    student_id = models.ForeignKey(student,on_delete=models.CASCADE)
    date = models.DateField()
    point = IntegerRangeField(min_value=1,max_value=10)
    above = models.BooleanField()

class student_lab_risk(models.Model):
    student_id = models.ForeignKey(student, on_delete=models.CASCADE)
    lab_id = models.ForeignKey(lab, on_delete=models.CASCADE)
    axis_id = models.ForeignKey(axis_labels, on_delete=models.CASCADE)
    date = models.DateField()
    risk = models.BooleanField()
    warning = models.BooleanField()

class message(models.Model):
    sender_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender_id')
    receiver_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver_id')
    sent_at = models.DateTimeField()
    message_content = models.CharField(max_length=160)
    related_lab = models.ForeignKey(lab, on_delete=models.CASCADE,blank=True, null=True)

class question(models.Model):
    x = models.ForeignKey(axis_labels, on_delete=models.CASCADE, related_name='x')
    y = models.ForeignKey(axis_labels, on_delete=models.CASCADE, related_name='y')

class survey(models.Model):
    lab_id = models.ForeignKey(lab,on_delete=models.CASCADE)
    tutor_teaching_id = models.ForeignKey(tutor_teaching,on_delete=models.CASCADE)
    question_1 = models.ForeignKey(question, on_delete=models.CASCADE, related_name='question_1', default=1)
    question_2 = models.ForeignKey(question, on_delete=models.CASCADE, related_name='question_2',default=2)
    question_3 = models.ForeignKey(question, on_delete=models.CASCADE, related_name='question_3',default=3)

class student_survey(models.Model):
    lab_id = models.ForeignKey(lab,on_delete=models.CASCADE)
    survey_id = models.ForeignKey(survey,on_delete=models.CASCADE)
    student_id = models.ForeignKey(student, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

