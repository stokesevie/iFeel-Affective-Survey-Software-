import os
import django
import random
import datetime
import string
from django.utils import timezone
from datetime import date

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

django.setup()
from db.models import *
from django.contrib.auth.models import User

def generate_username():
    # Generate a random 7-digit number as the base of the username
    username_base = ''.join(random.choice(string.digits) for i in range(7))
    # Generate a random letter to add to the end of the username
    username_end = random.choice(string.ascii_lowercase)
    # Combine the two parts to create the final username
    username = username_base + username_end
    return username

def populate():
    tutor_user = User.objects.create_superuser(username='1234567t', password='testpassword', is_staff=True,first_name='Jane', last_name='Smith',email="1234567t@glasgow.ac.uk")
    tutor_user1 = User.objects.create(username='2345678t', password='testpassword', is_staff=True,first_name='Alex', last_name='Brown',email="2345678t@glasgow.ac.uk")
    
    tutor_obj = tutor.objects.create(username=tutor_user)
    tutor_obj1 = tutor.objects.create(username=tutor_user1)

    first_names = ['John', 'Sarah', 'Tom', 'Emily', 'James', 'Olivia', 'Emma', 'Ava', 'Sophia', 'Isabella']
    last_names = ['Smith', 'Johnson', 'Lee', 'Brown', 'Garcia', 'Davis', 'Taylor', 'Wilson', 'Anderson', 'Moore']

    for i in range(1, 50):
        # Generate a random first name, last name, and student ID number
        first_name = random.choice(first_names)
        last_name = random.choice(last_names)
        
        # Create the username and email address
        username = generate_username()
        email = username + '@student.gla.ac.uk'
        
        # Create the user account
        user = User.objects.create_user(username=username, password='testpassword', first_name=first_name, last_name=last_name, email=email)
        user.save()
        student.objects.create(username = user, level=1)

    CS1_courses = [
        {'id': ' COMPSCI1016',
            'title': 'Introduction to Computational Thinking', 
        'level': 1,
        'start_date': date(2022, 9, 13),
        'end_date': date(2023, 12, 2)
        },
        {
        'id': 'COMPSCI1018',
        'title': 'Systems',
        'level': 1,
        'start_date': date(2022, 9, 6),
        'end_date': date(2023, 12, 1)
    },
    {
        'id': 'COMPSCI1006',
        'title': 'Computing Fundamentals',
        'level': 1,
        'start_date': date(2022, 9, 9),
        'end_date': date(2023, 12, 2)
    },
    {
        'id': 'COMPSCI1001',
        'title': 'Computing Science 1P',
        'level': 1,
        'start_date': date(2022, 9, 8),
        'end_date': date(2023, 1,12)
    },
    {
        'id': 'COMPSCI1017',
        'title': 'PSE',
        'level': 1,
        'start_date': date(2022, 9, 21),
        'end_date': date(2023, 12, 4)
    },
    {
        'id': 'COMPSCI1022',
        'title': 'Testing and Improvement',
        'level': 1,
        'start_date': date(2022, 9, 23),
        'end_date': date(2023, 12, 4)
    }]

    courses=[]
    tts = []

    for c in CS1_courses:
        course_obj = course.objects.create(
            id=c['id'], 
            title=c['title'], 
            level=c['level'], 
            start_date=c['start_date'], 
            end_date=c['end_date']
        )
        tt =tutor_teaching.objects.create(tutor_id=tutor_obj, course_id=course_obj)

    students = student.objects.all()
    courses = tutor_teaching.objects.all()

    # Enroll student in course
    for s in students:
        for c in courses:
            # Randomly enroll the student in the course with a 50% chance
            if random.random() < 0.5:
                enrollment = student_enroll.objects.create(student_id=s, tutor_teaching_id=c)

    # Create lab

    lab_titles = ["Intro to Python", "Data Structures", "Algorithms", "Web Development", "Machine Learning", "Database Design"]

    # Generate list of labs
    labs = []
    start_date = date(2022, 9, 13)
    end_date = date(2023, 12, 2)
    course_ids = course.objects.values_list('id', flat=True)
    for course_id in course_ids:
        num_labs = random.randint(5, 10)
        for i in range(num_labs):
            lab_number = random.randint(1, 10)
            lab_title = random.choice(lab_titles)
            lab_date = start_date + timezone.timedelta(days=random.randint(0, (end_date - start_date).days))
            lab_help = f"https://example.com/help/{course_id}/{lab_number}"
            lab_obj= lab(course_id_id=course_id, lab_number=lab_number, title=lab_title, date=lab_date, help=lab_help)
            labs.append(lab_obj)
    lab.objects.bulk_create(labs)

    # Generate a list of possible title options
    titles = ["Positive Title 1", "Positive Title 2", "Positive Title 3",
            "Negative Title 1", "Negative Title 2", "Negative Title 3"]

    # Loop through and create 10 axis_labels with random data
    for i in range(10):
        # Randomly choose titles
        pos_title = random.choice(titles[:3])
        neg_title = random.choice(titles[3:])
        # Generate random values for risk and warn
        risk = random.randint(7, 10)
        warn = random.randint(1, 7)
        # Create a new axis_labels object with the generated data
        axis_labels_obj = axis_labels.objects.create(pos_title=pos_title, neg_title=neg_title,
                                                    risk=risk, warn=warn)
        axis_labels_obj.save()

    labs = lab.objects.all()
    students = student.objects.all()

    # create axis average objects
    for l in labs:
        for s in students:
            # create a random date within the lab's date range
            d = l.date + timezone.timedelta(days=random.randint(0, (l.date-l.date).days))
            
            # create a random point and above boolean
            point = random.randint(1, 10)
            above = random.choice([True, False])
            
            # create axis average object
            axis_average_obj = axis_average.objects.create(
                axis_id=axis_labels.objects.order_by('?').first(),
                lab_id=l,
                student_id=s,
                date=d,
                point=point,
                above=above
            )

    student_lab_risk_list = []
    start_date = date(2022, 9, 1)
    end_date = date(2023, 12, 31)
    delta = timezone.timedelta(days=1)
    axis_labels_all = axis_labels.objects.all()

    for l in labs:
        lab_start_date = l.date
        lab_end_date = l.date + timezone.timedelta(days=5) #assuming lab is for 5 days
        for s in students:
            for axis in axis_labels_all:
                lab_date = lab_start_date
                while lab_date <= lab_end_date:
                    risk = random.choice([True, False])
                    warning = random.choice([True, False])
                    student_lab_risk_obj = student_lab_risk(
                        student_id=s,
                        lab_id=l,
                        axis_id=axis,
                        date=lab_date,
                        risk=risk,
                        warning=warning
                    )
                    student_lab_risk_list.append(student_lab_risk_obj)
                    lab_date += delta

    student_lab_risk.objects.bulk_create(student_lab_risk_list)
    possible_content = ["Hi there, just wanted to ask if you understood the lab assignment.",    "Can you help me with question #5 on the lab?",    "Hey, are you going to the lab session tomorrow?",    "I'm really struggling with the lab, can we work on it together?",    "Did you see the announcement about the lab extension?",    "Can you remind me what's due for the lab next week?",    "I think I found a mistake in the lab instructions, did you notice it too?",    "Hey, do you want to form a study group for the lab?",    "How did you do on the lab quiz?",    "I won't be able to make it to the lab session today, can you fill me in later?",]

    # Create 100 random messages
    for i in range(100):
        sender = random.choice(User.objects.all())
        receiver = random.choice(User.objects.exclude(id=sender.id))
        lab_obj= random.choice(lab.objects.all())
        content = random.choice(possible_content)
        sent_at = timezone.now() - timezone.timedelta(days=random.randint(1, 14), hours=random.randint(0, 23), minutes=random.randint(0, 59), seconds=random.randint(0, 59))
        message_obj = message.objects.create(sender_id=sender, receiver_id=receiver, sent_at=sent_at, message_content=content, related_lab=lab_obj)

    axis_objs = axis_labels.objects.all()

    # Create 100 random questions
    for i in range(20):
        # Randomly select x and y axis_labels objects
        x_obj = random.choice(axis_objs)
        y_obj = random.choice(axis_objs)

        # Create new question object with randomly selected x and y axis_labels
        question_obj = question.objects.create(x=x_obj, y=y_obj)


    questions = question.objects.all()

    # Create a list of possible answers
    # Create population objects
    for l in labs:
        for tt in tutor_teaching.objects.all():
            s = survey.objects.create(
                lab_id=l,
                tutor_teaching_id=tt,
                question_1=random.choice(questions),
                question_2=random.choice(questions),
                question_3=random.choice(questions),
            )

    labs = lab.objects.all()
    surveys = survey.objects.all()

    # Get all the students
    students = student.objects.all()

    # Generate student surveys for each lab and survey combination
    for lab_item in labs:
        for survey_item in surveys:
            # Choose a random number of students to fill out the survey
            num_students = random.randint(1, len(students))
            
            # Choose a random subset of students to fill out the survey
            selected_students = random.sample(list(students), num_students)
            
            # Create a student_survey object for each selected student
            for student_item in selected_students:
                # Set the completed date to a random time within the past week
                completed_date = timezone.now() - timezone.timedelta(days=random.randint(0, 6))
                
                # Create the student_survey object
                student_survey_item = student_survey.objects.create(
                    lab_id=lab_item,
                    survey_id=survey_item,
                    student_id=student_item,
                    completed=True,
                )


if __name__ == '__main__':
    populate()

