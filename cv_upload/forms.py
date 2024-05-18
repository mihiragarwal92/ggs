from django import forms
from .models import CSVData

class CSVUploadForm(forms.ModelForm):
    class Meta:
        model = CSVData
        fields = ['csv_file']
