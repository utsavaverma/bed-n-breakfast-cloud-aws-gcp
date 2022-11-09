'''
The following code was referred from the following official GCP resources:
https://cloud.google.com/firestore/docs/manage-data/add-data
https://cloud.google.com/functions/docs/samples/functions-http-cors#functions_http_cors-python
'''

from google.cloud import firestore


def cipherkeyregister(request):
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
  db = firestore.Client()
  addDoc = db.collection(u'ceaserkey').document().set(data)
  print(addDoc)
  return ("success",200, headers)