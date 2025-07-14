from boto3 import client

def get_player(player_name: str, table_name: str):
    dynamodb = client('dynamodb')
    return dynamodb.get_item(
        TableName=table_name,
        Key={
            'Name': {
                'S': player_name
            }
        }
    ).get('Item')

def get_players(table_name: str):
    dynamodb = client('dynamodb')
    return dynamodb.scan(TableName=table_name).get('Items')

def post_player(player_name: str, table_name: str, **kwargs):
    dynamodb = client('dynamodb')
    key: dict = {key.title(): {'S': value} for key, value in kwargs.items()}
    key['Name'] = {'S': player_name}
    print(f'[INFO] Key: {key}')
    return dynamodb.put_item(TableName=table_name, Key=key)
