from json import dumps
from os import getenv

from db.operations import get_player, get_players, post_player

app_name = getenv('APP_NAME')
env_ = getenv('ENVIRONMENT')


def check_request_type(actual_request_type: str, expected_request_type: str) -> bool:
    return expected_request_type in actual_request_type

def check_request_path(actual_request_path: str, expected_request_path: str) -> bool:
    return expected_request_path in actual_request_path


def get_request_info(event) -> list | None:
    try:
        return event['routeKey'].split()
    except KeyError as error:
        print(f'[ERROR] {error}')


def handler(event, context) -> dict | None:
    print(f'[INFO] Event {event}')
    print(f'[INFO] Context {context}')

    request_type, request_path = get_request_info(event)
    print(f'[INFO] Request type {request_type}')
    print(f'[INFO] Request path {request_path}')

    if check_request_type(request_type, 'GET'):
        try:
            if check_request_path(request_path, 'players'):
                print(f'[INFO] /GET /players')
                return get_players(table_name=f'{env_}-{app_name}-player')
            elif check_request_path(request_path, 'player'):
                print(f'[INFO] /GET /player/{(player_name := event.get('pathParameters', {}).get('name', ''))}')
                return get_player(player_name=player_name, table_name=f'{env_}-{app_name}-player')
        except Exception as error:
            print(f'[ERROR] {error}')

    elif check_request_type(request_type, 'POST'):
        try:
            if check_request_path(request_path, 'player'):
                print(f'[INFO] /POST /player/{(player_name := event.get('pathParameters', {}).get('name', ''))}')
                event_body: dict = event.get('body', {})
                return post_player(player_name=player_name, table_name=f'{env_}-{app_name}-player', **event_body)
        except Exception as error:
            print(f'[ERROR] {error}')
    return {
        'statusCode': 200,
        'body': dumps('Player added to the DynamoDB!')
    }
