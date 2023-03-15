from django.test import TestCase
from django.contrib.auth.models import User
from django.conf import settings
from db.models import *

# Create your tests here.

# test user functions
class UserTest(TestCase):
    def test_create_user(self):
        user_student = User.objects.create(username="2333030s",first_name="student", last_name="evie")
        user_student.set_password("test_case")
        user_student.save()

        user_tutor = User.objects.create(username="2444030s",first_name="student", last_name="evie",is_staff=True)
        user_tutor.set_password("test_case")
        user_tutor.save()

        users_in_database = User.objects.all()
        self.assertEqual(users_in_database[0], user_student, msg = "Could not create student user")
        self.assertEqual(users_in_database[1], user_tutor, msg = "Could not create tutor user")

class StudentTest(TestCase):
    def test_create_student(self):
            user_student = User.objects.create(username="2333030s",first_name="student", last_name="evie")
            user_student.set_password("test_case")
            user_student.save()

            student_object = student.objects.create(username = User.objects.all()[0], level=1)
            students_in_database = student.objects.all()
            self.assertEqual(students_in_database[0], student_object, msg = "Could not create student object from user")

class TutorTest(TestCase):
    def test_create_tutor(self):
            user_tutor = User.objects.create(username="2444030s",first_name="student", last_name="evie",is_staff=True)
            user_tutor.set_password("test_case")
            user_tutor.save()

            tutor_object = tutor.objects.create(username = User.objects.all()[0])
            tutors_in_database = tutor.objects.all()
            self.assertEqual(tutors_in_database[0], tutor_object, msg = "Could not create tutor object from user")

class CourseTest(TestCase):
    def test_create_course(self):
        course_object = course.objects.create(id = "COMPSCI1001", title="Computing Science 1P",level = 1,start_date = datetime(2022,9,14),end_date=datetime(2022,12,10))
        course_object.save()

        courses_in_database = course.objects.all()
        self.assertEqual(courses_in_database[0], course_object, msg = "Could not create course object")

class AxisLabelsTest(TestCase):
    def test_create_axis_label(self):
        axis_object = axis_labels.objects.create(pos_title="positive", neg_title = "negative", risk = 9, warn=8)
        axis_object.save()

        axis_in_database = axis_labels.objects.all()
        self.assertEqual(axis_in_database[0], axis_object, msg = "Could not create axis object")

class Message(TestCase):
     def test_create_message(self):
        user_student = User.objects.create(username="2333030s",first_name="student", last_name="evie")
        user_student.set_password("test_case")
        user_student.save()

        user_tutor = User.objects.create(username="2444030s",first_name="student", last_name="evie",is_staff=True)
        user_tutor.set_password("test_case")
        user_tutor.save()

        message_object = message.objects.create(sent_at=datetime.now(), sender_id = user_student, receiver_id = user_tutor,message_content = "Test message")
        message_object.save()

        message_in_database = message.objects.all()
        self.assertEqual(message_in_database[0], message_object, msg = "Could not create axis object")

class TutorTeachingTests(TestCase):
    def test_tutor_teaching(self):
        course_object = course.objects.create(id = "COMPSCI1001", title="Computing Science 1P",level = 1,start_date = datetime(2022,9,14),end_date=datetime(2022,12,10))
        course_object.save()
        course_object = course.objects.all()[0]

        user_tutor = User.objects.create(username="2444030s",first_name="student", last_name="evie",is_staff=True,password="test_Case")
        user_tutor.save()

        tutor_object = tutor.objects.create(username = User.objects.all()[0])

        tutor_teaching_object = tutor_teaching.objects.create(tutor_id = tutor_object,course_id = course_object)
        self.assertEqual(tutor_teaching.objects.all()[0], tutor_teaching_object, msg = "Could not create axis object")

class StudentEnrollTests(TestCase):
    def setUp(self):
            course_object = course.objects.create(id = "COMPSCI1001", title="Computing Science 1P",level = 1,start_date = datetime(2022,9,14),end_date=datetime(2022,12,10))
            course_object.save()
            course_object = course.objects.all()[0]

            user_tutor = User.objects.create(username="2444030s",first_name="student", last_name="evie",is_staff=True,password="test_Case")
            user_tutor.save()

            tutor_object = tutor.objects.create(username = User.objects.all()[0])

            tutor_teaching_object = tutor_teaching.objects.create(tutor_id = tutor_object,course_id = course_object)

            user_student = User.objects.create(username="2333030s",first_name="student", last_name="evie")
            user_student.set_password("test_case")
            user_student.save()

            student_object = student.objects.create(username = User.objects.all()[0], level=1)
    def tearDown(self) -> None:
         return super().tearDown()
    def test_create_student_enroll(self):
        student_enroll_object = student_enroll.objects.create(student_id = student.objects.all()[0],tutor_teaching_id = tutor_teaching.objects.all()[0], flag= True)
        self.assertEqual(student_enroll.objects.all()[0], student_enroll_object, msg = "Could not create student enroll object")

class CourseTests(TestCase):
    def setUp(self):
            course_object = course.objects.create(id = "COMPSCI1001", title="Computing Science 1P",level = 1,start_date = datetime(2022,9,14),end_date=datetime(2022,12,10))
            course_object.save()

            lab_object = lab.objects.create(course_id = course_object,lab_number = 1,title = "Demo",date = datetime.now())
            lab_object.save()

            user_student = User.objects.create(username="2333030s",first_name="student", last_name="evie")
            user_student.set_password("test_case")
            user_student.save()

            student_object = student.objects.create(username = User.objects.all()[0], level=1)
            student_object.save()

            axis_object = axis_labels.objects.create(pos_title="positive", neg_title = "negative", risk = 9, warn=8)
            axis_object.save()
    def tearDown(self) -> None:
         return super().tearDown()
    def test_axis_average(self):
        axis_object = axis_average.objects.create(axis_id = axis_labels.objects.all()[0],lab_id = lab.objects.all()[0],student_id = student.objects.all()[0],date = datetime.now(), point = 8,above = False)
        axis_object.save()

        axis_in_database = axis_average.objects.all()
        self.assertEqual(axis_in_database[0], axis_object, msg = "Could not create axis average object")
    def test_student_lab_risk(self):
        student_lab_risk_object = student_lab_risk.objects.create(axis_id = axis_labels.objects.all()[0],lab_id = lab.objects.all()[0],student_id = student.objects.all()[0],date = datetime.now(), risk=True, warning=False)
        student_lab_risk_object.save()

        all_risks_database = student_lab_risk.objects.all()
        self.assertEqual(all_risks_database[0], student_lab_risk_object, msg = "Could not create student lab risk object")


class StudentSurveyTests(TestCase):
    def setUp(self):
            course_object = course.objects.create(id = "COMPSCI1001", title="Computing Science 1P",level = 1,start_date = datetime(2022,9,14),end_date=datetime(2022,12,10))
            course_object.save()

            lab_object = lab.objects.create(course_id = course_object,lab_number = 1,title = "Demo",date = datetime.now())
            lab_object.save()

            user_student = User.objects.create(username="2333030s",first_name="student", last_name="evie")
            user_student.set_password("test_case")
            user_student.save()

            student_object = student.objects.create(username = User.objects.all()[0], level=1)
            student_object.save()

            axis_object_0 = axis_labels.objects.create(pos_title="positive", neg_title = "negative", risk = 9, warn=8)
            axis_object_0.save()

            axis_object_1 = axis_labels.objects.create(pos_title="positive", neg_title = "negative", risk = 9, warn=8)
            axis_object_1.save()

            axis_object_2 = axis_labels.objects.create(pos_title="positive", neg_title = "negative", risk = 9, warn=8)
            axis_object_2.save()

            axis_object_3 = axis_labels.objects.create(pos_title="positive", neg_title = "negative", risk = 9, warn=8)
            axis_object_3.save()

            axis_object_4 = axis_labels.objects.create(pos_title="positive", neg_title = "negative", risk = 9, warn=8)
            axis_object_4.save()

            axis_object_5 = axis_labels.objects.create(pos_title="positive", neg_title = "negative", risk = 9, warn=8)
            axis_object_5.save()

            question_object_0 = question.objects.create(x = axis_object_0,y=axis_object_1) 
            question_object_0.save()
            question_object_1 = question.objects.create(x = axis_object_2,y=axis_object_3) 
            question_object_1.save()
            question_object_2 = question.objects.create(x = axis_object_4,y=axis_object_5) 
            question_object_2.save()

            user_tutor = User.objects.create(username="2444030s",first_name="student", last_name="evie",is_staff=True,password="test_Case")
            user_tutor.save()

            tutor_object = tutor.objects.create(username = User.objects.all()[0])

            tutor_teaching_object = tutor_teaching.objects.create(tutor_id = tutor_object,course_id = course_object)

            survey_object = survey.objects.create(lab_id = lab_object, tutor_teaching_id=tutor_teaching_object,question_1 = question_object_0,question_2 = question_object_1, question_3 = question_object_2)

    def tearDown(self) -> None:
         return super().tearDown()

    def test_student_survey_object(self):
        student_survey_object = student_survey.objects.create(lab_id = lab.objects.all()[0],survey_id = survey.objects.all()[0], student_id = student.objects.all()[0],completed = True)
        self.assertEqual(student_survey.objects.all()[0], student_survey_object, msg = "Could not create student survey object")

class QuestionTest(TestCase):
    def test_create_question(self):
            axis_object_0 = axis_labels.objects.create(pos_title="positive", neg_title = "negative", risk = 9, warn=8)
            axis_object_0.save()

            axis_object_1 = axis_labels.objects.create(pos_title="positive", neg_title = "negative", risk = 9, warn=8)
            axis_object_1.save()

            question_object_0 = question.objects.create(x = axis_object_0,y=axis_object_1) 
            question_object_0.save()

            self.assertEqual(question.objects.all()[0],question_object_0, msg = "Could not create question object")

class SurveyTest(TestCase):
    def test_create_survey(self):
        course_object = course.objects.create(id = "COMPSCI1001", title="Computing Science 1P",level = 1,start_date = datetime(2022,9,14),end_date=datetime(2022,12,10))
        course_object.save()

        lab_object = lab.objects.create(course_id = course_object,lab_number = 1,title = "Demo",date = datetime.now())
        lab_object.save()

        axis_object_0 = axis_labels.objects.create(pos_title="positive", neg_title = "negative", risk = 9, warn=8)
        axis_object_0.save()

        axis_object_1 = axis_labels.objects.create(pos_title="positive", neg_title = "negative", risk = 9, warn=8)
        axis_object_1.save()

        axis_object_2 = axis_labels.objects.create(pos_title="positive", neg_title = "negative", risk = 9, warn=8)
        axis_object_2.save()

        axis_object_3 = axis_labels.objects.create(pos_title="positive", neg_title = "negative", risk = 9, warn=8)
        axis_object_3.save()

        axis_object_4 = axis_labels.objects.create(pos_title="positive", neg_title = "negative", risk = 9, warn=8)
        axis_object_4.save()

        axis_object_5 = axis_labels.objects.create(pos_title="positive", neg_title = "negative", risk = 9, warn=8)
        axis_object_5.save()

        question_object_0 = question.objects.create(x = axis_object_0,y=axis_object_1) 
        question_object_0.save()
        question_object_1 = question.objects.create(x = axis_object_2,y=axis_object_3) 
        question_object_1.save()
        question_object_2 = question.objects.create(x = axis_object_4,y=axis_object_5) 
        question_object_2.save()

        user_tutor = User.objects.create(username="2444030s",first_name="student", last_name="evie",is_staff=True,password="test_Case")
        user_tutor.save()

        tutor_object = tutor.objects.create(username = User.objects.all()[0])

        tutor_teaching_object = tutor_teaching.objects.create(tutor_id = tutor_object,course_id = course_object)

        survey_object = survey.objects.create(lab_id = lab_object, tutor_teaching_id=tutor_teaching_object,question_1 = question_object_0,question_2 = question_object_1, question_3 = question_object_2)

        self.assertEqual(survey.objects.all()[0],survey_object, msg = "Could not create survey object")