from flask import Flask, json, jsonify, request
from backend.dummydata import users, categories
from datetime import date

app = Flask(__name__)

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
