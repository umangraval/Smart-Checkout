from app import app
import pickle
import pandas as pd
from datetime import datetime, timedelta, date
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
import keras
import numpy as np
import datetime
import calendar
from flask.json import jsonify

def add_months(sourcedate, months):
    month = sourcedate.month - 1 + months
    year = sourcedate.year + month // 12
    month = month % 12 + 1
    day = min(sourcedate.day, calendar.monthrange(year,month)[1])
    return datetime.date(year, month, day)

@app.route("/ping")
def ping():
    return "pong"


@app.route("/predictions/revenue")
def revenePrediction():
    return "revenue"


@app.route("/predictions/sales")
def salesPrediction():

    # pre processing data
    df_sales = pd.read_csv(
        "./datasets/test_sales.csv")
    # df_sales['date'] = df_sales['date'].dt.year.astype(
    #     'str') + '-' + df_sales['date'].dt.month.astype('str') + '-01'
    # df_sales['date'] = pd.to_datetime(df_sales['date'])
    df_sales = df_sales.groupby('date').sales.sum().reset_index()

    df_diff = df_sales.copy()
    df_diff['prev_sales'] = df_diff['sales'].shift(1)
    df_diff = df_diff.dropna()
    df_diff['diff'] = (df_diff['sales'] - df_diff['prev_sales'])
    df_supervised = df_diff.drop(['prev_sales'], axis=1)

    for inc in range(1, 13):
        field_name = 'lag_' + str(inc)
        df_supervised[field_name] = df_supervised['diff'].shift(inc)

    df_supervised = df_supervised.dropna().reset_index(drop=True)
    df_model = df_supervised.drop(['sales', 'date'], axis=1)
    train_set, test_set = df_model[0:-6].values, df_model[-6:].values

    scaler = MinMaxScaler(feature_range=(-1, 1))
    scaler = scaler.fit(train_set)
    test_set = test_set.reshape(test_set.shape[0], test_set.shape[1])
    test_set_scaled = scaler.transform(test_set)

    train_set = train_set.reshape(train_set.shape[0], train_set.shape[1])
    train_set_scaled = scaler.transform(train_set)

    X_test, Y_test = test_set_scaled[:, 1:], test_set_scaled[:, 0:1]
    X_test = X_test.reshape(X_test.shape[0], 1, X_test.shape[1])

    # your project folder
    filename = "./models/sales_prediction"

    # loading model
    loaded_model = keras.models.load_model(filename)

    # predicted values
    y_pred = loaded_model.predict(X_test, batch_size=1)
    y_pred = y_pred.reshape(y_pred.shape[0], 1, y_pred.shape[1])

    # post processing
    pred_test_set = []
    for index in range(0, len(y_pred)):
        # print(np.concatenate([y_pred[index], X_test[index]], axis=1))
        pred_test_set.append(np.concatenate(
            [y_pred[index], X_test[index]], axis=1))
    pred_test_set[0]
    pred_test_set = np.array(pred_test_set)
    pred_test_set = pred_test_set.reshape(
        pred_test_set.shape[0], pred_test_set.shape[2])
    pred_test_set_inverted = scaler.inverse_transform(pred_test_set)
    result_list = []
    sales_dates = list(df_sales[-7:].date)[6]
    # print(sales_dates.split("-")[0])
    start_date = datetime.date(int(sales_dates.split("-")[0]), int(sales_dates.split("-")[1]), 1)
    act_sales = list(df_sales[-7:].sales)

    for index in range(0, len(pred_test_set_inverted)):
        result_dict = {}
        result_dict['pred_value'] = int(
            pred_test_set_inverted[index][0] + act_sales[index])
        result_dict['date'] = add_months(start_date,index+1).strftime('%Y-%m-%d')
        result_list.append(result_dict)
    df_result = pd.DataFrame(result_list)

    return df_result.to_json()


@app.route("/predictions/customers")
def customerList():
    return "segmenation"
