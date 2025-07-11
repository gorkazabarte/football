from json import dumps
from os import getenv

from boto3 import client

dynamodb = client('dynamodb')

app_name = getenv('APP_NAME')
env_ = getenv('ENVIRONMENT')

def handler(event, context):

    print(f"Team Event {event}")
    print(f"Team Context {context}")

    query_string_params = event['queryStringParameters']
    print(query_string_params)

    path_params = query_string_params['path']
    print(path_params)

    request_type, request_path = event['routeKey'].split()
    if request_type == 'GET':
        print(f"Request type {request_type}")
    elif request_type == 'POST':
        print(f"Request type {request_type}")

    return {
        'statusCode': 200,
        'body': dumps('Player added to the DynamoDB!')
    }
