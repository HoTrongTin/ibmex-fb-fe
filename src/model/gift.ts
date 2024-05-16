export interface IRedemGift {
    message?: string;
    redeemedGift?: RedeemedGift;
}

interface RedeemedGift {
    id?: number;
    name?: string;
    image?: string;
    minScore?: number;
    maxCapacity?: number;
    redeemedCount?: number;
}
