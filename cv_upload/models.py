# models.py
from django.db import models

class CSVData(models.Model):
    csv_file = models.FileField(upload_to='csv_files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

from django.db import models

class UserData(models.Model):
    email = models.EmailField()
    name = models.CharField(max_length=100)
    credit_score = models.IntegerField()
    credit_lines = models.IntegerField()
    masked_phone_number = models.CharField(max_length=12)  # Assuming phone number format ***-***-****

    def __str__(self):
        return self.name
   