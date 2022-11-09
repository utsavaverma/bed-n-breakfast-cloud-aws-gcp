import base64
import json
import os
from google.cloud import pubsub_v1

publisher = pubsub_v1.PublisherClient()
PROJECT_ID = os.getenv('serverlesbandb')

def publishMsg(request):
  req = request.get_json()
  print(req)

  topicPath = 'projects/serverlesbandb/topics/roomBook'

  msg = json.dumps(req, indent=2).encode('utf-8')
  print(msg)
  try:
    publishFuture = publisher.publish(topicPath, data = msg)
    print(publishFuture.result())
  except Exception as e:
    print(e)
    return (e, 500)

  return ('Message received and published to pubsub', 200)