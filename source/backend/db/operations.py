from boto3 import client

def get_item(item_name: str, table_name: str):
    dynamodb = client('dynamodb')
    return dynamodb.get_item(
        TableName=table_name,
        Key={
            'Name': {
                'S': item_name
            }
        }
    ).get('Item')

def get_table(table_name: str):
    dynamodb = client('dynamodb')
    return dynamodb.scan(TableName=table_name).get('Items')

def post_item(item_name: str, table_name: str, **kwargs):
    dynamodb = client('dynamodb')
    item: dict = {
        'Name': {'S': item_name}
        **{k.title(): {'S': v} for k, v in kwargs.items()}
    }

    print(f"[INFO] Put item to {table_name}: {item}")

    return dynamodb.put_item(TableName=table_name, Item=item)
