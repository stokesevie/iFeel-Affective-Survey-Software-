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
from datetime import datetime
from django.utils.dateparse import parse_datetime
import json
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
        d = {'last_login': parse_datetime(request.data.get('last_login'))}
        serializer = UserSerializer(instance=snippet,data=d,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)


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
        serializer = UserNameSerializer(snippet)
        return Response(serializer.data)


class MessageDetail(APIView):

    http_method_names = ['get', 'post']

    def serialize_message(self,messages):
            msg =[]
            for message in messages:
                json={'id': message.id,
                'sender_id': message.sender_id.username,
                's_id':message.sender_id.id,
                'sender_f_name': message.sender_id.first_name,
                'sender_l_name': message.sender_id.last_name,
                'receiver_id': message.receiver_id.username,
                'sent_at': message.sent_at,
                'message_content': message.message_content,
                }
                msg.append(json)
            return msg

    def get_object(self, receiver_id):
            try:
                return message.objects.filter(receiver_id=receiver_id).order_by('-sent_at')
            except message.DoesNotExist:
                raise status.HTTP_400_BAD_REQUEST

    def get(self, request, receiver_id="", sender_id="",format=None):
        if sender_id=="" and receiver_id!="":
            return Response(self.serialize_message(message.objects.filter(receiver_id=receiver_id).order_by('-sent_at')))
        elif receiver_id!="" and sender_id!="":
            return Response(self.serialize_message(message.objects.filter(receiver_id=receiver_id,sender_id=sender_id).order_by('-sent_at')))
   
    def post(self,request):
        date = str(datetime.now())
        date = date.split('.',1)[0]+'Z'
        serializer = MessageSerializer(data = request.data)
        serializer.sent_at = date
        if serializer.is_valid():
            serializer.save()
            return Response(status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)




class RecentMessage(APIView):
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
                    messages = message.objects.filter(receiver_id=receiver_id).order_by('sent_at')
                    return messages
                except message.DoesNotExist:
                    raise status.HTTP_400_BAD_REQUEST

    def get(self, request, receiver_id, format=None):
            return Response(self.serialize_message(message.objects.filter(receiver_id=receiver_id).order_by('sent_at')))


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

class CourseDetail(APIView):
    def get_object(self, id):
        try:
            return course.objects.get(id=id)
        except User.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, id, format=None):
        snippet = self.get_object(id=id)
        serializer = CourseSerializer(snippet)
        return Response(serializer.data)

class LabDetail(APIView):
    def serialize_labs(self,labs):
        lab_list =[]
        for lab in labs:
            json={'course_id': lab.course_id.id,
            'lab_id' : lab.lab_id,
            'lab_number': lab.lab_number,
            'title':lab.title,
            'date': lab.date,
            }
            lab_list.append(json)
        return lab_list

    def get_object(self, course_id):
        try:
            return lab.objects.filter(course_id=course_id)
        except lab.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, course_id, format=None):
        return Response(self.serialize_labs(lab.objects.filter(course_id=course_id)))

class FindSurvey(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, lab_id):
        try:
            return survey.objects.get(lab_id=lab_id)
        except survey.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, lab_id, format=None):
        snippet = self.get_object(lab_id=lab_id)
        serializer = surveySerializer(snippet)
        return Response(serializer.data)


class LabQuestions(APIView):
    def serialize_questions(self,questions):
        question_list =[]
        for question in questions:
            json={'x': 
            {'id': question.x.id,
            'pos': question.x.pos_title,
            'neg': question.x.neg_title,
            'risk':question.x.risk,
            'warn':question.x.warn,
            'ave':question.x.avg},
            'y':
            {'id': question.y.id,
            'pos': question.y.pos_title,
            'neg': question.y.neg_title,
            'risk':question.y.risk,
            'warn':question.y.warn,
            'ave':question.y.avg},
            }
            question_list.append(json)
        return question_list

    def get_object(self, question_id):
        try:
            return question.objects.filter(id=question_id)
        except question.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, question_id, format=None):
        return Response(self.serialize_questions(question.objects.filter(id=question_id)))


class FindStudentLabRisk(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, student_id,lab_id):
        try:
            return student_lab_risk.objects.get(student_id=student_id,lab_id=lab_id)
        except student_lab_risk.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, student_id, lab_id, format=None):
        snippet = self.get_object(student_id=student_id,lab_id=lab_id)
        serializer = student_lab_riskSerializer(snippet)
        return Response(serializer.data)


class LabRisksByStudent(APIView):
    def serialize_risks(self,risks):
        risk_list =[]
        for r in risks:
            json={
            'student_id': r.student_id.username.id,
            'lab_id': r.lab_id.lab_id,
            'axis_id' :r.axis_id.id,
            'date': r.date,
            'risk': r.risk,
            'warning': r.warning,
            'avg' : r.avg
            }
            risk_list.append(json)
        return risk_list

    def get_object(self, student_id):
        try:
            return student_lab_risk.objects.filter(student_id=student_id).order_by('date')
        except student_lab_risk.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, student_id, format=None):
        snippet = self.get_object(student_id=student_id)
        serializer = self.serialize_risks(snippet)
        return Response(serializer)


class FindAxisDetail(APIView):
    def get_object(self, axis_id):
        try:
            return axis.objects.get(id= axis_id)
        except axis.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, axis_id, format=None):
        snippet = self.get_object(axis_id = axis_id)
        serializer = axisSerializer(snippet)
        return Response(serializer.data)

class FindAxisLabel(APIView):
    def get_object(self, axis_id):
        try:
            return axis_labels.objects.get(id= axis_id)
        except axis_labels.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, axis_id, format=None):
        snippet = self.get_object(axis_id = axis_id)
        serializer = axis_labelsSerializer(snippet)
        return Response(serializer.data)