from json import dumps
from os import getenv

from boto3 import client

dynamodb = client('dynamodb')

app_name = getenv('APP_NAME')
env_ = getenv('ENVIRONMENT')

def get_player(name: str, age: int):
    return dynamodb.get_item(
        TableName=f'{env_}-{app_name}-player',
        Key={
            'Name': {
                'S': name
            },
            'Age': {
                'N': age
            }
        }
    ).get('Item')
    
def get_request_info(event) -> list:
    return event['routeKey'].split()

def handler(event, context):

    print(f'[INFO] Event {event}')
    print(f'[INFO] Context {context}')

    request_type = ''
    request_path = ''

    try:
        request_type, request_path = get_request_info(event)
        print(f'[INFO] Request type {request_type}')
        print(f'[INFO] Request path {request_path}')
    except KeyError as error:
        print(f'[ERROR] {error}')

    if request_type == 'GET':
        print(f'[INFO] HTTP {request_type}')
        try:
            if '/player' in request_path:
                name = event.get("pathParameters", {}).get("name", "")
                print(f"[INFO] /GET /player/{name}")
                return get_player(name=name, age=26)
        except Exception as error:
            print(f'[ERROR] {error}')
        
    elif request_type == 'POST':
        print(f'[INFO] HTTP {request_type}')

    return {
        'statusCode': 200,
        'body': dumps('Player added to the DynamoDB!')
    }
