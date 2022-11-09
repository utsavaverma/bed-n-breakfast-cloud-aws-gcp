from google.cloud import firestore
import random
import string
import requests

def book_room(request):
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


  print(request.get_json())
  data = request.get_json()

  userid = data['userid']
  key = "orderid"
  value = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 7))
  data[key] = value

  db = firestore.Client()
  addDoc = db.collection(u'roombooking').document(userid).set(data)

  URL = "https://us-central1-serverlesbandb.cloudfunctions.net/publishFunc"
  
  res = requests.post(url = URL, json = data)
  print("Response from Pub Sub: ", res)
  print(addDoc) 
  final_response = {
    "message": "Data Added Succsfully"
  }
  return (final_response,200, headers)