from json import dumps
from boto3 import client

dynamodb = client('dynamodb')

def lambda_handler(event, context):

    print(f"Event {event}")
    print(f"Context {context}")

    dynamodb.put_item(
        TableName='gzabarte',
        Item={
            'Team': {'S': 'Bishop Gorman'},
            'Name': {'S': 'Gorka'},
            'Surname': {'S': 'Zabarte'},
            'Age': {'N': '26'},
        }
    )

    return {
        'statusCode': 200,
        'body': dumps('Player added to the DynamoDB!')
    }
