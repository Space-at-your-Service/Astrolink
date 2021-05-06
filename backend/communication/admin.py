"""
Communication > admin
Registers all the different
models of the app in the
django admin website
"""

from django.contrib import admin
from django.core.paginator import Paginator
from django.core.cache import cache
from django.db import models

from .models import  Room

class RoomAdmin(admin.ModelAdmin):
    list_display=['id','name']
    search_fields=['id','name']
    class Meta:
        model = Room

admin.site.register(Room,RoomAdmin )   



    


