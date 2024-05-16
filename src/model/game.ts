export interface IGameOver {
    curr: number;
    message: string;
}

export interface IMyScore {
    maxScore?: number;
    currentRanking?: number;
    possibleGift?: PossibleGift;
}

export interface PossibleGift {
    id?: number;
    name?: string;
    image?: string;
    minScore?: number;
    maxCapacity?: number;
    redeemedCount?: number;
}


export interface IGift {
    id?: number;
    name?: string;
    image?: string;
    minScore?: number;
    maxCapacity?: number;
    redeemedCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
