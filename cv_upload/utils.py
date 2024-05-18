import csv
from io import TextIOWrapper

def process_csv(instance):
    # Access the uploaded CSV file
    csv_file = instance.csv_file

    # Decode the CSV file content
    decoded_content = csv_file.read().decode('utf-8')

    # Create a StringIO object to mimic file-like behavior
    csv_file_object = TextIOWrapper(csv_file, encoding='utf-8')

    # Create a CSV reader object
    reader = csv.DictReader(csv_file_object)

    # Initialize a list to store the extracted data
    data = []

    # Iterate through each row in the CSV file
    for row in reader:
        # Extract data from the CSV row
        email = row.get('Email')
        name = row.get('Name')
        credit_score = int(row.get('CreditScore', 0))  # Default to 0 if not provided
        credit_lines = int(row.get('CreditLines', 0))  # Default to 0 if not provided
        masked_phone_number = row.get('MaskedPhoneNumber')

        # Append the extracted data to the list
        data.append({
            'email': email,
            'name': name,
            'credit_score': credit_score,
            'credit_lines': credit_lines,
            'masked_phone_number': masked_phone_number,
        })

    return data
