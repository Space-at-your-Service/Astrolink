"""
inventory > admin
Registers all the different
models of the app in the
django admin website
"""


from django.contrib import admin

from .models import Item


admin.site.register(Item)