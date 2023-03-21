"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from db import views

admin.site.site_header = 'iFeel Admin Panel'
admin.site.site_title = 'iFeel Admin'

from rest_framework_simplejwt.views import (
    TokenRefreshView
)



urlpatterns = [
    # admin site
    path("admin/", admin.site.urls),
   
    # checks whether to use local host backend or hosted backend
    path('up/',views.CheckUp.as_view()),

    # authenticates requests with JWT
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # messages
    path('message/<int:receiver_id>/', views.MessageDetail.as_view(),name ='messages'),
    path('messages/', views.MessageDetail.as_view(),name='send_message'),

    # courses and lab details
    path('courses/<int:student_id>/', views.StudentEnrollFind.as_view(),name = 'student_courses'),
    path('course/<int:student_id>/<int:tutor_teaching_id>/', views.StudentEnrollFind.as_view(), name = 'student_enroll_tutor'),
    path('courseDetail/<str:id>', views.CourseDetail.as_view(),name = 'course_detail'),
    path('labs/<str:course_id>', views.LabDetail.as_view(),name = 'lab'),

    # survey details
    path('survey/<int:lab_id>/<int:tutor_teaching_id>/', views.FindSurvey.as_view(),name = 'survey'),
    path('post_survey/', views.FindSurvey.as_view(),name = 'post_survey'),
    path('survey/', views.FindStudentSurvey.as_view(),name='student_survey'),
    path('survey_student/<int:lab_id>/<int:student_id>/', views.FindStudentSurvey.as_view(),name = 'student_lab_survey'),

    #question details
    path('question/<int:question_id>/', views.LabQuestions.as_view(),name = 'find_question'),
    path('question/', views.LabQuestions.as_view(),name = 'post_question'),

    # axis details
    path('axis_labels/<int:axis_id>/', views.FindAxisLabel.as_view(),name = 'find_axis'),
    path('axis_labels/', views.FindAxisLabel.as_view(),name = 'post_axis'),

    # student tutor risks
    path('student_lab_risk/<int:student_id>/<int:tutor_teaching_id>/<str:count>/', views.FindStudentLabRisk.as_view(),name = 'count'),
    path('student_lab/<int:student_id>/<int:lab_id>/', views.FindStudentLabRisk.as_view(),name ='student_labs'),
    path('student_lab_risk/', views.FindStudentLabRisk.as_view(),name='post_risk'),
    path('student_lab_risks/<int:student_id>/', views.LabRisksByStudent.as_view(), name ='student_risks'),
    path('student_lab_risks/lab/<int:lab_id>/', views.LabRisksByLab.as_view(),name = 'all_lab_risks'),
    path('student_lab_risks/lab/<int:lab_id>/<int:tutor_teaching_id>/', views.LabRisksByLab.as_view(),name = 'lab_risks_tutor'),

    #student student risks
    path('average/', views.AxisAverage.as_view(), name='post_average'),
    path('average/<int:lab_id>/<int:axis_id>/', views.AxisAverage.as_view(), name='lab_axis_avg'),
    path('average/<int:student_id>/', views.AxisAverage.as_view(), name='student_avg'),
    path('average_lab/<int:student_id>/<int:lab_id>/', views.AxisAverage.as_view(), name='lab_student_avg'),

    #details about tutor/ student
    path('tutor_teaching/<int:user_id>/', views.FindTutorTeaching.as_view(), name='tutor_teaching'),
    path('students/<int:pk>/', views.StudentDetail.as_view(), name='students'),
]

