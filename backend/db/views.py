from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework.views import APIView
from rest_framework import status
from .serializers import *
from .models import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core import serializers
# Create your views here.

@api_view(['GET','POST'])
def students(request):
    if request.method == 'GET':
        data = db.objects.all()
        serializer = dbSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = dbSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def students_edit(request, pk):
    try:
        student = db.objects.get(pk=pk)
    except db.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = dbSerializer(student, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET','POST'])
def courses(request):
    if request.method == 'GET':
        data = course.objects.all()
        serializer = CourseSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CourseSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST'])
def students(request):
    if request.method == 'GET':
        data = student.objects.all()
        serializer = StudentSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = StudentSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST'])
def tutors(request):
    if request.method == 'GET':
        data = tutor.objects.all()
        serializer = TutorSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TutorSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserList(APIView):
    def get(self, request, format=None):
        snippets = User.objects.all()
        serializer = UserSerializer(snippets, many=True)
        return Response(serializer.data)
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = UserSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = UserSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FindUser(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, username, format=None):
        snippet = self.get_object(username=username)
        serializer = UserSerializer(snippet)
        return Response(serializer.data)


class MessageDetail(APIView):
        def serialize_message(self,messages):
            msg =[]
            for message in messages:
                json={'id': message.id,
                'sender_id': message.sender_id.username,
                'receiver_id': message.receiver_id.username,
                'sent_at': message.sent_at,
                'message': message.message_content,
                }
                msg.append(json)
            return msg

        def get_object(self, receiver_id):
            try:
                return message.objects.filter(receiver_id=receiver_id)
            except message.DoesNotExist:
                raise status.HTTP_400_BAD_REQUEST

        def get(self, request, receiver_id, format=None):
            return Response(self.serialize_message(message.objects.filter(receiver_id=receiver_id)))



class StudentEnrollFind(APIView):
    def serialize_student_enroll(self,student_enroll):
        enroll =[]
        for courses in student_enroll:
            json={'id': courses.id,
            'student_id': courses.student_id.username.id,
            'lab_id': courses.lab_id.id,
            }
            enroll.append(json)
        return enroll

    def get_object(self, student_id):
        try:
            return student_enroll.objects.filter(student_id=student_id)
        except student_enroll.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, student_id, format=None):
        return Response(self.serialize_student_enroll(student_enroll.objects.filter(student_id=student_id)))