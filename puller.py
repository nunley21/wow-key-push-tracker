import requests
import json
import datetime
def get_key(team, level):
    r = requests.get(f'https://raider.io/api/teams/mythic-plus/dungeon-runs?season=season-df-3&team={team}&region=us&dungeon={level}', timeout=30)
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
            keys_store_fort = []
            keys_store_tryan = []
            for key in data:
                if key['summary']['status'] == "finished":
                    if key['summary']["weekly_modifiers"][0]["name"] == "Tyrannical":
                        keys_store_tryan.append(key['summary']['mythic_level'])
                    elif key['summary']["weekly_modifiers"][0]["name"] == "Fortified":
                        keys_store_fort.append(key['summary']['mythic_level'])
            try:
                max_key_fort = max(keys_store_fort)
            except:
                max_key_fort = 0
            try:
                max_key_tryan = max(keys_store_tryan)
            except:
                max_key_tryan = 0
            try:
                top_keys = {"Fortified": {}, "Tyrannical": {}}
                for key in data:
                    if max_key_fort == key['summary']['mythic_level'] and key['summary']["weekly_modifiers"][0]["name"] == "Fortified":
                        key_time = round((key['summary']["clear_time_ms"] / key['summary']["keystone_time_ms"]) * 100)
                        plus = get_chest_plus(key['summary']['num_chests'])
                        top_keys["Fortified"] = {"key_level": key['summary']['mythic_level'], "percent": key_time, "plus": plus}
                    if max_key_tryan == key['summary']['mythic_level'] and key['summary']["weekly_modifiers"][0]["name"] == "Tyrannical":
                        key_time = round((key['summary']["clear_time_ms"] / key['summary']["keystone_time_ms"]) * 100)
                        plus = get_chest_plus(key['summary']['num_chests'])
                        top_keys["Tyrannical"] = {"key_level": key['summary']['mythic_level'], "percent": key_time, "plus": plus}
                    top[key['summary']['dungeon']['name']] = top_keys
            except Exception as e:
                print(e)


        team_store[team] = top



    return team_store



if __name__ == '__main__':
    data = main()
    json.dump(data, open('score.json', 'w'), sort_keys=True, indent=4, separators=(',', ': '))

#     max_key = max(keys_store)
#     for key in data:
#         if max_key == key['summary']['mythic_level'] and key['summary']["weekly_modifiers"][0][
#             "name"] == ability_toughness:
#             key_time = round((key['summary']["clear_time_ms"] / key['summary']["keystone_time_ms"]) * 100)
#             plus = get_chest_plus(key['summary']['num_chests'])
#             top[key_name][ability_toughness] = {
#                 ability_toughness: {"key_level": key['summary']['mythic_level'], "percent": key_time, "plus": plus,
#                                     "ability": ability_toughness}}
#             print(top)
# except Exception as e:
# print(e)
# pass
