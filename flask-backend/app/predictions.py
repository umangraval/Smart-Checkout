from app import app


@app.route("/ping")
def ping():
    return "pong"


@app.route("/predictions/revenue")
def revenePrediction():
    return "revenue"


@app.route("/predictions/customers")
def customerList():
    return "segmenation"
