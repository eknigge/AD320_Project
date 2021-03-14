import requests
import json

data = {
    "order":{
        "1": 10,
        "2":2,
        "3":0,
        "4":1,
        "103":0,
        "other":'true'},

    "cartID":3,
    "userID":2,
    "firstName":"First Name",
    "lastName":"Last Name",
    "contact":"phone number"
}

url = 'http://localhost:5000/customer/order/'
r = requests.put(url, json=data)
print(r.status_code)