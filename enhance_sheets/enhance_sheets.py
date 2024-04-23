import csv
import glob
import os
import frontmatter

def read_markdown_files(directory):
    print(f"Reading Markdown files from {directory}")
    print("Current working directory:", os.getcwd())

    if not os.path.exists(directory):
        print(f"Directory does not exist: {directory}")
        return {}
    
    scrolls_data = {}
    md_files_path = f"{directory}/*.md"
    md_files = glob.glob(md_files_path)

    if not md_files:
        print("No Markdown files found.")
        return {}
    else:
        print(f"Found {len(md_files)} Markdown files.")

    for md_file in md_files:
        with open(md_file, 'r', encoding='utf-8') as file:
            content = frontmatter.load(file)
            scrolls_id = content.metadata.get('_scrolls_id')
            if scrolls_id:
                scrolls_data[scrolls_id] = content.metadata
    return scrolls_data

def update_csv_with_md_data(csv_path, md_data, output_csv):
    with open(csv_path, mode='r', encoding='utf-8') as infile, \
         open(output_csv, mode='w', newline='', encoding='utf-8') as outfile:
        
        reader = csv.DictReader(infile)
        fieldnames = reader.fieldnames + ['wp_type', 'wp_id', 'meta_title', 'wp_slug']
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        
        writer.writeheader()
        for row in reader:
            md = md_data.get(row['id'])
            if md:
                row['wp_type'] = md.get('wp_type', '')
                row['wp_id'] = md.get('wp_id', '')
                row['meta_title'] = md.get('meta_title', '')
                row['wp_slug'] = md.get('wp_slug', '')
            writer.writerow(row)

# Path to your Markdown files and CSV
markdown_path = '../src/content/scrolls'
csv_path = 'sheets_snapshot.csv'
output_csv_path = 'updated_scrolls_sheet.csv'

# Processing
markdown_data = read_markdown_files(markdown_path)
update_csv_with_md_data(csv_path, markdown_data, output_csv_path)

print("CSV file has been updated.")
