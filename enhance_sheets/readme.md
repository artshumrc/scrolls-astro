# Readme
This directory contains Python code used to enhance the Google Sheets data by adding a few columns present in the Markdown (especially `slug`) but not in the Google Sheets. The workflow is:
- export CSV from sheets
- join Markdown data
- export new CSV
- copy relevant columns back to Google Sheets

This should be a one time operation. The code is kept here for reference.

## Running it
### Create a virtual environment and install the requirements
`python3 -m venv venv`
`source venv/bin/activate`
`pip install -r requirements.txt`
### Run the script
`python enhance_sheets.py`
