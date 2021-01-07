from django.contrib import admin

from .models import Procedure, ProcedureType, ProcedureSubtype


admin.site.register(Procedure)
admin.site.register(ProcedureType)
admin.site.register(ProcedureSubtype)