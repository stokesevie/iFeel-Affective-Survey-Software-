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
from django.urls import path, include, re_path
from rest_framework import routers
from db import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView
)



urlpatterns = [
    path("admin/", admin.site.urls),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('users/',views.UserDetail.as_view()),
    path('message/<int:receiver_id>/', views.MessageDetail.as_view()),
    path('messages/', views.MessageDetail.as_view()),
    path('message/<int:receiver_id>/<int:sender_id>', views.MessageDetail.as_view()),
    path('sender/<str:username>/', views.FindUser.as_view()),
    path('courses/<int:student_id>/', views.StudentEnrollFind.as_view()),
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('courseDetail/<str:id>', views.CourseDetail.as_view()),
    path('labs/<str:course_id>', views.LabDetail.as_view()),
    path('recent_message/<int:receiver_id>', views.RecentMessage.as_view()),
    path('survey/<int:lab_id>/', views.FindSurvey.as_view()),
    path('post_survey/', views.FindSurvey.as_view()),
    path('survey/', views.FindStudentSurvey.as_view()),
    path('survey/<int:lab_id>/<int:student_id>/', views.FindStudentSurvey.as_view()),
    path('question/<int:question_id>/', views.LabQuestions.as_view()),
    path('question/', views.LabQuestions.as_view()),
    path('student_lab/<int:student_id>/<int:lab_id>/', views.FindStudentLabRisk.as_view()),
    path('student_lab_risk/', views.FindStudentLabRisk.as_view()),
    path('student_lab_risks/<int:student_id>/', views.LabRisksByStudent.as_view()),
    path('student_lab_risks/lab/<int:lab_id>/', views.LabRisksByLab.as_view()),
    path('axis_labels/<int:axis_id>/', views.FindAxisLabel.as_view()),
    path('axis_labels/', views.FindAxisLabel.as_view()),
    path('average/', views.AxisAverage.as_view()),
    path('average/<int:lab_id>/<int:axis_id>/', views.AxisAverage.as_view()),
    path('average/<int:student_id>/', views.AxisAverage.as_view()),
    path('average_lab/<int:student_id>/<int:lab_id>/', views.AxisAverage.as_view()),
    path('tutor_teaching/<int:user_id>/', views.FindTutorTeaching.as_view()),
    path('student_teaching/<int:lab_id>/', views.FindTutorStudent.as_view()),
    path('students/<int:pk>/', views.StudentDetail.as_view()),
]

