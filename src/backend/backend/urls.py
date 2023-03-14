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
    path('message/<int:receiver_id>/', views.MessageDetail.as_view()),
    path('messages/', views.MessageDetail.as_view()),

    # courses and lab details
    path('courses/<int:student_id>/', views.StudentEnrollFind.as_view()),
    path('course/<int:student_id>/<int:tutor_teaching_id>/', views.StudentEnrollFind.as_view()),
    path('courseDetail/<str:id>', views.CourseDetail.as_view()),
    path('labs/<str:course_id>', views.LabDetail.as_view()),

    # survey details
    path('survey/<int:lab_id>/<int:tutor_teaching_id>/', views.FindSurvey.as_view()),
    path('post_survey/', views.FindSurvey.as_view()),
    path('survey/', views.FindStudentSurvey.as_view()),
    path('survey_student/<int:lab_id>/<int:student_id>/', views.FindStudentSurvey.as_view()),

    #question details
    path('question/<int:question_id>/', views.LabQuestions.as_view()),
    path('question/', views.LabQuestions.as_view()),

    # axis details
    path('axis_labels/<int:axis_id>/', views.FindAxisLabel.as_view()),
    path('axis_labels/', views.FindAxisLabel.as_view()),

    # student tutor risks
    path('student_lab_risk/<int:student_id>/<int:tutor_teaching_id>/<str:count>/', views.FindStudentLabRisk.as_view()),
    path('student_lab/<int:student_id>/<int:lab_id>/', views.FindStudentLabRisk.as_view()),
    path('student_lab_risk/', views.FindStudentLabRisk.as_view()),
    path('student_lab_risks/<int:student_id>/', views.LabRisksByStudent.as_view()),
    path('student_lab_risks/lab/<int:lab_id>/', views.LabRisksByLab.as_view()),
    path('student_lab_risks/lab/<int:lab_id>/<int:tutor_teaching_id>/', views.LabRisksByLab.as_view()),

    #student student risks
    path('average/', views.AxisAverage.as_view()),
    path('average/<int:lab_id>/<int:axis_id>/', views.AxisAverage.as_view()),
    path('average/<int:student_id>/', views.AxisAverage.as_view()),
    path('average_lab/<int:student_id>/<int:lab_id>/', views.AxisAverage.as_view()),

    #details about tutor/ student
    path('tutor_teaching/<int:user_id>/', views.FindTutorTeaching.as_view()),
    path('students/<int:pk>/', views.StudentDetail.as_view()),
]

