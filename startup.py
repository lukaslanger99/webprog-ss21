import os
import json

# read files from dir
songs = os.listdir('./music')

# create jsonData object
jsonData = {}
jsonData['songs'] = []
counter = 0

# write fileurls into json
for song in songs:
    isNoGitFile = song != '.gitignore' and song != '.gitkeep'
    fileExtensionAllowed = song.endswith('.mp3') or song.endswith('.ogg') or song.endswith('.wav')
    if isNoGitFile and fileExtensionAllowed:
        jsonData['songs'].append({
            'id': counter,
            'name': song,
            'url': song
        })
        counter += 1

# save json file
with open('./json/songurls.json', 'w') as outfile:
    json.dump(jsonData, outfile)

# server starten
import http.server
import socketserver

PORT = 8000

handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), handler) as httpd:
    print("Server started at localhost:" + str(PORT))
    httpd.serve_forever()