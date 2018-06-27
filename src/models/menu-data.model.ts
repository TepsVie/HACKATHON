import { MealData } from './meal-data.model';

export class MenuData {
    id: number;
    meal_id: number;
    date: string;
    meal: MealData[];
}