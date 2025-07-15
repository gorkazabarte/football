def check_request_type(actual: str, expected: str) -> bool:
    return expected in actual

def check_request_path(actual: str, expected: str) -> bool:
    return expected in actual


def get_route_info(event: dict) -> tuple | None:
    try:
        return tuple(event['routeKey'].split())
    except KeyError as error:
        print(f'[ERROR] Missing routeKey: {error}')
        return None

def get_path_params(event: dict, key: str, default: str = '') -> str:
    return event.get('pathParameters', {}).get(key, default)
