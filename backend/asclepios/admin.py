from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Asclepian, Group, Role, Unit


class AsclepianAdmin(UserAdmin):

    pass
#    fieldsets = (*UserAdmin.fieldsets,
#                 ("Asclepios", {"fields" : ("role",)}),
#                )

admin.site.unregister(Group)

admin.site.register(Asclepian, AsclepianAdmin)
admin.site.register(Role)
admin.site.register(Unit)