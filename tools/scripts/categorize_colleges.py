import json
import os

# Define the data based on the last provided girls' data for testing the script logic
# This script will be run twice, once for boys' data and once for girls' data.

# --- Data for Boys (assuming this is the original data) ---
with open(os.path.join('output', 'b_clean_data.json'), "r", encoding="utf-8") as f:
    data_boys = json.load(f)

# --- Data for Girls (assuming this is the new data) ---
with open(os.path.join('output', 'g_clean_data.json'), "r", encoding="utf-8") as f:
    data_girls = json.load(f)

categories = {
    "طب": ["طب ", "طب عام"],
    "طب أسنان": ["طب أسنان"],
    "صيدلة": ["صيدلة"],
    "علاج طبيعي": ["علاج طبيعي"],
    "طب بيطري": ["طب بيطري"],
    "هندسة": ["هندسة", "هندسه", "تكنولوجيا", "المعهد التكنولوجي", "المعهد العالى للهندسة", "المعهد العالي للهندسه", "الأكاديمية الدولية لعلوم الإعلام (شعبة هندسة )", "الاكاديمية المصرية للهندسة والتكنولوجيا المتقدمة", "أكاديمية أخبار اليوم شعبة هندسية", "المعهد المنصورة العالى للهندسة والتكنولوجيا", "العالي للهندسة والتكنولوجيا", "معهد هندسة وتكنولوجيا الطيران", "معهد العبور العالي للهندسه والتكنولوجيا", "معهد المستقبل العالى للهندسة والتكنولوجيا", "المعهد العالى للهندسه والتكنولوجيا بالمنزلة", "المعهد العالي للهندسة والتكنولوجيا بدمياط الجديدة", "المصرية الصينية للتكنولوجيا", "المعهد العالى للهندسة والتكنولوجيا بطنطا", "معهد عالي هندسه مدينه الشروق", "معهد أكتوبر العالي للهندسه والتكنولوجيا", "مصر العالي هندسة وتكنولوجيا", "معهد طيبة العالي للهندسه", "معهد عالي هندسة وتكنولوجيا العريش", "المعهد العالى للهندسة والتكنولوجيا ببرج العرب", "المعهد العالى للهندسة والتكنولوجيا بالزقازيق", "معهد الدلتا العالي للهندسة والتكنولوجيا", "المعهد العالى للهندسة والتكنولوجيا بالمحلة الكبرى", "المعهد العالي للهندسة والتكنولوجيا بالبحيرة", "المعهد العالي للهندسة بمدينة 15 مايو", "معهد المدينة العالي للهندسة والتكنولوجيا", "القاهرة العالي ش هندسية", "معهد النيل العالي للهندسة والتكنولوجيا", "معهد عالي هندسة وتكنولوجيا كفر الشيخ", "معهد الوادي العالي للهندسة والتكنولوجيا", "المجمع التكنولوجي المتكامل بالسلام", "ع. هندسة وتكنولوجيا العبور", "المعهد العالي للهندسة ببلبيس", "المعهد العالي للهندسة والتكنولوجيا بالطود الأقصر", "معهد الصفوة العالي هندسة وتكنولوجيا"],
    "حاسبات ومعلومات": ["حاسبات ومعلومات", "حاسبات و علوم البيانات", "حاسبات و ذكاء إصطناعي", "ذكاء إصطناعي", "الذكاء الاصطناعى", "المعهد الكندي العالي للحاسب الآلي", "أكاديمية أخبار اليوم 6اكتوبر شعبة علوم حاسب", "عالي إدارة وتكنولوجيا ش علوم حاسب", "معهد عالي تكنولوجيا 10 رمضان شعبة علوم الحاسب", "المدينةالعالي للإدارة والتكنولوجيا شبرامنت ش نظم معلومات إدارية", "ذكاء اصطناعي"],
    "اقتصاد وعلوم سياسية": ["اقتصاد وعلوم سياسية", "الدراسات الاقتصادية والعلوم السياسية", "سياسة واقتصاد"],
    "إعلام": ["إعلام", "معهد الإسكندرية العالي للإعلام", "إعلام وتكنولوجيا اتصال"],
    "ألسن": ["ألسن"],
    "علوم": ["علوم", "علوم البترول والتعدين", "علوم صحية", "علوم التغذية"],
    "تمريض": ["تمريض"],
    "حقوق": ["حقوق"],
    "تجارة": ["تجارة"],
    "آداب": ["آداب"],
    "تخطيط عمراني": ["تخطيط عمراني"],
    "الملاحة وتكنولوجيا الفضاء": ["الملاحة وتكنولوجيا الفضاء"],
    "العلوم الصحية التطبيقية": ["العلوم الصحية التطبيقية", "كلية تكنولوجيا العلوم الصحية"],
    "تكنولوجيا الصناعة والطاقة": ["كلية تكنولوجيا الصناعة و الطاقة", "كلية تكنولوجيا الصناعة والطاقة"],
    "تكنولوجيا الإدارة ونظم المعلومات": ["تكنولوجيا الإدارة ونظم المعلومات"],
    "التكنولوجيا والتعليم الصناعي": ["التكنولوجيا والتعليم الصناعي"],
    "إدارة أعمال": ["إدارة أعمال"],
    "فنون جميلة": ["فنون جميلة"],
    "فنون تطبيقية": ["فنون تطبيقية"],
    "دار العلوم": ["دار العلوم"],
    "الاعاقة والتأهيل": ["الاعاقة والتأهيل"],
    "تربية": ["تربية"]
}

institution_types = {
    "كلية": ["كلية", "جامعة"],
    "معهد": ["معهد", "المعهد", "أكاديمية"],
    "انتساب موجه": ["انتساب موجه"]
}

def categorize_college(college_name):
    # Prioritize specific categories like 'طب أسنان' and 'طب بيطري' first
    if "طب أسنان" in college_name:
        return "طب أسنان"
    if "طب بيطري" in college_name:
        return "طب بيطري"
    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword in college_name:
                return category
    return "أخرى"

def get_institution_type(college_name):
    for inst_type, keywords in institution_types.items():
        for keyword in keywords:
            if keyword in college_name:
                return inst_type
    return "كلية" # Default to 'كلية' if no specific keyword is found

def process_data(input_data, output_filename):
    output = []
    for item in input_data:
        college_name = item["college"]
        category = categorize_college(college_name)
        inst_type = get_institution_type(college_name)
        output.append({"college": college_name, "category": category, "institution_type": inst_type, "score": item["score"]})

    with open(output_filename, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=4)

    print(f"Categorization complete. Output saved to {output_filename}")

# Process boys' data
process_data(data_boys, os.path.join('output', 'categorized_colleges_boys.json'))

# Process girls' data
process_data(data_girls, os.path.join('output', 'categorized_colleges_girls.json'))