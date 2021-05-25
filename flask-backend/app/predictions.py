from app import app
import pickle
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
from datetime import datetime, timedelta, date
import numpy as np
# import keras
import datetime
import calendar
from flask.json import jsonify
from flask_cors import CORS, cross_origin
import xgboost as xgb
import json


def add_months(sourcedate, months):
    month = sourcedate.month - 1 + months
    year = sourcedate.year + month // 12
    month = month % 12 + 1
    day = min(sourcedate.day, calendar.monthrange(year, month)[1])
    return datetime.date(year, month, day)

def order_cluster(cluster_field_name, target_field_name,df,ascending):
    new_cluster_field_name = 'new_' + cluster_field_name
    df_new = df.groupby(cluster_field_name)[target_field_name].mean().reset_index()
    df_new = df_new.sort_values(by=target_field_name,ascending=ascending).reset_index(drop=True)
    df_new['index'] = df_new.index
    df_final = pd.merge(df,df_new[[cluster_field_name,'index']], on=cluster_field_name)
    df_final = df_final.drop([cluster_field_name],axis=1)
    df_final = df_final.rename(columns={"index":cluster_field_name})
    return df_final


@app.route("/ping")
def ping():
    return "pong"

@app.route("/predictions/ltv")
@cross_origin(origin='*')
def customerLTV():
    tx_data = pd.read_csv('./datasets/data.csv')
    tx_data['InvoiceDate'] = pd.to_datetime(tx_data['InvoiceDate'])
    tx_uk = tx_data.query("Country=='United Kingdom'").reset_index(drop=True)
    tx_user = pd.DataFrame(tx_data['CustomerID'].unique())
    tx_user.columns = ['CustomerID']
    tx_max_purchase = tx_uk.groupby('CustomerID').InvoiceDate.max().reset_index()
    tx_max_purchase.columns = ['CustomerID','MaxPurchaseDate']
    tx_max_purchase['Recency'] = (tx_max_purchase['MaxPurchaseDate'].max() - tx_max_purchase['MaxPurchaseDate']).dt.days
    tx_user = pd.merge(tx_user, tx_max_purchase[['CustomerID','Recency']], on='CustomerID')
    kmeans = KMeans(n_clusters=4)
    kmeans.fit(tx_user[['Recency']])
    tx_user['RecencyCluster'] = kmeans.predict(tx_user[['Recency']])
    tx_user = order_cluster('RecencyCluster', 'Recency',tx_user,False)

    # freq
    tx_frequency = tx_uk.groupby(
        'CustomerID').InvoiceDate.count().reset_index()
    tx_frequency.columns = ['CustomerID', 'Frequency']
    tx_user = pd.merge(tx_user, tx_frequency, on='CustomerID')
    kmeans.fit(tx_user[['Frequency']])
    tx_user['FrequencyCluster'] = kmeans.predict(tx_user[['Frequency']])
    tx_user = order_cluster('FrequencyCluster', 'Frequency',tx_user,True)


    # revenue
    tx_uk['Revenue'] = tx_uk['UnitPrice'] * tx_uk['Quantity']
    tx_revenue = tx_uk.groupby('CustomerID').Revenue.sum().reset_index()
    tx_user = pd.merge(tx_user, tx_revenue, on='CustomerID')
    kmeans.fit(tx_user[['Revenue']])
    tx_user['RevenueCluster'] = kmeans.predict(tx_user[['Revenue']])
    tx_user = order_cluster('RevenueCluster', 'Revenue',tx_user,True)
    
    tx_user['OverallScore'] = tx_user['RecencyCluster'] + tx_user['FrequencyCluster'] + tx_user['RevenueCluster']
    tx_user['Segment'] = 'Low-Value'
    tx_user.loc[tx_user['OverallScore']>2,'Segment'] = 'Mid-Value' 
    tx_user.loc[tx_user['OverallScore']>4,'Segment'] = 'High-Value' 
    tx_class = pd.get_dummies(tx_user)
    ltv = pickle.load(open('./models/ltv.pkl','rb'))
    # model_xgb_2 = xgb.Booster()
    # model_xgb_2.load_model('./models/ltv.json')
    ltv_classes =  ltv.predict(tx_class)
    data = { 'CustomerID': tx_user['CustomerID'], 'Segment': tx_user['Segment'], 'LTV_Cluster': ltv_classes }
    tx_ltv = pd.DataFrame(data)
    return json.dumps(json.loads(tx_ltv.head().to_json(orient="columns")))

@app.route("/predictions/rfr")
@cross_origin(origin='*')
def customerSegmentation():
    tx_data = pd.read_csv('./datasets/data.csv')
    tx_data['InvoiceDate'] = pd.to_datetime(tx_data['InvoiceDate'])
    tx_uk = tx_data.query("Country=='United Kingdom'").reset_index(drop=True)
    tx_user = pd.DataFrame(tx_data['CustomerID'].unique())
    tx_user.columns = ['CustomerID']
    tx_max_purchase = tx_uk.groupby('CustomerID').InvoiceDate.max().reset_index()
    tx_max_purchase.columns = ['CustomerID','MaxPurchaseDate']
    tx_max_purchase['Recency'] = (tx_max_purchase['MaxPurchaseDate'].max() - tx_max_purchase['MaxPurchaseDate']).dt.days
    tx_user = pd.merge(tx_user, tx_max_purchase[['CustomerID','Recency']], on='CustomerID')
    kmeans = KMeans(n_clusters=4)
    kmeans.fit(tx_user[['Recency']])
    tx_user['RecencyCluster'] = kmeans.predict(tx_user[['Recency']])
    tx_user = order_cluster('RecencyCluster', 'Recency',tx_user,False)

    # freq
    tx_frequency = tx_uk.groupby(
        'CustomerID').InvoiceDate.count().reset_index()
    tx_frequency.columns = ['CustomerID', 'Frequency']
    tx_user = pd.merge(tx_user, tx_frequency, on='CustomerID')
    kmeans.fit(tx_user[['Frequency']])
    tx_user['FrequencyCluster'] = kmeans.predict(tx_user[['Frequency']])
    tx_user = order_cluster('FrequencyCluster', 'Frequency',tx_user,True)


    # revenue
    tx_uk['Revenue'] = tx_uk['UnitPrice'] * tx_uk['Quantity']
    tx_revenue = tx_uk.groupby('CustomerID').Revenue.sum().reset_index()
    tx_user = pd.merge(tx_user, tx_revenue, on='CustomerID')
    kmeans.fit(tx_user[['Revenue']])
    tx_user['RevenueCluster'] = kmeans.predict(tx_user[['Revenue']])
    tx_user = order_cluster('RevenueCluster', 'Revenue',tx_user,True)
    
    tx_user['OverallScore'] = tx_user['RecencyCluster'] + tx_user['FrequencyCluster'] + tx_user['RevenueCluster']
    tx_user['Segment'] = 'Low-Value'
    tx_user.loc[tx_user['OverallScore']>2,'Segment'] = 'Mid-Value' 
    tx_user.loc[tx_user['OverallScore']>4,'Segment'] = 'High-Value' 

    return json.dumps(json.loads(tx_user.tail().to_json(orient="columns")))


@app.route("/predictions/sales")
@cross_origin(origin='*')
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
    start_date = datetime.date(int(sales_dates.split(
        "-")[0]), int(sales_dates.split("-")[1]), 1)
    act_sales = list(df_sales[-7:].sales)

    for index in range(0, len(pred_test_set_inverted)):
        result_dict = {}
        result_dict['pred_value'] = int(
            pred_test_set_inverted[index][0] + act_sales[index])
        result_dict['date'] = add_months(
            start_date, index+1).strftime('%Y-%m-%d')
        result_list.append(result_dict)
    df_result = pd.DataFrame(result_list)

    res = {
        "data": result_list
    }
    return json.dumps(res)


@app.route("/predictions/customers")
def customerList():
    return "segmenation"
