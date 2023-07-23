from django.db import models

# Create your models here.
class Course(models.Model):
    name = models.CharField(max_length=255)
    pdf = models.FileField(upload_to='./courses/pdfs/', null=True)  # PDF files will be saved in media/courses/pdfs directory
    tuition = models.DecimalField(max_digits=10, decimal_places=2)  # Tuition fee, maximum of 10 digits, and 2 decimal places

    def __str__(self):
        return self.name