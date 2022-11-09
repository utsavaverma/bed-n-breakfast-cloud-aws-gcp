'''
The following code was referred from the following official GCP resources:
https://cloud.google.com/firestore/docs/manage-data/add-data
https://cloud.google.com/functions/docs/samples/functions-http-cors#functions_http_cors-python
'''


from google.cloud import firestore
from datetime import datetime

def hello_world(request):
  headers = {
    'Access-Control-Allow-Origin': '*'
  }
  if(request.method == 'OPTIONS'):
    headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600'
    }
    return('', 204, headers)

  data = request.get_json()
  db = firestore.Client()
  email = data['email']
  logoutData = {
    "email" : email,
    "timestamp" : datetime.now(),
    "activity" : "Logout"
  }
  addDoc = db.collection(u'userloginactivity').document().set(logoutData)
  print(addDoc)
  return ("success",200, headers)