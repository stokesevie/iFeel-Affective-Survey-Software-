from django.contrib import admin
from .models import db

class dbAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

# Register your models here.

admin.site.register(db, dbAdmin)