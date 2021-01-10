from django.db import models
from django.contrib.auth.models import AbstractUser, Group

from rest_framework.exceptions import PermissionDenied


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

Group.add_to_class("prefix", models.CharField(max_length = 20, choices = ASCLEPIOS_ROLES, default = "GUEST"))

class Asclepian(AbstractUser):

    def check_perms(self, perms):

        if not self.has_perms(perms):

            raise PermissionDenied({"message" : "Insufficient permissions."})