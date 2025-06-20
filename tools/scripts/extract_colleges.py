import json
import re
import os

def extract_colleges_from_text(input_path, output_path):
    with open(input_path, 'r', encoding='utf-8') as f:
        text = f.read()
    pattern = re.compile(r'([^\n]+?)\s+(\d+\.\d{6})')
    matches = pattern.findall(text)
    output = [
        {"college": name.strip(), "score": float(score)}
        for name, score in matches
    ]
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

# Extract for boys and girls
extract_colleges_from_text(os.path.join('data', 'raw_boys_data.txt'), os.path.join('output', 'b_clean_data.json'))
extract_colleges_from_text(os.path.join('data', 'raw_girls_data.txt'), os.path.join('output', 'g_clean_data.json'))
