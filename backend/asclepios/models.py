from django.db import models
from django.contrib.auth.models import AbstractUser, Group

from rest_framework.exceptions import PermissionDenied


ASCLEPIOS_UNITS = (("Astronauts", "Astronauts"),
                   ("MCC", "Mission Control Center"),
                   ("Scientists", "Scientists"),
                   ("External", "External"))


ASCLEPIOS_ROLES = [("MCC", (("FLIGHT", "Flight Director"),
                            ("CAPCOM", "Earth Communicator"),
                            ("BME", "Biomedical Engineer"),
                            ("PRO", "Procedures Monitoring"),
                            ("PLAN", "Flight Planning"),
                            ("SCIENCE", "Science Specialist"),
                            ("REC", "Records Manager"),
                            ("CONTACTS", "Contacts"))
                    ),

                   ("Astronauts", (("CMD", "Crew Commander"),
                                   ),
                    ),

                   ("Scientists", (("PI", "Principal Investigator"),
                                   ),
                    ),

                   ("Misc", (("GUEST", "Guest"),
                             )
                    ),
                   ]


class Asclepian(AbstractUser):

    def check_perms(self, perms):

        if not self.has_perms(perms):

            raise PermissionDenied({"message" : "Insufficient permissions."})


class Unit(models.Model):

    name = models.CharField(max_length = 20, choices = ASCLEPIOS_UNITS)

    def __str__(self):

        return self.name

Group.add_to_class("unit", models.ForeignKey(Unit, on_delete = models.PROTECT, default = 1, related_name = "groups"))

class Role(Group):

    class Meta:

        proxy = True
        verbose_name = "Role"
        verbose_name_plural = "Roles"