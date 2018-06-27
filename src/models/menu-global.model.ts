import { MenuData } from './menu-data.model';

export class MenuGlobal {
    current_page: number;
    data: MenuData[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
}
