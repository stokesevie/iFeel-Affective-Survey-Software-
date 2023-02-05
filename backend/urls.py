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


urlpatterns = [
    path("admin/", admin.site.urls),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('message/<int:receiver_id>/', views.MessageDetail.as_view()),
    path('messages/', views.MessageDetail.as_view()),
    path('message/<int:receiver_id>/<int:sender_id>', views.MessageDetail.as_view()),
    path('sender/<str:username>/', views.FindUser.as_view()),
    path('courses/<int:student_id>/', views.StudentEnrollFind.as_view()),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('courseDetail/<str:id>', views.CourseDetail.as_view()),
    path('labs/<str:course_id>', views.LabDetail.as_view()),
    path('recent_message/<int:receiver_id>', views.RecentMessage.as_view()),
    path('survey/<int:lab_id>', views.FindSurvey.as_view()),
    path('question/<int:question_id>', views.LabQuestions.as_view()),
    path('student_lab/<int:student_id>/<int:lab_id>/', views.FindStudentLabRisk.as_view()),
    path('student_lab_risks/<int:student_id>/', views.LabRisksByStudent.as_view()),
    path('axis_detail/<int:axis_id>/', views.FindAxisDetail.as_view()),
    path('axis_labels/<int:axis_id>/', views.FindAxisLabel.as_view()),
    
]
