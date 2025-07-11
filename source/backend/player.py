from json import dumps
from os import getenv

from boto3 import client

dynamodb = client('dynamodb')

app_name = getenv('APP_NAME')
env_ = getenv('ENVIRONMENT')


def is_request_get(request_type: str) -> bool:
    return 'GET' in request_type


def get_player(name: str):
    return dynamodb.get_item(
        TableName=f'{env_}-{app_name}-player',
        Key={
            'Name': {
                'S': name
            }
        }
    ).get('Item')


def get_request_info(event) -> list:
    try:
        return event['routeKey'].split()
    except KeyError as error:
        print(f'[ERROR] {error}')


def handler(event, context):
    print(f'[INFO] Event {event}')
    print(f'[INFO] Context {context}')

    request_type, request_path = get_request_info(event)
    print(f'[INFO] Request type {request_type}')
    print(f'[INFO] Request path {request_path}')

    if is_request_get(request_type):
        try:
            if '/player' in request_path:
                name = event.get("pathParameters", {}).get("name", "")
                print(f"[INFO] /GET /player/{name}")
                return get_player(name=name)
        except Exception as error:
            print(f'[ERROR] {error}')

    elif request_type == 'POST':
        print(f'[INFO] HTTP {request_type}')

    return {
        'statusCode': 200,
        'body': dumps('Player added to the DynamoDB!')
    }
