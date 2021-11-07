from datetime import date

users = [
    {'account': 1234, 'created_date': 20211101, 'initial_balance': 10000,
     'transactions': [
         {'date': date(2021, 10, 27), 'amount': 100, 'MCC': 0},
         {'date': date(2021, 10, 12), 'amount': -50, 'MCC': 4111},
         {'date': date(2021, 11, 1), 'amount': -48, 'MCC': 4812},
         {'date': date(2021, 8, 21), 'amount': 67, 'MCC': 0},
         {'date': date(2021, 9, 15), 'amount': -80, 'MCC': 5441},
         {'date': date(2021, 11, 15), 'amount': 23, 'MCC': 0},
         {'date': date(2021, 11, 11), 'amount': -21, 'MCC': 4899},
         {'date': date(2021, 11, 3), 'amount': -60, 'MCC': 4899},
         {'date': date(2021, 11, 20), 'amount': 2, 'MCC': 0},
         {'date': date(2021, 9, 15), 'amount': -34, 'MCC': 5299},
         {'date': date(2021, 11, 5), 'amount': -26, 'MCC': 4900},
         {'date': date(2021, 11, 23), 'amount': -46, 'MCC': 5072},
         {'date': date(2021, 11, 11), 'amount': -25, 'MCC': 5542},
         {'date': date(2021, 11, 8), 'amount': -84, 'MCC': 5732},
     ],
     'preauthorized': [
         {'data_approved': date(2021, 10, 15), 'amount': 2000, 'category': 'transportation'}
     ],
     'limits': {
         "transportation": 100,
         "utilities": 500,
         "fuel": 100,
         "home_improvement": 200,
         "electronics": 150,
         "fashion": 10
     }
     },
]

categories = {
    4111: "transportation",
    4112: "transportation",
    4131: "transportation",
    4511: "transportation",
    4812: "utilities",
    4900: "utilities",
    4899: "utilities",
    5541: "fuel",
    5542: "fuel",
    5299: "fuel",
    5072: "home_improvement",
    5074: "home_improvement",
    5734: "electronics",
    5817: "electronics",
    5949: "electronics",
    5732: "electronics",
    5621: "fashion",
    5651: "fashion",
    5411: "groceries",
    5422: "groceries",
    5441: "groceries"
}
