import requests
from sys import stderr

headers = {
    "Authority" : "scholar.googleusercontent.com",
    "Path": "/citations?view_op=export_citations&user=oxZiyMgAAAAJ&s=oxZiyMgAAAAJ:8k81kl-MbHgC&citsig=AEDxBGwAAAAAZMkd4_-eTxQwagWIa1PN9pAK4hk&hl=pt-BR&cit_fmt=0",
    "Scheme": "https",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "pt,pt-BR;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Referer": "https://scholar.google.com/",
    "Sec-Ch-Ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
    "Sec-Ch-Ua-Mobile": "?1",
    "Sec-Ch-Ua-Platform": '"Android"',
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": 1,
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
    "X-Client-Data": "CKm1yQEIlbbJAQimtskBCKmdygEI/uLKAQiSocsBCIWTzQEIh6DNAQjatM0BCMO1zQEI3L3NAQi8vs0BCN/EzQEI78TNAQi0xc0BCMPFzQEI3cXNAQj0xc0BCJbIzQEYwcvMAQ==",
    "Decoded": """message ClientVariations {
// Active client experiment variation IDs.
  repeated int32 variation_id = [3300009, 3300117, 3300134, 3313321, 3322238, 3330194, 3361157, 3362823, 3365466, 3365571, 3366620, 3366716, 3367519, 3367535, 3367604, 3367619, 3367645, 3367668, 3367958];
  // Active client experiment variation IDs that trigger server-side behavior.
  repeated int32 trigger_variation_id = [3352001];
}"""
}

response = requests.get('https://scholar.googleusercontent.com/citations?view_op=export_citations&user=oxZiyMgAAAAJ&s=oxZiyMgAAAAJ:8k81kl-MbHgC&citsig=AEDxBGwAAAAAZMkd4_-eTxQwagWIa1PN9pAK4hk&hl=pt-BR&cit_fmt=0')
print(response)
if response.status_code != 200:
    print(f'ERRO: Código de status {response.status_code}', file=stderr)
    quit(1)

print(response.text)
