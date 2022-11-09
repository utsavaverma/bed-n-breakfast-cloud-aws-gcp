'''
The following code was referred from the following AWS Official boto3 SDK resources:
https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.put_item
https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.get_item
'''

from email import message


import json
import os
import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):

    if event['context']['http-method'] == 'POST' and event['context']['resource-path'] == '/register':
        response = addSecurityQuestions(event, context) 
        return response
    elif event['context']['http-method'] == 'POST' and event['context']['resource-path'] == '/checksecurityanswer':
        response = checkSecurityQuestions(event, context) 
        return response
        
def addSecurityQuestions(event, context):
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('SecurityQuestionDB')
    response = table.put_item(
              Item={
                 
                    'userid' : event['body-json']['userid'],
                    'email' : event['body-json']['email'],
                    'birthplaceanswer' : event['body-json']['birthplaceanswer'],
                    'foodanswer' : event['body-json']['foodanswer'],
                    'coloranswer' : event['body-json']['coloranswer'],
                }
            )
    return {
                "statusCode" : "200",
                "message": "SecurityQuestions successfully stored"
            }                                

def checkSecurityQuestions(event, context):
    
    user_email = event['body-json']['email']
    birthplaceanswer = event['body-json']['birthplaceanswer']
    foodanswer = event['body-json']['foodanswer']
    coloranswer = event['body-json']['coloranswer']
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('SecurityQuestionDB')
    dynamodbResponse = table.get_item(Key={'email': user_email})
    print(dynamodbResponse)
    print(dynamodbResponse['Item'])
    print(dynamodbResponse['Item']['birthplaceanswer'])
    
    error = ""
    if dynamodbResponse['Item']['birthplaceanswer'] != birthplaceanswer : 
        print('inside first')
        error+="Security question for birth place is wrong.\n"
    if dynamodbResponse['Item']['foodanswer'] != foodanswer :
        print('inside second')
        error+="Security question for your favorite food is wrong.\n"
    if dynamodbResponse['Item']['coloranswer'] != coloranswer :
        print('inside color')
        error+="Security question for your favorite color is wrong.\n"
    return  {
            "message": error
        }

    
    
    

