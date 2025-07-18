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

URL = "https://247sports.com/Season/2026-Football/RecruitRankings/?institutiongroup=highschool/"
response = get(URL, headers=headers)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')

    players = soup.select(".rankings-page__list-item .rankings-page__name-link")
    nationalities = soup.select(".rankings-page__list-item .meta")
    positions = soup.select(".rankings-page__list-item .position")
    metrics = soup.select(".rankings-page__list-item .metrics")
    statuses = soup.select(".rankings-page__list-item .status .img-link")

    for p, n, po, m, s in zip(players, nationalities, positions, metrics, statuses):
        university_img = s.find("img")
        university_name = university_img["alt"] if university_img and "alt" in university_img.attrs else "N/A"

        print(
            f"Player: {p.text.strip()} | "
            f"Location: {n.text.strip()} | "
            f"Position: {po.text.strip()} | "
            f"Metrics: {m.text.strip()} | "
            f"University: {university_name}"
        )

        dynamodb.put_item(
            TableName="dev-fia7-player",
            Item={
                'Name': {
                    'S': p.text.strip(),
                },
                'Nationality': {
                    'S': n.text.strip(),
                },
                'Position': {
                    'S': po.text.strip()
                }
            }
        )
else:
    print(f"Failed to fetch page: {response.status_code}")