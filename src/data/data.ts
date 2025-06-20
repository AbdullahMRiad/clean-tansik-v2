import boysDataRaw from "./categorized_colleges_boys_with_icons.json";
import girlsDataRaw from "./categorized_colleges_girls_with_icons.json";
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
