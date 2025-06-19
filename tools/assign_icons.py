import json

# Define icons for each category using Material Symbols
icons = {
    "طب": "medical_services",
    "طب أسنان": "dentistry",
    "صيدلة": "pill",
    "علاج طبيعي": "fitness_center",
    "طب بيطري": "pets",
    "هندسة": "engineering",
    "حاسبات ومعلومات": "computer",
    "اقتصاد وعلوم سياسية": "account_balance",
    "إعلام": "campaign",
    "ألسن": "language",
    "علوم": "science",
    "تمريض": "local_hospital",
    "حقوق": "gavel",
    "تجارة": "storefront",
    "آداب": "book",
    "تخطيط عمراني": "location_city",
    "الملاحة وتكنولوجيا الفضاء": "rocket_launch",
    "العلوم الصحية التطبيقية": "health_and_safety",
    "تكنولوجيا الصناعة والطاقة": "factory",
    "تكنولوجيا الإدارة ونظم المعلومات": "manage_accounts",
    "التكنولوجيا والتعليم الصناعي": "build",
    "إدارة أعمال": "business_center",
    "فنون جميلة": "palette",
    "فنون تطبيقية": "brush",
    "دار العلوم": "school",
    "الاعاقة والتأهيل": "accessible",
    "تربية": "school",
    "أخرى": "category"
}

def assign_icons_to_data(input_filename, output_filename):
    with open(input_filename, "r", encoding="utf-8") as f:
        categorized_data = json.load(f)

    for entry in categorized_data:
        category = entry["category"]
        entry["icon"] = icons.get(category, "help_outline")

    with open(output_filename, "w", encoding="utf-8") as f:
        json.dump(categorized_data, f, ensure_ascii=False, indent=4)

    print(f"Icons assigned and saved to {output_filename}")

# Process boys\" data
assign_icons_to_data("categorized_colleges_boys.json", "categorized_colleges_boys_with_icons.json")

# Process girls\" data
assign_icons_to_data("categorized_colleges_girls.json", "categorized_colleges_girls_with_icons.json")


