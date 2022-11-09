from google.cloud import firestore
import random
import string
import requests

def book_tour(request):
  print(request.get_json())
  data = request.get_json()
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


  key = "orderid"
  value = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 7))
  data[key] = value

  db = firestore.Client()
  addDoc = db.collection(u'tourbooking').document().set(data)

  URL = "https://us-central1-serverlesbandb.cloudfunctions.net/publishTour"
  res = requests.post(url = URL, json = data)
  print("Response from Pub Sub: ", res)
  print(addDoc) 
  final_response = {
    "message": "Data Added Succsfully"
  }
  return (final_response,200, headers)

