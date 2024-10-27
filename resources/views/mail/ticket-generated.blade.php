<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Ticket Details</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #e9ecef;
            color: #343a40;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #6c757d;
            color: white;
            padding: 20px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 30px;
            line-height: 1.6;
        }

        .ticket-details {
            margin-top: 20px;
            border: 1px solid #ced4da;
            border-radius: 5px;
            padding: 15px;
            background-color: #f8f9fa;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .ticket-details h3 {
            margin: 0 0 15px;
            font-size: 20px;
            color: #495057;
        }

        .ticket-details p {
            margin: 5px 0;
            font-size: 16px;
        }

        .ticket-details strong {
            color: #007bff;
        }

        .footer {
            margin-top: 20px;
            padding: 15px;
            text-align: center;
            font-size: 14px;
            background-color: #f1f3f5;
        }

        .footer p {
            margin: 0;
            color: #6c757d;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Your Ticket Confirmation</h1>
        </div>
        <div class="content">
            <p>Dear {{ $user->name }},</p>
            <p>Thank you for booking with us! Here are your ticket details:</p>

            <div class="ticket-details">
                <h3>Ticket Details</h3>
                <p><strong>Departure:</strong> {{ $reservation['departure_stop'] }}</p>
                <p><strong>Arrival:</strong> {{ $reservation['arrival_stop'] }}</p>
                <p><strong>Date:</strong> {{ $reservation['booking_date'] }}</p>
                <p><strong>Price:</strong> ₹{{ number_format($reservation['amount'], 2) }}</p>
            </div>

            <p>If you have any questions or need assistance, feel free to contact us!</p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} Yathra-Mithra. All rights reserved.</p>
        </div>
    </div>
</body>

</html>