// Types and interfaces for the app
export type Category =
    | "طب"
    | "طب أسنان"
    | "علاج طبيعي"
    | "صيدلة"
    | "هندسة"
    | "حاسبات ومعلومات"
    | "اقتصاد وعلوم سياسية"
    | "إعلام"
    | "ألسن"
    | "علوم"
    | "تمريض"
    | "حقوق"
    | "تجارة"
    | "آداب"
    | "تخطيط عمراني"
    | "فنون جميلة"
    | "فنون تطبيقية"
    | "الاعاقة والتأهيل"
    | "تربية"
    | "أخرى";

export type InstitutionType =
    | "كلية"
    | "معهد"
    | "انتساب موجه";

export type IconType =
    | "medical_services"
    | "dentistry"
    | "fitness_center"
    | "pill"
    | "engineering"
    | "computer"
    | "category"
    | "science"
    | "account_balance"
    | "campaign"
    | "language"
    | "local_hospital"
    | "gavel"
    | "storefront"
    | "location_city"
    | "palette"
    | "brush"
    | "accessible"
    | "school"
    | "book";

export interface College {
  college: string,
  category: Category,
  institution_type: InstitutionType,
  score: number,
  icon: IconType
}
