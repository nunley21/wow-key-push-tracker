import requests
import json
import os
import time
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

import datetime
def get_key(team, level):
    s = requests.Session()
    retries = Retry(total=10,
                    status_forcelist=[443, 429, 500, 502, 503, 504])
    s.mount('http://', HTTPAdapter(max_retries=retries))

    url = f'https://raider.io/api/teams/mythic-plus/dungeon-runs?season=season-tww-1&team={team}&region=us&dungeon={level}'
    r = s.get(url, timeout=120)
    text = r.json()

    try:
        return text["viewTeamMythicPlusDungeonRunsApi"]["runs"]
    except:
        return json.loads('{"viewTeamMythicPlusDungeonRunsApi":{"runs":[],"ui":{"season":"season-tww-1","team":"'+team+'","region":"us","dungeon":"'+level+'","namespace":"default"}}}')["viewTeamMythicPlusDungeonRunsApi"]["runs"]

        # return json.loads('{"viewTeamMythicPlusDungeonRunsApi":{"runs":[{"summary":{"season":"season-df-3","status":"finished","dungeon":{"id":7673,"name":"Darkheart Thicket","short_name":"DHT","slug":"darkheart-thicket","expansion_id":6,"icon_url":"/images/wow/icons/large/achievement_dungeon_darkheartthicket.jpg","patch":"7.0","keystone_timer_ms":1800999,"num_bosses":4,"group_finder_activity_ids":[426,436,446,460]},"keystone_run_id":2440367,"mythic_level":17,"clear_time_ms":1553612,"keystone_time_ms":1800999,"completed_at":"2023-11-20T03:51:33.000Z","num_chests":1,"time_remaining_ms":247387,"logged_run_id":966105,"videos":[],"weekly_modifiers":[{"id":10,"icon":"ability_toughness","name":"Fortified","description":"Non-boss enemies have 20% more health and inflict up to 30% increased damage."},{"id":136,"icon":"achievement_boss_anomalus","name":"Incorporeal","description":"While in combat, incorporeal beings periodically appear and attempt to weaken players."},{"id":8,"icon":"spell_shadow_bloodboil","name":"Sanguine","description":"When slain, non-boss enemies leave behind a lingering pool of ichor that heals their allies and damages players."}],"num_modifiers_active":3,"faction":"alliance","deleted_at":null,"role":"tank"},"score":150.71701233593134}],"ui":{"season":"season-df-3","team":"manastorm-apologists","region":"us","dungeon":"darkheart-thicket","namespace":"default"}}}')["viewTeamMythicPlusDungeonRunsApi"]["runs"]

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
    st = os.stat('score.json')
    mtime = st.st_mtime
    c_time = time.time()
    dtime = c_time - mtime
    with open('score.json') as f:
        json_file = json.load(f)



    if dtime > 1  or len(json_file) != 6:



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
                top_keys = {}
                if data:
                    for key in data:
                        if key["summary"]["time_remaining_ms"] > 0:
                            keys_store.append([key['summary']['mythic_level'], key['summary']['num_chests']])




                    try:
                        max_key = max(keys_store)

                    except:
                        max_key = 0
                        top_keys = {"key_level": 0, "percent": 0,
                                                  "plus": ""}


                    try:
                        for key in data:
                            if max_key[0] == key['summary']['mythic_level'] and max_key[1] == key['summary']['num_chests']:
                                if key['summary']['mythic_level'] != 0:
                                    key_time = round((key['summary']["clear_time_ms"] / key['summary']["keystone_time_ms"]) * 100)
                                    plus = get_chest_plus(key['summary']['num_chests'])
                                    top_keys = {"key_level": key['summary']['mythic_level'], "percent": key_time, "plus": plus}

                                else:
                                    print("asd")
                            top[key['summary']['dungeon']['name']] = top_keys

                    except Exception as e:
                        print(e)
                else:
                    top_keys = {"key_level": 0, "percent": 0, "plus": ""}
                    top[dungeon] = top_keys



            team_store[team] = top

            json.dump(team_store, open('score.json', 'w'), sort_keys=True, indent=4, separators=(',', ': '))



        return team_store
    else:
        return json_file




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
