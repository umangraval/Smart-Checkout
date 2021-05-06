from app import app
import pickle
import pandas as pd
from datetime import datetime, timedelta, date
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
import keras


@app.route("/ping")
def ping():
    return "pong"


@app.route("/predictions/revenue")
def revenePrediction():
    return "revenue"


@app.route("/predictions/sales")
def salesPrediction():
    df_sales = pd.read_csv(
        '/home/devam/projects/CSE3999-TARP/flask-backend/datasets/sales_prediction_train.csv')
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
    filename = "/home/devam/projects/CSE3999-TARP/flask-backend/models/sales_prediction"
    loaded_model = keras.models.load_model(filename)
    result = loaded_model.predict(X_test, batch_size=1)
    return str(result)


@app.route("/predictions/customers")
def customerList():
    return "segmenation"
