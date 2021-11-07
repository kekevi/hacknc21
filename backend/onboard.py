import plaid
from plaid.api import plaid_api
from plaid.model.account_subtype import AccountSubtype
from plaid.model.account_subtypes import AccountSubtypes
from plaid.model.country_code import CountryCode
from plaid.model.depository_filter import DepositoryFilter
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid.model.link_token_account_filters import LinkTokenAccountFilters
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.processor_stripe_bank_account_token_create_request import ProcessorStripeBankAccountTokenCreateRequest
from plaid.model.products import Products
from plaid.model.sandbox_public_token_create_request import SandboxPublicTokenCreateRequest
from plaid.model.transactions_get_request_options import TransactionsGetRequestOptions
from plaid.model.transactions_get_request import TransactionsGetRequest

from flask import Flask, json, jsonify, request
from __main__ import app
from datetime import date

# hardcoded, would be supplied by existing bank systems
old_balance = 19243

# much of below code copied from Python API client documentation

configuration = plaid.Configuration(
    host=plaid.Environment.Sandbox,
    api_key={
        'clientID': '6186b14b1270aa0010bb8a2f',
        'secret': 'a74b501eee490de558d36f7369e90f'
    }
)

api_client = plaid.ApiClient(configuration)
client = plaid_api.PlaidApi(api_client)


@app.get("/plaid_link_token")
def link_token():
    lt_request = LinkTokenCreateRequest(
        products=[Products('auth'), Products('transactions')],
        client_name="Project Ladder",
        country_codes=[CountryCode('US')],
        language='en',
        link_customization_name='default',
        account_filters=LinkTokenAccountFilters(
            depository=DepositoryFilter(
                account_subtypes=AccountSubtypes(
                    [AccountSubtype('checking'), AccountSubtype('savings')]
                )
            )
        ),
        user=LinkTokenCreateRequestUser(
            client_user_id='123-test-user-id'
        )
    )
    # create link token
    response = client.link_token_create(lt_request)
    return jsonify(response['link_token'])


@app.post("/user")
def enroll_user():
    data = request.json

    # the public token, account ID is received from frontend to match their Plaid Link call

    sandbox_pt = SandboxPublicTokenCreateRequest(
        institution_id='ins_109508',
        initial_products=[Products('transactions')]
    )

    data['public_token'] = client.sandbox_public_token_create(sandbox_pt)

    exchange_request = ItemPublicTokenExchangeRequest(
        public_token=data['public_token']
    )

    exchange_response = client.item_public_token_exchange(exchange_request)
    access_token = exchange_response['access_token']

    plaid_request = ProcessorStripeBankAccountTokenCreateRequest(
        access_token=access_token,
        account_id=data['account_id']
    )

    stripe_response = client.processor_stripe_bank_account_token_create(plaid_request)
    bank_account_token = stripe_response['stripe_bank_account_token']

    # get the last 30 days of transactions from the bank

    plaid_request = TransactionsGetRequest(
        access_token=access_token,
        start_date=(date.today().replace(month=(date.today().month - 1))),
        end_date=date.today()
    )

    plaid_txn_response = client.transactions_get(request)
    transactions = plaid_txn_response['transactions']

    # the transactions in the response are paginated, so make multiple calls while increasing the offset to
    # retrieve all transactions
    while len(transactions) < plaid_txn_response['total_transactions']:
        options = TransactionsGetRequestOptions()
        options.offset = len(transactions)

        plaid_request = TransactionsGetRequest(
            access_token=access_token,
            start_date=(date.today().replace(month=(date.today().month - 1))),
            end_date=date.today(),
            options=options
        )
        plaid_txn_response = client.transactions_get(request)

    print(plaid_txn_response)
