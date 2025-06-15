import boysDataRaw from "./b_updated_data.json";
import girlsDataRaw from "./g_updated_data.json";
import type { College, Category, InstitutionType, IconType } from "../types/types";

export function mapToCollege(data: any[]): College[] {
  return data.map(item => ({
    college: item.college,
    category: item.category as Category,
    institution_type: item.institution_type as InstitutionType,
    score: item.score,
    icon: item.icon as IconType,
  }));
}

export const boysData: College[] = mapToCollege(boysDataRaw);
export const girlsData: College[] = mapToCollege(girlsDataRaw);
