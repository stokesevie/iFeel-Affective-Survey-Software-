from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
User = get_user_model()

class dbSerializer(serializers.ModelSerializer):

    class Meta:
        model = db
        fields = ('fname', 'sname', 'email', 'password', 'staff')



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name','is_staff','last_login']
    

class UserNameSerializer(serializers.ModelSerializer):
     class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = message
        fields = ['id','sender_id', 'receiver_id', 'sent_at','message_content']



class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = course
        fields = ['id','title', 'level', 'start_date','end_date']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = student
        fields = ['username', 'level']
    

class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = tutor
        fields = ['username']

class student_enrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = student_enroll
        fields = ['student_id', 'lab_id'] 

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        return token

class surveySerializer(serializers.ModelSerializer):
    class Meta:
        model = survey
        fields = ['question_1','question_2','question_3','lab_id']

class student_lab_riskSerializer(serializers.ModelSerializer):
    class Meta:
        model = student_lab_risk
        fields = ['student_id','lab_id', 'axis_id','date','risk', 'warning','avg']

class axisSerializer(serializers.ModelSerializer):
    class Meta:
        model = axis
        fields = ['id','x_id', 'y_id', 'x','y']

class axis_labelsSerializer(serializers.ModelSerializer):
    class Meta:
        model = axis_labels
        fields = ['id','pos_title','neg_title']