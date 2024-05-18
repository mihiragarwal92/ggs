from django.urls import path
from .views import upload_csv, display_csv, calculate_price

urlpatterns = [
    path('', upload_csv, name='upload_csv'),
    path('display/', display_csv, name='display_csv'),
    path('calculate_price/', calculate_price, name='calculate_price'),
]
