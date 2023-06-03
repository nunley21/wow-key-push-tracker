import requests
import json
import datetime
def get_key(team, level):
    r = requests.get(f'https://raider.io/api/teams/mythic-plus/dungeon-runs?season=season-df-2&team={team}&region=us&dungeon={level}', timeout=30)
    text = r.json()
    return text["viewTeamMythicPlusDungeonRunsApi"]["runs"]


def get_chest_plus(plus_count):
    if plus_count == 0:
        return ""
    if plus_count == 1:
        return "+"
    if plus_count == 2:
        return "++"
    if plus_count == 3:
        return "+++"


def main():
    with open("teams.txt", "r") as file:
        teams = file.readlines()
    with open("dungeon.txt", "r") as file:
        dungeons = file.readlines()
    team_store = {}
    for team in teams:
        print(team.strip("\n"))
        top = {}

        for dungeon in dungeons:
            team = team.strip("\n")
            dungeon = dungeon.strip("\n")
            data = get_key(team, dungeon)
            keys_store = []
            for key in data:

                keys_store.append(key['summary']['mythic_level'])
                # print(f"{team}: {dungeon}: key: {key['summary']['mythic_level']}")
            try:
                max_key = max(keys_store)
                for key in data:
                    if max_key == key['summary']['mythic_level']:
                        key_time = round((key['summary']["clear_time_ms"] / key['summary']["keystone_time_ms"]) * 100)
                        plus = get_chest_plus(key['summary']['num_chests'])
                        top[key['summary']['dungeon']['name']] = {"key_level":key['summary']['mythic_level'], "percent": key_time, "plus": plus}
            except:
                pass
            keys_store = []

        team_store[team] = top
    return team_store



if __name__ == '__main__':
    data = main()
    json.dump(data, open('score.json', 'w'), sort_keys=True, indent=4, separators=(',', ': '))




