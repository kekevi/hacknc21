from datetime import date

users = [
    {'account': 1234, 'created_date': 20211101, 'initial_balance': 10000,
        'transactions': [
            # last month
            {'date': date(2021, 10, 27), 'amount': 100, 'merchant': "JOES GROCERIES", 'MCC': 5411},
            {'date': date(2021, 10, 12), 'amount': 50, 'merchant': "BEST BUY", 'MCC': 5722},
            # this month
            {'date': date(2021, 11, 1), 'amount': 25, 'merchant': "JOES GROCERIES", 'MCC': 5722}
            ],
        'preauthorized': [
            {'data_approved': date(2021, 10, 15), 'amount': 2000, 'category': 1}
            ],
        'payments': [
            # last month
            {'date': date(2021, 10, 15), 'amount': -100}
            # this month
            ]
        }
    ]

categories = {
    1: 5411
}