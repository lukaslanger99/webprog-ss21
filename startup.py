import os
import json

# read files from dir
songs = os.listdir('./files')

# create jsonData object
jsonData = {}
jsonData['songs'] = []

# write fileurls into json
for song in songs:
    if song != '.gitignore' and song != '.gitkeep':
        jsonData['songs'].append({
            'songurl': song
        })

# save json file
with open('./json/songurls.json', 'w') as outfile:
    json.dump(jsonData, outfile)