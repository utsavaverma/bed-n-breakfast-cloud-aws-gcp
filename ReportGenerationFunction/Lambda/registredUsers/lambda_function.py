'''
The following code was referred from the following AWS Official boto3 SDK resources:
https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/cognito-idp.html#CognitoIdentityProvider.Client.list_users
'''







import boto3
from boto3.dynamodb.conditions import Key, Attr

client = boto3.client('cognito-idp')

def lambda_handler(event, context):
    # TODO implement
    
    response = client.list_users(
        UserPoolId='us-east-1_rIytU64lO',
        AttributesToGet=[
            'email','name',
        ]
    )   
    print(response['Users'])
    #print(response['Users'][0])
    #print(response['Users'][0]['Attributes'][0]['Value'])
    #print(response['Users'][0]['Attributes'][1]['Value'])
    list = []
    for i in range(len(response['Users'])):
        name = response['Users'][i]['Attributes'][0]['Value']
        email = response['Users'][i]['Attributes'][1]['Value']
        dict = {
            "name" : name,
            "email" : email
        }
        list.append(dict)
    print(list)
    return {
        'statusCode': 200,
        'body': list
    }
