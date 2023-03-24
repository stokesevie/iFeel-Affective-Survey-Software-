import csv
from datetime import datetime
from db.models import course,student,tutor
import sys
from django.contrib.auth.models import User

users = sys.argv[1]

with open(users) as csvfile:
    reader = csv.reader(csvfile)
    next(reader) # skip header row
    
    for row in reader:
        # create user object
        username = row[0] 
        password = row[1] 
        email = row[2] 
        is_staff = row[3]
        user = User.objects.create_user(username=username, email=email, password=password, is_staff = is_staff)
        if is_staff:
            tutor_1 = tutor.objects.create(username=username)
        else:
            student_1 = student.objects.create(username = user, level = row[4])
        
