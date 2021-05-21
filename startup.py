import os
import json

# read files from dir
songs = os.listdir('./files')

# create jsonData object
jsonData = {}
jsonData['songs'] = []

# write fileurls into json
for song in songs:
    isNoGitFile = song != '.gitignore' and song != '.gitkeep'
    fileExtensionAllowed = song.endswith('.mp3') or song.endswith('.ogg') or song.endswith('.wav')
    if isNoGitFile and fileExtensionAllowed:
        jsonData['songs'].append({
            'songurl': song
        })

# save json file
with open('./json/songurls.json', 'w') as outfile:
    json.dump(jsonData, outfile)