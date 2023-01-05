from django.db import models

# Create your models here.

class db(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    password = models.CharField(max_length=20)

    def _str_(self):
        return self.title

