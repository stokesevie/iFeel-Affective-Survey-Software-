from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import update_last_login
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        try:
            token = super().get_token(user)
            # Add custom claims
            token['username'] = user.username
            token['is_staff']= user.is_staff
            token['email']= user.email
            token['first_name']= user.first_name
            token['last_name'] = user.last_name
            token['last_login']= str(user.last_login)
            update_last_login(None, user)   
            return token
        except:
            return Response(status= status.HTTP_422_UNPROCESSABLE_ENTITY)

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = message
        fields = ['id','sender_id', 'receiver_id', 'sent_at','message_content','related_lab']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = course
        fields = ['id','title', 'level', 'start_date','end_date']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = student
        fields = ['username', 'level']

class student_enrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = student_enroll
        fields = ['student_id', 'tutor_teaching_id','flag'] 

class questionSerializer(serializers.ModelSerializer):
    class Meta:
        model= question
        fields = ['x','y','id']

class surveySerializer(serializers.ModelSerializer):
    class Meta:
        model = survey
        fields = ['id','question_1','question_2','question_3','lab_id','tutor_teaching_id'] 

class student_lab_riskSerializer(serializers.ModelSerializer):
    class Meta:
        model = student_lab_risk
        fields = ['student_id','lab_id', 'axis_id','date','risk', 'warning']

class axis_labelsSerializer(serializers.ModelSerializer):
    class Meta:
        model = axis_labels
        fields = ['id','pos_title','neg_title','risk','warn']

class student_surveySerializer(serializers.ModelSerializer):
    class Meta:
        model = student_survey
        fields = ['lab_id','survey_id','student_id','completed']

class axis_averageSerializer(serializers.ModelSerializer):
    class Meta:
        model = axis_average
        fields = ['axis_id', 'lab_id','student_id', 'point','above','date']

