import csv
from django.shortcuts import render
from django.http import JsonResponse
from .forms import CSVUploadForm
import logging
from .models import CSVData

# Set up logger
logger = logging.getLogger(__name__)

def upload_csv(request):
    if request.method == 'POST':
        form = CSVUploadForm(request.POST, request.FILES)
        if form.is_valid():
            csv_file = form.cleaned_data['csv_file']
            # Save the CSV file to the database
            csv_data = CSVData.objects.create(csv_file=csv_file)
            data = csv_file.read().decode('utf-8').splitlines()
            reader = csv.reader(data)
            csv_data = list(reader)
            request.session['csv_data'] = csv_data
            return JsonResponse({'message': 'File uploaded successfully', 'rows': len(csv_data)})
        else:
            return JsonResponse({'error': 'Invalid form'}, status=400)
    else:
        form = CSVUploadForm()
    return render(request, 'upload_csv.html', {'form': form})

def display_csv(request):
    csv_data = CSVData.objects.all().last()
    if csv_data:
        with open(csv_data.csv_file.path, 'r') as file:
            reader = csv.reader(file)
            csv_data = list(reader)
    else:
        csv_data = []
    return JsonResponse({'csv_data': csv_data})

def calculate_price(request):
    if request.method == 'POST':
        csv_data = CSVData.objects.all().last()
        if not csv_data:
            return JsonResponse({'error': 'No CSV data found'}, status=400)

        email = request.POST.get('email')
        if not email:
            return JsonResponse({'error': 'Email ID is required'}, status=400)

        # Log the incoming POST data for debugging
        logger.debug(f"POST data: {request.POST}")

        # Find the row with the matching email ID
        matching_row = None
        with open(csv_data.csv_file.path, 'r') as file:
            reader = csv.reader(file)
            for row in reader:
                if row[0] == email:  # Assuming email is the first column in the CSV data
                    matching_row = row
                    break
        
        if not matching_row:
            return JsonResponse({'error': 'No data found for the provided email ID'}, status=400)

        try:
            base_price = float(request.POST.get('base-price', 0))
            price_per_credit_line = float(request.POST.get('price-per-credit-line', 0))
            price_per_credit_score_point = float(request.POST.get('price-per-credit-score-point', 0))
            credit_score = int(matching_row[2])  # Assuming CreditScore is at index 2
            credit_lines = int(matching_row[3])   # Assuming CreditLines is at index 3
            print(price_per_credit_score_point)
            print(credit_lines)
            print(base_price)
            print(email)
            print(credit_score)
        except (ValueError, IndexError) as e:
            logger.error(f"Error parsing pricing parameters or CSV data: {e}")
            return JsonResponse({'error': 'Invalid pricing parameters or CSV data'}, status=400)

        # Calculate subscription price
        subscription_price = base_price + (price_per_credit_line * credit_lines) + (price_per_credit_score_point * credit_score)
        return JsonResponse({'subscription_price': subscription_price})

    return JsonResponse({'error': 'Invalid request method'}, status=405)
