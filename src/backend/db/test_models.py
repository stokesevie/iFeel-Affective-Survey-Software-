from django.test import TestCase
from datetime import date
from django.contrib.auth import get_user_model
from .models import student, tutor, course, tutor_teaching, student_enroll, lab, axis_labels, axis_average, student_lab_risk, message, question, survey, student_survey


class ModelTests(TestCase):
    def setUp(self):
        self.user_student = get_user_model().objects.create_user(
            username='teststudent',
            password='testpass123'
        )
        self.user_tutor = get_user_model().objects.create_user(
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

    def test_student_model(self):
        self.assertEqual(self.student.level, 1, msg="Could not create student")

    def test_tutor_model(self):
        self.assertEqual(self.tutor.username, self.user_tutor, msg = "Could not create tutor")

    def test_course_model(self):
        self.assertEqual(self.course.id, 'CS101', msg = "Could not create course")

    def test_tutor_teaching_model(self):
        self.assertEqual(self.tutor_teaching.tutor_id, self.tutor, msg = "Could not create tutor teaching instance")

    def test_lab_model(self):
        self.assertEqual(self.lab.course_id, self.course , msg = "Could not create lab")

    def test_axis_labels_model(self):
        self.assertEqual(self.axis_labels.pos_title, 'Positive',msg = "Could not create axis label")

    def test_axis_average_model(self):
        self.assertEqual(self.axis_average.above, True, msg = "Could not create average axis record")

    def test_student_lab_risk_model(self):
        self.assertEqual(self.student_lab_risk.student_id, self.student, msg = "Could not create student lab risk")

    def test_question_model(self):
        self.assertEqual(self.question.x, self.axis_labels, msg = "Could not create question")

    def test_survey_model(self):
        self.assertEqual(self.survey.lab_id, self.lab, msg = "Could not create survey")

    def test_student_survey_model(self):
        self.assertEqual(self.student_survey.student_id,self.student, msg = "Could not create student survey instance")



            


