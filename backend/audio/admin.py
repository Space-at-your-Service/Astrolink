"""
Audio > admin
Registers all the different
models of the app in the
django admin website
"""

from django.contrib import admin
from django.core.cache import cache
from django.db import models

from .models import Audio

class AudioAdmin(admin.ModelAdmin):
    list_display=['id','user']
    search_fields=['id','user']
    class Meta:
        model = Audio

admin.site.register(Audio,AudioAdmin )   

