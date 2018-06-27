import { MealData } from './meal-data.model';

export class MealGlobal {
    current_page: number;
    data: MealData[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url?: any;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
}


