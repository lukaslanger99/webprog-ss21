import os
import json

songs = os.listdir('./files')

jsonData = {}
jsonData['songs'] = []

for song in songs:
    if song != '.gitignore' and song != '.gitkeep':
        jsonData['songs'].append({
            'songurl': song
        })

with open('./json/songurls.json', 'w') as outfile:
    json.dump(jsonData, outfile)
