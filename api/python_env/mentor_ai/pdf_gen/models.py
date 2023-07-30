from django.db import models

# Create your models here.
class Course(models.Model):
    name = models.CharField("Name", max_length=256)
    description = models.CharField("Document", max_length=1024)

    def __str__(self):
        return self.name