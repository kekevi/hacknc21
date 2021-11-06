from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# routes interacted with by fronted

@app.get("/user/<uid>")
def user_summary(uid):
    # return user's overall info
    return ""

@app.get("/user/<uid>/limits")
def user_limits(uid):
    # return user's limit for each category and how much they have spent so far this month
    return

@app.post("/user/<uid>/request")
def request_spending():
    # decide whether or not to approve the request to spend more than limit
    return

# routes representing data coming from other bank systems
# this is not going to be called by our API

@app.post("/user/<uid>/transaction")
def txn_authorize():
    # return a response saying whether or not user should be allowed to make this purchase
    # i.e. is it within their limits or do they have apporced request for it
    return

@app.get("/user/<uid>/payment")
def accept_payment():
    # reduce user's balance due
    return
