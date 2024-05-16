export interface IRanking {
    ranking?: number;
    score?: number;
    user?: User;
    possibleGift?: PossibleGift;
}

export interface PossibleGift {
    name?: string;
    image?: string;
}

export interface User {
    name?: string;
    phone?: string;
    email?: string;
}
