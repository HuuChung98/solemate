import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(token: string): Promise<"Error authentication" | {
        id: bigint;
        name: string;
        parent_id: bigint;
        slug: string;
        created_at: Date;
    }[]>;
}
