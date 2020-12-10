from django.db import models
from django.contrib.auth.models import AbstractUser


ASCLEPIOS_ROLES = [("FLIGHT", "Flight Director"),
                   ("CAPCOM", "Earth Communicator"),
                   ("BME", "Biomedical Engineer"),
                   ("PRO", "Procedures Monitoring"),
                   ("PLAN", "Flight Planning"),
                   ("SCIENCE", "Science Specialist"),
                   ("REC", "Records Manager"),
                   ("CONTACTS", "Contacts"),]


class Asclepian(AbstractUser):

    role = models.CharField(choices = ASCLEPIOS_ROLES, max_length = 10)