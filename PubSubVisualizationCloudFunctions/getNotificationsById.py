from google.cloud import firestore

def hello_world(request):

  if request.method == 'OPTIONS':
      # Allows GET requests from any origin with the Content-Type
      # header and caches preflight response for an 3600s
      headers = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '3600'
      }

      return ('', 204, headers)
  user = request.get_json()
  print("input", user['userid'])
  # Set CORS headers for the preflight request
  
    
  db = firestore.Client()
  docs = db.collection(u'notification').document(user['userid']).get()
  print(docs.to_dict())
  
  headers = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST',
          'Access-Control-Allow-Headers': 'Content-Type'
      }
  return (docs.to_dict(), 200, headers)