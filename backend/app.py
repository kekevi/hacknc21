from flask import Flask, json, jsonify, request
from flask_cors import CORS
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
         "groceries": 300,
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


app = Flask(__name__)
CORS(app)

# routes interacted with by frontend


@app.get("/user/<uid>")
def user_summary(uid):
    uid = int(uid)
    # return user's overall info
    return jsonify(
        accountNumber=users[uid].get('account'),
        createdDate=users[uid].get('created_date'),
        initialOldBalance=users[uid].get('initial_balance'),
        currentBalance=calcCurrentBalance(uid),
        totalPaidBalance=calcTotalPaid(uid)
    )

@app.get("/user/<uid>/transactions")
def get_all_transactions(uid):
    uid = int(uid)
    return jsonify(users[uid]['transactions'])


@app.get("/user/<uid>/limits")
def user_limits(uid):
    uid = int(uid)
    # return user's limit for each category and how much they have spent so far this month
    dicts = []
    for c in users[uid]['limits'].keys():
        used = 0
        for t in users[uid]['transactions']:
            if categories.get(t['MCC'], "nothere") == c and t['date'].month == 11:
                used += t['amount']
        dicts.append({'name': c, 'limit': users[uid]['limits'][c], 'used': -1*used})
    return jsonify(dicts)


@app.post("/user/<uid>/request")
def request_spending(uid):
    # decide whether or not to approve the request to spend more than limit
    data = request.json
    uid = int(uid)
    limit = users[uid].get('limits').get(data['category'])
    if data['amount'] < 1.2 * limit:
        # within 120% of category's normal limit, approve
        users[uid]['preauthorized'].append({
            'data_approved': date.today(), 'amount': data['amount'], 'category': data['category']
            })
        return jsonify(
            approved=True,
            prePayRequired=False,
            prePayAmount=0
        )
    elif data['amount'] < 3.0 * limit:
        # require prepayment of excess amount up to three times limit
        return jsonify(
            approved=True,
            prePayRequired=True,
            prePayAmount=(data['amount'] - limit)
        )
    else:
        return jsonify(
            approved=False,
            prePayRequired=False,
            prePayAmount=0
        )

# routes representing data coming from other bank systems
# this is not going to be called by our API


@app.post("/user/<uid>/swipe")
def txn_authorize(uid):
    # return a response saying whether or not user should be allowed to make this purchase
    # i.e. is it within their limits or do they have approved request for it

    data = request.json
    uid = int(uid)

    # check appropriate limit
    if data['amount'] <= users[uid].get('limits')[categories[data['mcc']]]:
        return jsonify(True)
    # check
    for a in users[uid].get('preauthorized'):
        # evaluate if authorization matched transaction
        if categories[data['mcc']] != a.get('category'):
            continue
        if data['amount'] > 1.1 * a.get('amount'):
            continue
        if (date.today() - a.get('data_approved')).days > 2:
            continue
        if a.get('used', False):
            continue
        # tests passed, approve
        a['used'] = True
        return jsonify(True)

    # tests failed for all authorizations
    return jsonify(False)


# internal functions


def calcCurrentBalance(uid):
    # net value of all transactions
    counter = 0
    for t in users[uid]['transactions']:
        counter += t['amount']
    return counter + users[uid]['initial_balance']


def calcTotalPaid(uid):
    # add up all payments
    counter = 0
    for t in users[uid]['transactions']:
        if t['amount'] > 0:
            counter += t['amount']
    return counter
