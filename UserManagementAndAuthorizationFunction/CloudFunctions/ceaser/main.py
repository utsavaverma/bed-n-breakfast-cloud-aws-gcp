'''
The following code was referred from the following official GCP resources:
https://cloud.google.com/firestore/docs/query-data/get-data#python_4
https://cloud.google.com/functions/docs/samples/functions-http-cors#functions_http_cors-python
'''

from google.cloud import firestore
from string import ascii_letters
from datetime import datetime


def cipher(request):
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

  email = data['email']
  ciphertext = data['ciphertext']
  decryptedAnswer = data['decryptedAnswer']
  
  db = firestore.Client()
  docs = db.collection(u'ceaserkey').where(u'email', u'==', email).get()

  finalDict = []
  for doc in docs:
    #print(f'{doc.id} => {doc.to_dict()}')
    docDict = doc.to_dict()
    finalDict.append(docDict)
  print(finalDict)
  key = finalDict[0]['key']
  print(key)
  res = decrypt(key, ciphertext)
  print(res)


  if res == decryptedAnswer:
    data = {
      "email" : email,
      "timestamp" : datetime.now(),
      "activity" : "Login"
    }
    addDoc = db.collection(u'userloginactivity').document().set(data)
    print(addDoc)
    return ("success",200, headers)
  else:
    return ("failed",200, headers)



def decrypt(key, ciphertext):

  letters = ascii_letters[26:]
  print(letters)
  dec_msg = ""
  for i in range(len(ciphertext)):
    enc_index = letters.index(ciphertext[i])
    key_index = (enc_index + (26 - int(key))) % 26
    dec_msg += letters[key_index]
    print(dec_msg)
  return dec_msg  
