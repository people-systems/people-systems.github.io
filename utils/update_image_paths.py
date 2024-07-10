import json
import os

assets = '../assets/img'
image_paths_json = './image_paths.json'

image_paths = ["./assets/img/"+file for file in os.listdir(assets) if file.endswith(".png")]
with open(image_paths_json, "w") as f:
    json.dump(image_paths, f, indent=4)


