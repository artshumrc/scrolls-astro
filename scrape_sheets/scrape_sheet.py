import requests
import json
import sys
import os

def download_json(sheet_id, tab_name):
    url = f"https://opensheet.elk.sh/{sheet_id}/{tab_name}"
    response = requests.get(url)
    response.raise_for_status()  # Will raise an error for unsuccessful requests
    return response.json()

def read_local_json(file_path):
    if not os.path.exists(file_path):
        return None
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def write_json(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

def main():
    sheet_id = "1Cl-tRTAmrRWTYFf27ADXdyduvAgShOiTJY3sDj2c_uA"
    tab_name = "scrolls_master_list"
    local_file_path = "src/data/scrolls_master_list.json"

    downloaded_data = download_json(sheet_id, tab_name)
    local_data = read_local_json(local_file_path)

    if downloaded_data != local_data:
        write_json(downloaded_data, local_file_path)
        print("Changes detected and written.")
        sys.exit(0)  # Changes detected and written
    else:
        print("No changes detected.")
        sys.exit(1)  # No changes

if __name__ == "__main__":
    main()
