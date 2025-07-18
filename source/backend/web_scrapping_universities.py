import boto3
from bs4 import BeautifulSoup
from boto3 import client
from requests import get

dynamodb = boto3.client('dynamodb')

headers = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/114.0.0.0 Safari/537.36"
    )
}

URL = "https://www.ncsasports.org/football/division-1-colleges"
response = get(URL, headers=headers)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    print(soup.prettify())

    containers = soup.select(".container[itemtype='http://schema.org/CollegeOrUniversity']")

    for c in containers:
        name_tag = c.select_one("[itemprop='name'] a")
        city_tag = c.select_one("[itemprop='addressLocality']")
        state_tag = c.select_one("[itemprop='addressRegion']")
        type_tag = c.select_one("[itemprop='']")
        conference_tag = c.select_one("[itemprop='member']")
        division_tag = c.select("div")[5] if len(c.select("div")) > 5 else None

        university = name_tag.text.strip() if name_tag else "N/A"
        city = city_tag.text.strip() if city_tag else "N/A"
        state = state_tag.text.strip() if state_tag else "N/A"
        school_type = type_tag.text.strip() if type_tag else "N/A"
        conference = conference_tag.text.strip() if conference_tag else "N/A"
        division = division_tag.text.strip() if division_tag else "N/A"

        print(university, city, state, school_type, conference, division)

        dynamodb.put_item(
            TableName="dev-fia7-university",
            Item={
                'Name': {
                    'S': university,
                },
                'State': {
                    'S': f'{state}',
                },
                'City': {
                    'S': city,
                }
                'Conference': {
                    'S': conference,
                },
                'Division': {
                    'S': division
                }
            }
        )
else:
    print(f"Failed to fetch page: {response.status_code}")