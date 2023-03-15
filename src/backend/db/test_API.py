import json
from datetime import date,datetime
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from .models import *
from .serializers import *


# initialize the APIClient app
client = Client()

class APITests(TestCase):
    def setUp(self):
        self.errorMsgGet = "DRF did not return the expected response "
        self.errorMsgPost = "DRF could not post the expected response "
        self.user_student = User.objects.create(
            username='teststudent',
        )
        self.user_student.set_password('testpass123')
        self.user_student.save()
        
        self.user_tutor = User.objects.create(
            username='testtutor',
            password='testpass123'
        )

        self.student = student.objects.create(
            username=self.user_student,
            level=1
        )

        self.tutor = tutor.objects.create(
            username=self.user_tutor
        )

        self.course = course.objects.create(
            id='CS101',
            title='Intro to Computer Science',
            level=1,
            start_date=date.today(),
            end_date=date.today()
        )

        self.tutor_teaching = tutor_teaching.objects.create(
            tutor_id=self.tutor,
            course_id=self.course
        )

        self.student_enroll = student_enroll.objects.create(
            student_id = self.student,
            tutor_teaching_id = self.tutor_teaching,
            flag = True
        )

        self.lab = lab.objects.create(
            course_id=self.course,
            lab_number=1,
            title='Variables and Data Types',
            date=date.today(),
            help='http://example.com'
        )

        self.message = message.objects.create(
            sent_at=date.today(), 
            sender_id = self.user_student, 
            receiver_id = self.user_tutor,
            message_content = "Test message",
            related_lab = self.lab,
        )
      

        self.axis_labels = axis_labels.objects.create(
            pos_title='Positive',
            neg_title='Negative',
            risk=9,
            warn=8
        )

        self.axis_average = axis_average.objects.create(
            axis_id=self.axis_labels,
            lab_id=self.lab,
            student_id=self.student,
            date=date.today(),
            point=7,
            above=True
        )

        self.student_lab_risk = student_lab_risk.objects.create(
            student_id=self.student,
            lab_id=self.lab,
            axis_id=self.axis_labels,
            date=date.today(),
            risk=True,
            warning=False
        )

        self.question = question.objects.create(
            x=self.axis_labels,
            y=self.axis_labels
        )

        self.survey = survey.objects.create(
            lab_id=self.lab,
            tutor_teaching_id=self.tutor_teaching,
            question_1=self.question,
            question_2=self.question,
            question_3=self.question
        )

        self.student_survey = student_survey.objects.create(
            lab_id=self.lab,
            survey_id=self.survey,
            student_id=self.student,
            completed=False
        )

        response = client.post(reverse('token_obtain_pair'),{'username': 'teststudent', 'password': 'testpass123'})
        self.assertEqual(response.status_code,200,msg = "Couldn't log user in")

        self.access = response.data['access']

        client.defaults['HTTP_AUTHORIZATION'] ='Bearer ' + self.access

    def test_messages(self):
        response = client.get(reverse('messages', kwargs={'receiver_id':self.user_tutor.id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)
    
    def test_courses(self):
        response = client.get(reverse('student_courses', kwargs={'student_id':self.user_student.id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)

    def test_course(self):
        response = client.get(reverse('course_detail', kwargs={'id':self.course.id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)
    
    def test_lab(self):
        response = client.get(reverse('lab', kwargs={'course_id':self.course.id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)
    
    def test_survey(self):
        response = client.get(reverse('survey', kwargs={'lab_id':self.lab.lab_id, 'tutor_teaching_id':self.tutor_teaching.id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)

    def test_post_survey(self):
        p = {'lab_id': self.lab.lab_id, 'tutor_teaching_id':self.tutor_teaching.id, 'question_1':self.question.id,'question_2':self.question.id,'question_3':self.question.id}
        response = client.post(reverse('post_survey'),data=p)
        self.assertEqual(response.status_code,201, self.errorMsgGet)

    def test_post_survey_taken(self):
        p = {'lab_id':self.lab.lab_id,'survey_id':self.survey.id,'student_id':self.user_student.id,'completed': 'True'}
        response = client.post(reverse('student_survey'),data= p)
        self.assertEqual(response.status_code,201, self.errorMsgPost)

    def test_get_student_survey(self):
        response = client.get(reverse('student_lab_survey', kwargs={'lab_id':self.lab.lab_id, 'student_id':self.user_student.id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)

    def test_question_get(self):
        response = client.get(reverse('find_question', kwargs={'question_id':self.question.id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)
    
    def test_question_post(self):
        p = {'x': self.axis_labels.id,'y':self.axis_labels.id}
        response = client.post(reverse('post_question'),data=p)
        self.assertEqual(response.status_code,201, self.errorMsgPost)

    def test_axis_labels(self):
        response = client.get(reverse('find_axis', kwargs={'axis_id':self.axis_labels.id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)
    
    def test_axis_labels_post(self):
        p={'pos_title': 'good','neg_title':'bad','risk':9,'warn':8}
        response = client.post(reverse('post_axis'),data=p)
        self.assertEqual(response.status_code,201, self.errorMsgPost)

    def test_axis_labels_put(self):
        p={'risk': 9}
        response = client.put(reverse('find_axis', kwargs={'axis_id':self.axis_labels.id}),data=p)
        # user not authorised so must fail
        self.assertEqual(response.status_code,400, self.errorMsgPost)

    def test_count_risks(self):
        response = client.get(reverse('count', kwargs={'student_id':self.user_student.id,'tutor_teaching_id':self.tutor_teaching.id, 'count':'count'}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)
    
    def test_student_risk_by_student_lab(self):
        response = client.get(reverse('student_labs', kwargs={'student_id':self.user_student.id, 'lab_id':self.lab.lab_id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)

    def test_post_risk(self):
        p = {'student_id':self.user_student.id,'lab_id':self.lab.lab_id,'axis_id':self.axis_labels.id,'date':date.today(),'risk':'True', 'warning':'False'}
        response = client.post(reverse('post_risk'),data = p)
        self.assertEqual(response.status_code,201, self.errorMsgPost)

    def test_lab_risks_by_student(self):
        response = client.get(reverse('student_risks', kwargs={'student_id':self.user_student.id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)

    def test_lab_risk_by_lab(self):
        response = client.get(reverse('all_lab_risks',kwargs={'lab_id': self.lab.lab_id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)

    def test_risks_by_teacher(self):
        response = client.get(reverse('lab_risks_tutor', kwargs={'lab_id':self.lab.lab_id,'tutor_teaching_id':self.tutor_teaching.id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)

    def test_post_average(self):
        p = {'axis_id':self.axis_labels.id,'lab_id':self.lab.lab_id,'student_id':self.user_student.id,'date': str(date.today()),'point':8, 'above':'False'}
        response = client.post(reverse('post_average'),data=p)
        self.assertEqual(response.status_code,201, self.errorMsgPost)

    def test_lab_axis_avg(self):
        response = client.get(reverse('lab_axis_avg',kwargs={'lab_id':self.lab.lab_id,'axis_id':self.axis_labels.id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)

    def test_student_avg(self):
        response = client.get(reverse('student_avg', kwargs={'student_id':self.user_student.id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)

    def test_lab_student_avg(self):
        response = client.get(reverse('lab_student_avg', kwargs={'student_id':self.user_student.id,'lab_id':self.lab.lab_id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)

    def test_tutor_teaching(self):
        response = client.get(reverse('tutor_teaching',kwargs={'user_id':self.tutor_teaching.id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)

    def test_students(self):
        response = client.get(reverse('students', kwargs={'pk':self.user_student.id}))
        self.assertEqual(response.status_code,200, self.errorMsgGet)