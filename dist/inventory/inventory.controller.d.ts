import { InventoryService } from './inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getInventory(token: string): Promise<"Error authentication" | {
        variant_id: bigint;
        stock_on_hand: number;
        reserved: number;
        threshold: number;
        updated_at: Date;
    }[]>;
}
