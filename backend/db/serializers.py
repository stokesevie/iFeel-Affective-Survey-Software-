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
        fields = ['username', 'email', 'first_name', 'last_name','is_staff', 'password']


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
    

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        return token