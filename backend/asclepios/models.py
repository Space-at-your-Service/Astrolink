"""
asclepios > models
Defines all the different
models of the app
"""


from django.contrib.auth.models import AbstractUser, Group
from django.db import models

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

    """ Represents a User in the Asclepios mission (extends the Django User model) """

    def check_perms(self, perms):

        """ Convenience method for checking a set of permissions and raising a rest framework error """

        if not self.has_perms(perms):

            raise PermissionDenied({"message" : "Insufficient permissions."})


class Unit(models.Model):

    """ Represents a group of roles, a.k.a a Unit 

        @param name (str) : The name of the Unit
    """

    name = models.CharField(max_length = 20, choices = ASCLEPIOS_UNITS)

    def __str__(self):

        return self.name

Group.add_to_class("unit", models.ForeignKey(Unit, on_delete = models.PROTECT, default = 1, related_name = "groups"))

class Role(Group):

    """ Represents a Role (proxies the Django Group model) """

    class Meta:

        proxy = True
        verbose_name = "Role"
        verbose_name_plural = "Roles"