from google.cloud import firestore
import random
import string
import requests

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

  db = firestore.Client()
  print(request.args.get('email'))  
  email = str(request.args.get('email'))
  print(email)
  docs = db.collection(u'roombooking').where(u'email', u'==', email).get()
  finalDict = []
  for doc in docs:
    #print(f'{doc.id} => {doc.to_dict()}')
    docDict = doc.to_dict()
    finalDict.append(docDict)
  print(finalDict)
  final_response = {
    "message": finalDict
  }
  return (final_response,200, headers)  