# مجلد الأدوات

يحتوي هذا المجلد على الأدوات التي استخدمتها لتنقيح البيانات لتناسب الموقع.

### كيفية الاستخدام

1. انسخ بيانات التنسيق (البيانات المستخدمة [من هنا](https://www.masrawy.com/news/education-tansee2/details/2024/9/26/2648773) للبنين [ومن هنا](https://www.masrawy.com/news/education-tansee2/details/2024/9/26/2648786) للبنات) إلى `raw_boys_data.txt` و`raw_girls_data.txt`

> [!IMPORTANT]  
> يجب أن تكون البيانات كالصيغة الآتية\
> `{اسم الكلية} {الدرجة}`\
> مع أخذ المسافة بينهما في الاعتبار وأن تحتوي الدرجة على ٦ منازل بعد الفاصلة العشرية (مثل 410.000000). إذا أردت استخدام صيغة أخرى فيجب عليك أيضًا تعديل تعبير RegEx في ملف `extract_colleges.py`

2. قم بتشغيل `main.py` بكتابة `python main.py`

3. ستجد الملفات النهائية في `output/categorized_colleges_boys_with_icons.json` و `output/categorized_colleges_girls_with_icons.json`

### وظائف البرامج النصية (scripts)

#### main.py

البرنامج النصي الرئيسي لبدء عملية التنقيح.

#### scripts/extract_colleges.py

يستخرج البيانات الأولية من الملفات النصية الخام.

#### scripts/categorize_colleges.py

يقوم بتصنيف الكليات حسب النوع (بنين/بنات) وحسب التخصص.

#### scripts/assign_icons.py

يضيف أيقونات للكليات حسب تصنيفها.

### data/

يحتوي على البيانات الأولية المطلوب تنقيحها.

### output/

مجلد لحفظ النتائج النهائية بعد المعالجة.