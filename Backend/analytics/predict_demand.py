from sklearn.linear_model import LinearRegression
import numpy as np

def predict_demand(sales_data):
    X = np.array(range(len(sales_data))).reshape(-1, 1)
    y = np.array(sales_data)

    model = LinearRegression()
    model.fit(X, y)

    future = np.array(range(len(sales_data), len(sales_data)+7)).reshape(-1, 1)
    predictions = model.predict(future)

    return predictions.tolist()