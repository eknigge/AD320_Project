import requests

url = 'http://localhost:5000/vendor/orders/complete/5'

x = requests.post(url)

print(x.text)