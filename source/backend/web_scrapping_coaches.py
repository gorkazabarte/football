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

URL = "https://247sports.com/season/2026-football/compositecoachrankings/"
response = get(URL, headers=headers)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    print(soup.prettify())
    coaches = soup.select(".rankings-page__list-item .rankings-page__name-link")
    types = soup.select(".rankings-page__list-item .meta")
    commits = soup.select(".rankings-page__list-item .coach-total")
    univesity = soup.select(".rankings-page__list-item .coach-team")

    for c, t, co, u in zip(coaches, types, commits, univesity):
        university_img = u.find("img")
        university_name = university_img["alt"] if university_img and "alt" in university_img.attrs else "N/A"

        print(
            f"Coach: {c.text.strip()} | "
            f"Type: {t.text.strip()} | "
            f"Commits: {co.text.strip()} | "
            f"University: {university_name}"
        )

        dynamodb.put_item(
            TableName="dev-fia7-coach",
            Item={
                'Name': {
                    'S': c.text.strip(),
                },
                'Type': {
                    'S': t.text.strip(),
                },
                'Commits': {
                    'S': co.text.strip()
                },
                'University': {
                    'S': university_name
                }
            }
        )
else:
    print(f"Failed to fetch page: {response.status_code}")