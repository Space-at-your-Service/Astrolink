from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Asclepian


class AsclepianAdmin(UserAdmin):
    pass
#    fieldsets = (*UserAdmin.fieldsets,
#                 ("Asclepios", {"fields" : ("role",)}),
#                )


admin.site.register(Asclepian, AsclepianAdmin)