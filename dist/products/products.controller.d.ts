import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(token: string): Promise<"Error authentication" | {
        id: bigint;
        title: string;
        brand_id: bigint;
        category_id: bigint;
        description: string;
        created_at: Date;
    }[]>;
    getProductById(token: string, id: string): Promise<"Error authentication" | {
        id: bigint;
        product_id: bigint;
        sku: string;
        attributes: import(".prisma/client").Prisma.JsonValue;
        price: import("@prisma/client/runtime/library").Decimal;
        created_at: Date;
    }[]>;
}
