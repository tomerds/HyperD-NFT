import os
import json
from dotenv import load_dotenv
from PIL import Image
import requests

load_dotenv()

api_key = os.getenv('API_KEY')
api_secret = os.getenv('API_SECRET')


def metadata_json(metadata):
    not_uploaded = metadata
    succeeded = []
    # Loop through until all images are pinned
    while len(not_uploaded) > 0:
        d = not_uploaded[0]
        print('uploading image', d["conductor"])

        cid = upload_image(d["image"])

        if cid != None:
            m = {
                "name": d["name"],
                "image": f'ipfs://{cid}',
                "description": d["description"],
                "attributes": [
                    {"trait_type": "background", "value": d["background"]},
                    {"trait_type": "group", "value": d["group"]},
                    {"trait_type": "index", "value": d["index"]},
                    {"trait_type": "C[1]", "value": d["C[1]"]},
                    {"trait_type": "C[2]", "value": d["C[2]"]},
                    {"trait_type": "C[3]", "value": d["C[3]"]},
                    {"trait_type": "C[4]", "value": d["C[4]"]},
                    {"trait_type": "conductor", "value": d["conductor"]},
                ]
            }

            succeeded.append(m)
            del not_uploaded[0]

    for i, data in enumerate(succeeded):

        with open(f'../metadata/{i}', 'w') as fout:
            json.dump(data, fout)


def pin_json_data(metadata):
    not_uploaded = metadata
    succeeded = []
    while len(not_uploaded) > 0:
        d = not_uploaded[0]
        print('uploading image', d["conductor"])


def upload_image(image):
    pinata_url = 'https://api.pinata.cloud'

    pinFileToIpfs = f'{pinata_url}/pinning/pinFileToIPFS'

    image = open(image, 'rb')

    try:
        response = requests.post(pinFileToIpfs, files={"file": image}, headers={
            'pinata_api_key': os.getenv('API_KEY'), 'pinata_secret_api_key': os.getenv('API_SECRET')})

        response.raise_for_status()
        return response.json()["IpfsHash"]
    except:
        return None


if __name__ == "__main__":
    with open('../metadata.json') as json_file:
        data = json.load(json_file)

    output = metadata_json(data)
