import yaml
import random


def read_teams():
    with open("teams.yaml", "r") as stream:
        try:
            return (yaml.safe_load(stream))
        except yaml.YAMLError as exc:
            print(exc)


def gen_teams():
    teams = read_teams()
    for spec in teams:
        team_list = teams[spec]
        random.shuffle(team_list)
        teams[spec] = team_list

    return teams



if __name__ == '__main__':
    print(gen_teams())

