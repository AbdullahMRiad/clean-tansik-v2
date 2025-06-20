import json
import os

with open("b_regex_match_data.json", "r", encoding="utf-8") as f:
    boysData = json.load(f)

with open("g_regex_match_data.json", "r", encoding="utf-8") as f:
    girlsData = json.load(f)

# Process the boys data to create a clean list of dictionaries
output = []
for entry in boysData:
    college = next(item['content'] for item in entry if item['groupNum'] == 1)
    score = float(next(item['content'] for item in entry if item['groupNum'] == 2))
    output.append({"college": college, "score": score})

# Write the output to a JSON file
with open("b_clean_data.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

# Process the girls data to create a clean list of dictionaries
output = []
for entry in girlsData:
    college = next(item['content'] for item in entry if item['groupNum'] == 1)
    score = float(next(item['content'] for item in entry if item['groupNum'] == 2))
    output.append({"college": college, "score": score})

# Write the output to a JSON file
with open("g_clean_data.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)