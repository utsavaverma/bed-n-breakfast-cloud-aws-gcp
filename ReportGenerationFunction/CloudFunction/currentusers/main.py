'''
The following code was referred from the following official GCP resources:
https://cloud.google.com/firestore/docs/query-data/get-data#python_4
https://cloud.google.com/functions/docs/samples/functions-http-cors#functions_http_cors-python
'''


from google.cloud import firestore
def getactivity(request):
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
  docs = db.collection(u'userloginactivity').stream()
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

