from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import permission_classes,api_view
from django.db.models import Avg
from rest_framework.views import APIView
from rest_framework import status
from .serializers import *
from .models import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from datetime import datetime
from django.utils.dateparse import parse_datetime
from rest_framework import permissions



# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserList(APIView):
    permission_classes=[permissions.IsAuthenticated]

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


class StudentDetail(APIView):
    def get_object(self, pk):
        try:
            return student.objects.get(pk=pk)
        except student.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        
        serializer = StudentSerializer(snippet)
        return Response(serializer.data)



class FindUser(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    permission_classes= (permissions.IsAuthenticated,)
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
    permission_classes= (permissions.IsAuthenticated,)
    def serialize_message(self,messages):
            msg =[]
            for message in messages:
                try:
                        json={
                    'id': message.id,
                    'sender_id': message.sender_id.username,
                    's_id':message.sender_id.id,
                    'staff': message.sender_id.is_staff,
                    'sender_f_name': message.sender_id.first_name,
                    'sender_l_name': message.sender_id.last_name,
                    'receiver_id': message.receiver_id.username,
                    'sent_at': str(message.sent_at),
                    'message_content': message.message_content,
                    'related_lab_title': message.related_lab.title,
                    'related_lab': message.related_lab.lab_id,
                    'related_lab_course_title': message.related_lab.course_id.title
                    }
                except:
                    json = {'id': message.id,
                    'sender_id': message.sender_id.username,
                    's_id':message.sender_id.id,
                    'staff': message.sender_id.is_staff,
                    'sender_f_name': message.sender_id.first_name,
                    'sender_l_name': message.sender_id.last_name,
                    'receiver_id': message.receiver_id.username,
                    'sent_at': str(message.sent_at),
                    'message_content': message.message_content}
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
        print(request.data)
        serializer = MessageSerializer(data = request.data)
        serializer.sent_at = date
        if serializer.is_valid():
            serializer.save()
            return Response(status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)




class RecentMessage(APIView):
    permission_classes= (permissions.IsAuthenticated,)
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
    permission_classes= (permissions.IsAuthenticated,)
    def serialize_student_enroll(self,student_enroll):
        enroll =[]
        for courses in student_enroll:
            json={'id': courses.id,
            'student_id': courses.student_id.username.id,
            'course_id': courses.tutor_teaching_id.course_id.id,
            'tutor':{
                'tutor_id': courses.tutor_teaching_id.tutor_id.username.id,
                'tutor_name': courses.tutor_teaching_id.tutor_id.username.first_name + " "+ courses.tutor_teaching_id.tutor_id.username.last_name,
          
            }
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
    permission_classes= (permissions.IsAuthenticated,)
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
    permission_classes= (permissions.IsAuthenticated,)
    def serialize_labs(self,labs):
        lab_list =[]
        for lab in labs:
            json={'course_id': lab.course_id.id,
            'lab_id' : lab.lab_id,
            'lab_number': lab.lab_number,
            'title':lab.title,
            'date': lab.date,
            'help': lab.help
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
    permission_classes= (permissions.IsAuthenticated,)
    def survey_serialize(self,data):
        return{
            'id':data.id,
            'lab_id' : data.lab_id.lab_id,
            'course_id': data.tutor_teaching_id.course_id.id,
            'tutor_id': data.tutor_teaching_id.tutor_id.username.id,
            'tutor_teaching_id': data.tutor_teaching_id.id,
            'question_1':data.question_1.id,
            'question_2':data.question_2.id,
            'question_3':data.question_3.id,
        }
    def get_object(self,tutor_teaching_id, lab_id):
        try: 
            return survey.objects.get(lab_id=lab_id, tutor_teaching_id = tutor_teaching_id)
        except survey.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request,tutor_teaching_id, lab_id, format=None):
        snippet = self.get_object(lab_id=lab_id, tutor_teaching_id=tutor_teaching_id)
        serializer = self.survey_serialize(snippet)
        return Response(serializer)

    def post(self, request, format=None):
        serializer = surveySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class FindStudentSurvey(APIView):
    permission_classes= (permissions.IsAuthenticated,)
    def student_survey_serialize(self,data):
        return {
            'lab_id': data.lab_id.lab_id,
            'survey_id':data.survey_id.id,
            'course': data.lab_id.course_id.id,
            'student_id': data.student_id.username.id,
            'completed':data.completed
        }

    def get_object(self, lab_id,student_id):
        try:
            return student_survey.objects.get(lab_id=lab_id,student_id=student_id)
        except student_survey.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, lab_id,student_id, format=None):
        snippet = self.get_object(lab_id=lab_id,student_id=student_id)
        serializer = self.student_survey_serialize(snippet)
        return Response(serializer)

    def post(self,request,format=None):
        serializer = student_surveySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AxisAverage(APIView):
    permission_classes= (permissions.IsAuthenticated,)
    def ser(self,data):
        return {
            'id':data.id,
            'lab_id': data.lab_id.lab_id,
            'student_id': data.student_id.username.id,
            'axis_id': data.axis_id.id,
            'axis_pos': data.axis_id.pos_title,
            'axis_neg':data.axis_id.neg_title,
            'above':data.above,
            'point': data.point,
            'date': data.date,
        }
    def ser_all(self,data):
        records=[]
        for record in data:
            records.append({
            'id':record.id,
            'lab_id': record.lab_id.lab_id,
            'student_id': record.student_id.username.id,
            'axis_id': record.axis_id.id,
            'axis_pos': record.axis_id.pos_title,
            'axis_neg':record.axis_id.neg_title,
            'above':record.above,
            'point': record.point,
            'date': record.date,
        })
        return records


    def get_object(self, lab_id,axis_id):
        try:
            avg = axis_average.objects.filter(lab_id=lab_id,axis_id=axis_id).aggregate(Avg('point'))
            return avg
        except axis_average.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST
    
    def get_all_lab(self, lab_id,student_id):
        try:
            return axis_average.objects.filter(lab_id=lab_id,student_id=student_id)
        except axis_average.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get_recent(self,student_id):
        try:
            avg = axis_average.objects.filter(student_id=student_id).order_by('-date')[:1].get()
            return avg
        except axis_average.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, lab_id=0,axis_id=0,student_id=0, format=None):
        if (student_id!=0 and lab_id==0):
            snippet = self.get_recent(student_id=student_id)
            r = self.ser(snippet)
            return Response(r)
        elif (student_id!=0 and lab_id!=0):
            snippet = self.get_all_lab(student_id=student_id, lab_id=lab_id)
            return Response(self.ser_all(snippet))
        else:
            snippet = self.get_object(lab_id=lab_id,axis_id=axis_id)
            r = Response(snippet)
            return r

    def post(self,request,format=None):
        serializer = axis_averageSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LabQuestions(APIView):
    permission_classes= (permissions.IsAuthenticated,)
    def serialize_questions(self,questions):
        question_list =[]
        for question in questions:
            json={'question_id':question.id,
            'x': 
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
            return question.objects.get(id=question_id)
        except question.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, question_id, format=None):
        return Response(self.serialize_questions(question.objects.filter(id=question_id)))
    def put(self,request,question_id,format=None):
        snippet = self.get_object(question_id=question_id)
        serializer = questionSerializer(instance=snippet,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self,request,format=None):
        serializer = questionSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)



class FindStudentLabRisk(APIView):
    permission_classes= (permissions.IsAuthenticated,)
    def ser(self,data):
        rs = []
        for r in data:
            rs.append({
            "student_id": r.student_id.username.id,
            "lab_id": r.lab_id.lab_id,
            "axis_id": r.axis_id.id,
            "axis_negative": r.axis_id.neg_title,
            "date": r.date,
            "risk": r.risk,
            "warning": r.warning,
            "avg": r.avg
            })
        return rs

    def get_object(self, student_id,lab_id):
        try:
            return student_lab_risk.objects.filter(student_id=student_id,lab_id=lab_id)
        except student_lab_risk.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, student_id, lab_id, format=None):
        snippet = self.get_object(student_id=student_id,lab_id=lab_id)
        serializer = self.ser(snippet)
        return Response(serializer)
    
    def post(self, request,format=None):
        serializer = student_lab_riskSerializer(data=request.data)
        serializer.date=datetime.strptime(request.data.get('date'), "%Y-%m-%d").date()
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LabRisksByStudent(APIView):
    permission_classes= (permissions.IsAuthenticated,)
    def serialize_risks(self,risks):
        risk_list =[]
        for r in risks:
            json={
            'student_id': r.student_id.username.id,
            'student_name': r.student_id.username.first_name+" "+r.student_id.username.last_name,
            'lab_id': r.lab_id.lab_id,
            'lab_number':r.lab_id.lab_number,
            'lab_title':r.lab_id.title,
            'course_name': r.lab_id.course_id.title,
            'axis_id' :r.axis_id.id,
            'axis_neg' :r.axis_id.neg_title,
            'axis_pos' :r.axis_id.pos_title,
            'date': r.date,
            'risk': r.risk,
            'warning': r.warning,
            'avg' : r.avg
            }
            risk_list.append(json)
        return risk_list

    def get_object(self, student_id):
        try:
            return student_lab_risk.objects.filter(student_id=student_id).order_by('-date')
        except student_lab_risk.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, student_id, format=None):
        snippet = self.get_object(student_id=student_id)
        serializer = self.serialize_risks(snippet)
        return Response(serializer)


class LabRisksByLab(APIView):
    permission_classes= (permissions.IsAuthenticated,)
    def serialize_risks(self,risks):
        risk_list =[]
        for r in risks:
            json={
            'student_id': r.student_id.username.id,
            'student_first_name': r.student_id.username.first_name,
            'student_last_name': r.student_id.username.last_name,
            'lab_id': r.lab_id.lab_id,
            'lab_number':r.lab_id.lab_number,
            'lab_title': r.lab_id.title,
            'course_name': r.lab_id.course_id.title,
            'axis_id' :r.axis_id.id,
            'axis_neg': r.axis_id.neg_title,
            'axis_pos': r.axis_id.pos_title,
            'date': r.date,
            'risk': r.risk,
            'warning': r.warning,
            'avg' : r.avg
            }
            risk_list.append(json)
        return risk_list

    def get(self,request,lab_id):
        snippet = self.get_labs(lab_id=lab_id)
        serializer = self.serialize_risks(snippet)
        return Response(serializer)
    
    def get_labs(self,lab_id):
        try:
            return student_lab_risk.objects.filter(lab_id = lab_id).order_by('-risk')
        except student_lab_risk.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST


class FindAxisLabel(APIView):
    permission_classes= (permissions.IsAuthenticated,)
    def get_object(self, axis_id):
        try:
            return axis_labels.objects.get(id= axis_id)
        except axis_labels.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, axis_id, format=None):
        snippet = self.get_object(axis_id = axis_id)
        serializer = axis_labelsSerializer(snippet)
        return Response(serializer.data)
    
    def put(self,request,axis_id,format=None):
        snippet = self.get_object(axis_id = axis_id)
        serializer = axis_labelsSerializer(instance=snippet,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self,request,format=None):
        serializer = axis_labelsSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class FindTutorTeaching(APIView):
    permission_classes= (permissions.IsAuthenticated,)
    def ser(self, data,user_id,tutor_teach):
        rs = []
        for r in data:
            rs.append({
                "tutor_user_id": User.objects.get(id=user_id).id,
                "tutor_teaching_id": tutor_teach,
                "course_id": r.course_id.id,
                "course_title": r.course_id.title,
                'lab':{
                "lab_date" :r.date,
                "lab_id": r.lab_id,
                "lab_title": r.title,
                "lab_number" : r.lab_number,
                "help": r.help}
                })
        return rs
    def get_objects(self,tutor_id,request):
        try:
            r = []
            courses = tutor_teaching.objects.filter(tutor_id_id=tutor_id)
            for c in courses:
                tutor_teach = c.id
                l =lab.objects.filter(course_id = c.course_id.id).order_by('-date')
                r.append(self.ser(l,tutor_id,tutor_teach))
            return r
        except tutor_teaching.DoesNotExist:
            return status.HTTP_400_BAD_REQUEST

    def get(self, request,user_id,format=None):
        snippet = self.get_objects(user_id,request)
        #serializer = self.ser(snippet,user_id)
        return Response(snippet)


class CheckUp(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    def get(self,request,format=None):
        return Response(status=status.HTTP_302_FOUND)
