from json import dumps, loads
from os import getenv

from api.operations import check_request_type, check_request_path, get_path_params, get_route_info
from db.operations import get_item, get_table, post_item

APP_NAME = getenv('APP_NAME')
ENV = getenv('ENVIRONMENT')

def handler(event, context) -> dict | None:
    print(f'[INFO] Event {event}')
    print(f'[INFO] Context {context}')

    route_info = get_route_info(event)
    if not route_info:
        return {'statusCode': 400, 'body': dumps('Bad request: Missing routeKey')}

    request_type, request_path = route_info
    print(f'[INFO] Request type {request_type}')
    print(f'[INFO] Request path {request_path}')

    table_name = f'{ENV}-{APP_NAME}-university'

    try:
        if check_request_type(request_type, 'GET'):
            if check_request_path(request_path, 'universities'):
                print(f'[INFO] /GET /universities')
                return get_table(table_name=table_name)

            elif check_request_path(request_path, 'university'):
                university_name = get_path_params(request_path, 'university')
                print(f'[INFO] /GET /university/{university_name}')
                return get_item(item_name=university_name, table_name=table_name)

            elif check_request_type(request_type, 'POST'):
                if check_request_path(request_path, 'university'):
                    university_name = get_path_params(request_path, 'university')
                    print(f'[INFO] /POST /university/{university_name}')
                    raw_body = event.get('body', {})
                    body = loads(raw_body) if isinstance(raw_body, str) else raw_body
                    return post_item(item_name=university_name, table_name=table_name, **body)
    except Exception as error:
        print(f'[ERROR] {error}')

    return {'statusCode': 404, 'body': dumps('Route not handle!')}
