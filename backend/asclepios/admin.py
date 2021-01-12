from django.contrib import admin
from django.contrib.auth.admin import UserAdmin, GroupAdmin

from .models import Asclepian, Group, Role, Unit


class AsclepianAdmin(UserAdmin):

    pass


class RoleAdmin(GroupAdmin):

    pass


admin.site.unregister(Group)

admin.site.register(Asclepian, AsclepianAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(Unit)