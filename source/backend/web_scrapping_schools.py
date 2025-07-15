import boto3
from bs4 import BeautifulSoup
from boto3 import client
from collections import defaultdict
from requests import get

dynamodb = boto3.client('dynamodb')

headers = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/114.0.0.0 Safari/537.36"
    )
}

URL = "https://playfootball.nfl.com/discover/news-and-features/preseason-high-school-football-america-1000-high-school-football-rankings/"
response = get(URL, headers=headers)

if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    print(soup.prettify())
    state_teams = defaultdict()

    # Loop through each accordion (each state section)
    accordions = soup.select(".accordion .card")

    for card in accordions:
        # Extract the state name from the header
        header = card.select_one(".card-header strong")
        if not header:
            continue

        state_name_raw = header.get_text(strip=True)
        state_name = state_name_raw.split(" (")[0]

        team_list_items = card.select(".card-body ul li")
        teams = [li.get_text(strip=True) for li in team_list_items]

        state_teams[state_name] = teams

    print("Teams by State:")
    print(state_teams)

    for state, teams in state_teams.items():
        for team in teams:
            print(f"State: {state}, Team: {team}")

            dynamodb.put_item(
                TableName="dev-fia7-school",
                Item={
                    'State': {
                        'S': state,
                    },
                    'Name': {
                        'S': team,
                    }
                }
            )
else:
    print(f"Failed to fetch page: {response.status_code}")