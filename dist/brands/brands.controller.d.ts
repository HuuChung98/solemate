import { BrandsService } from './brands.service';
export declare class BrandsController {
    private readonly brandsService;
    constructor(brandsService: BrandsService);
    getAllBrands(token: string): Promise<"Error authentication" | {
        id: bigint;
        name: string;
        slug: string;
        created_at: Date;
    }[]>;
}
