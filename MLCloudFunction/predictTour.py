from google.cloud import aiplatform
from flask import jsonify
from google.protobuf import json_format
from google.protobuf.struct_pb2 import Value

#reference:https://cloud.google.com/vertex-ai/docs/samples/aiplatform-predict-sample
def predictTour(request):
    global packageList
    global packages
    global score
    headers={
        'Access-Control-Allow-Origin': '*'
    }
    if(request.method == 'OPTIONS'):
        headers={
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return('',204,headers)
    
    
    req_json = request.get_json()
    if req_json:
         dict={
             "stay_duration":req_json["stay_duration"]
             }
  
    predictResults=predict_tabular_classification_sample(project="csci-5410-serverless-355802",
    endpoint_id="1572838189394034688",
    instances=dict,
    location="us-central1",
    api_endpoint="us-central1-aiplatform.googleapis.com")
    maximumValue=max(zip(predictResults.values(), predictResults.keys()))[1]

    def maxValueRes(maximumValue):
      if(maximumValue=="superdelux"):
        return "Package 1 -> Superdelux"
      elif (maximumValue=="delux"):
        return "Package 2 -> Delux"
      elif (maximumValue=="basic"):
        return "Package 3 -> Basic"

    suggestPackage=maxValueRes(maximumValue)
    return (suggestPackage,200,headers)

    
def predict_tabular_classification_sample(
    project= "csci-5410-serverless-355802",
    endpoint_id="1572838189394034688",
    instances= dict,
    location= "us-central1",
    api_endpoint="us-central1-aiplatform.googleapis.com",
):
    aiplatform.init(project=project, location=location)
    client_options = {"api_endpoint": api_endpoint}
    client = aiplatform.gapic.PredictionServiceClient(client_options=client_options)
    json_instances = json_format.ParseDict(instances, Value())
    instances = [json_instances]
    jsonparamsDict = {}
    parameters = json_format.ParseDict(jsonparamsDict, Value())
    endpoint = client.endpoint_path(
        project=project, location=location, endpoint=endpoint_id
    )
    response = client.predict(
        endpoint=endpoint, instances=instances, parameters=parameters
    )

    predictions = response.predictions
    for p in predictions:
        
        predictResults=dict(p)
        predictList=list(predictResults.keys())[0]
        if(predictList=="classes"):
            packageList=predictResults["classes"]
            score=predictResults["scores"]
            merge=zip(packageList,score)
        
            return dict(merge)
        else:
            score=predictResults["scores"]
            packages=predictResults["classes"]   
            merge=zip(packages,score)
            return dict(merge)