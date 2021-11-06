from flask import Flask, json, jsonify, request
from __main__ import app

from backend.dummydata import users


@app.post("/user")
def onboard_user():
    data = request.get_data()
    # could implement checks such as total balance, past payment profile, etc here
    users.append(data)