
export type StatBlock = {
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    spd: number;
    acc: number; // Accuracy stage
    eva: number; // Evasion stage
};

export type MoveCategory = 'Physical' | 'Special' | 'Status';
export type ElementType = 'Normal' | 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Ice' | 'Fighting' | 'Poison' | 'Ground' | 'Flying' | 'Psychic' | 'Bug' | 'Rock' | 'Ghost' | 'Dragon' | 'Steel' | 'Dark' | 'Fairy' | 'God';

export type StatusCondition = 'brn' | 'par' | 'psn' | 'frz' | 'slp' | null;

export interface Move {
    name: string;
    type: ElementType;
    category: MoveCategory;
    power: number;
    accuracy: number; // 0.0 - 1.0
    priority: number; // usually 0, +1 for Quick Attack
    pp: number;
    maxPp: number;
    effect?: {
        target: 'self' | 'opponent';
        stat?: keyof StatBlock;
        stages?: number;
        status?: StatusCondition;
        chance?: number; // 0.0 - 1.0
    };
}

export interface PokemonDBEntry {
    id: number;
    name: string;
    type: ElementType[];
    hp: number;
    atk: number;
    def: number;
    spAtk: number;
    spDef: number;
    spd: number;
    moves: string[]; // Starting moves
    catchRate: number;
    evolution?: {
        level: number;
        to: string;
    };
    learnset: Record<number, string>; // Level -> Move Name
    isLegend?: boolean;
}

export interface Pokemon {
    uuid: string;
    id: number; // Pokedex ID
    name: string;
    types: ElementType[];
    lvl: number;
    hp: number;
    maxHp: number;
    xp: number;
    nextXp: number;
    stats: Omit<StatBlock, 'acc' | 'eva'>; // Base stats at current level
    stages: StatBlock; // Battle stages (-6 to 6)
    status: StatusCondition;
    moves: string[]; // Move names
    sprites: {
        front: string;
        back: string;
    };
}

export interface PlayerState {
    name: string;
    wins: number;
    team: Pokemon[];
    box: Pokemon[];
    bag: {
        potions: number;
        pokeBalls: number;
        greatBalls: number;
        ultraBalls: number;
        masterBalls: number;
    };
}

export type BattlePhase = 'select' | 'processing' | 'finished';
