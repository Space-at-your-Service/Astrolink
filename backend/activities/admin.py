from django.contrib import admin

from .models import Procedure, ProcedureType, ProcedureSubtype, Planning, Task


admin.site.register(Procedure)
admin.site.register(ProcedureType)
admin.site.register(ProcedureSubtype)

admin.site.register(Planning)
admin.site.register(Task)