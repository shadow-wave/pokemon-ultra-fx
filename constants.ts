
import { ElementType, Move, PokemonDBEntry } from './types';

export const BALL_PROPS = {
    pokeBalls: { name: 'Poké Ball', rate: 1, color: 'bg-red-600', border: 'border-red-800' },
    greatBalls: { name: 'Great Ball', rate: 1.5, color: 'bg-blue-600', border: 'border-blue-800' },
    ultraBalls: { name: 'Ultra Ball', rate: 2, color: 'bg-yellow-600', border: 'border-yellow-800' },
    masterBalls: { name: 'Master Ball', rate: 255, color: 'bg-purple-600', border: 'border-purple-800' }
};

// Type Chart Multipliers
export const TYPE_CHART: Record<string, Record<string, number>> = {
    Normal: { Rock: 0.5, Ghost: 0, Steel: 0.5 },
    Fire: { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 2, Bug: 2, Rock: 0.5, Dragon: 0.5, Steel: 2 },
    Water: { Fire: 2, Water: 0.5, Grass: 0.5, Ground: 2, Rock: 2, Dragon: 0.5 },
    Electric: { Water: 2, Electric: 0.5, Grass: 0.5, Ground: 0, Flying: 2, Dragon: 0.5 },
    Grass: { Fire: 0.5, Water: 2, Grass: 0.5, Poison: 0.5, Ground: 2, Flying: 0.5, Bug: 0.5, Rock: 2, Dragon: 0.5, Steel: 0.5 },
    Ice: { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 0.5, Ground: 2, Flying: 2, Dragon: 2, Steel: 0.5 },
    Fighting: { Normal: 2, Ice: 2, Poison: 0.5, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2, Ghost: 0, Dark: 2, Steel: 2, Fairy: 0.5 },
    Poison: { Grass: 2, Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0 },
    Ground: { Fire: 2, Electric: 2, Grass: 0.5, Poison: 2, Flying: 0, Bug: 0.5, Rock: 2, Steel: 2 },
    Flying: { Electric: 0.5, Grass: 2, Fighting: 2, Bug: 2, Rock: 0.5, Steel: 0.5 },
    Psychic: { Fighting: 2, Poison: 2, Psychic: 0.5, Dark: 0, Steel: 0.5 },
    Bug: { Fire: 0.5, Grass: 2, Fighting: 0.5, Poison: 0.5, Flying: 0.5, Psychic: 2, Ghost: 0.5, Dark: 2, Steel: 0.5, Fairy: 0.5 },
    Rock: { Fire: 2, Ice: 2, Fighting: 0.5, Ground: 0.5, Flying: 2, Bug: 2, Steel: 0.5 },
    Ghost: { Normal: 0, Psychic: 2, Ghost: 2, Dark: 0.5 },
    Dragon: { Dragon: 2, Steel: 0.5, Fairy: 0 },
    Steel: { Fire: 0.5, Water: 0.5, Electric: 0.5, Ice: 2, Rock: 2, Steel: 0.5, Fairy: 2 },
    Dark: { Fighting: 0.5, Psychic: 2, Ghost: 2, Dark: 0.5, Fairy: 0.5 },
    Fairy: { Fire: 0.5, Fighting: 2, Poison: 0.5, Dragon: 2, Dark: 2, Steel: 0.5 },
    God: { Normal: 1, Fire: 1, Water: 1, Grass: 1, Electric: 1, Ice: 1, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 1, Steel: 1, Dark: 1, Fairy: 1 }
};

export const MOVES_DB: Record<string, Move> = {
    'Tackle': { name: 'Tackle', type: 'Normal', category: 'Physical', power: 40, accuracy: 1.0, priority: 0, pp: 35, maxPp: 35 },
    'Scratch': { name: 'Scratch', type: 'Normal', category: 'Physical', power: 40, accuracy: 1.0, priority: 0, pp: 35, maxPp: 35 },
    'Growl': { name: 'Growl', type: 'Normal', category: 'Status', power: 0, accuracy: 1.0, priority: 0, pp: 40, maxPp: 40, effect: { target: 'opponent', stat: 'atk', stages: -1 } },
    'Tail Whip': { name: 'Tail Whip', type: 'Normal', category: 'Status', power: 0, accuracy: 1.0, priority: 0, pp: 30, maxPp: 30, effect: { target: 'opponent', stat: 'def', stages: -1 } },
    'Quick Attack': { name: 'Quick Attack', type: 'Normal', category: 'Physical', power: 40, accuracy: 1.0, priority: 1, pp: 30, maxPp: 30 },
    'Slash': { name: 'Slash', type: 'Normal', category: 'Physical', power: 70, accuracy: 1.0, priority: 0, pp: 20, maxPp: 20 },
    'Sand Attack': { name: 'Sand Attack', type: 'Ground', category: 'Status', power: 0, accuracy: 1.0, priority: 0, pp: 15, maxPp: 15, effect: { target: 'opponent', stat: 'acc', stages: -1 } },
    
    'Vine Whip': { name: 'Vine Whip', type: 'Grass', category: 'Physical', power: 45, accuracy: 1.0, priority: 0, pp: 25, maxPp: 25 },
    'Razor Leaf': { name: 'Razor Leaf', type: 'Grass', category: 'Physical', power: 55, accuracy: 0.95, priority: 0, pp: 25, maxPp: 25 },
    'Solar Beam': { name: 'Solar Beam', type: 'Grass', category: 'Special', power: 120, accuracy: 1.0, priority: 0, pp: 10, maxPp: 10 },
    'Poison Powder': { name: 'Poison Powder', type: 'Poison', category: 'Status', power: 0, accuracy: 0.75, priority: 0, pp: 35, maxPp: 35, effect: { target: 'opponent', status: 'psn', chance: 1.0 } },
    'Flower Trick': { name: 'Flower Trick', type: 'Grass', category: 'Physical', power: 70, accuracy: 1.0, priority: 0, pp: 10, maxPp: 10 },
    
    'Ember': { name: 'Ember', type: 'Fire', category: 'Special', power: 40, accuracy: 1.0, priority: 0, pp: 25, maxPp: 25, effect: { target: 'opponent', status: 'brn', chance: 0.1 } },
    'Flamethrower': { name: 'Flamethrower', type: 'Fire', category: 'Special', power: 90, accuracy: 1.0, priority: 0, pp: 15, maxPp: 15, effect: { target: 'opponent', status: 'brn', chance: 0.1 } },
    'Fire Blast': { name: 'Fire Blast', type: 'Fire', category: 'Special', power: 110, accuracy: 0.85, priority: 0, pp: 5, maxPp: 5, effect: { target: 'opponent', status: 'brn', chance: 0.1 } },
    'Sacred Fire': { name: 'Sacred Fire', type: 'Fire', category: 'Physical', power: 100, accuracy: 0.95, priority: 0, pp: 5, maxPp: 5, effect: { target: 'opponent', status: 'brn', chance: 0.5 } },
    'Torch Song': { name: 'Torch Song', type: 'Fire', category: 'Special', power: 80, accuracy: 1.0, priority: 0, pp: 10, maxPp: 10, effect: { target: 'self', stat: 'spAtk', stages: 1 } },

    'Water Gun': { name: 'Water Gun', type: 'Water', category: 'Special', power: 40, accuracy: 1.0, priority: 0, pp: 25, maxPp: 25 },
    'Hydro Pump': { name: 'Hydro Pump', type: 'Water', category: 'Special', power: 110, accuracy: 0.8, priority: 0, pp: 5, maxPp: 5 },
    'Bubble': { name: 'Bubble', type: 'Water', category: 'Special', power: 40, accuracy: 1.0, priority: 0, pp: 30, maxPp: 30, effect: { target: 'opponent', stat: 'spd', stages: -1, chance: 0.1 } },
    'Surf': { name: 'Surf', type: 'Water', category: 'Special', power: 90, accuracy: 1.0, priority: 0, pp: 15, maxPp: 15 },
    'Water Shuriken': { name: 'Water Shuriken', type: 'Water', category: 'Special', power: 60, accuracy: 1.0, priority: 1, pp: 20, maxPp: 20 },
    'Aqua Step': { name: 'Aqua Step', type: 'Water', category: 'Physical', power: 80, accuracy: 1.0, priority: 0, pp: 10, maxPp: 10, effect: { target: 'self', stat: 'spd', stages: 1 } },

    'Thunder Shock': { name: 'Thunder Shock', type: 'Electric', category: 'Special', power: 40, accuracy: 1.0, priority: 0, pp: 30, maxPp: 30, effect: { target: 'opponent', status: 'par', chance: 0.1 } },
    'Thunderbolt': { name: 'Thunderbolt', type: 'Electric', category: 'Special', power: 90, accuracy: 1.0, priority: 0, pp: 15, maxPp: 15, effect: { target: 'opponent', status: 'par', chance: 0.1 } },
    'Thunder': { name: 'Thunder', type: 'Electric', category: 'Special', power: 110, accuracy: 0.7, priority: 0, pp: 10, maxPp: 10, effect: { target: 'opponent', status: 'par', chance: 0.3 } },
    'Thunder Wave': { name: 'Thunder Wave', type: 'Electric', category: 'Status', power: 0, accuracy: 0.9, priority: 0, pp: 20, maxPp: 20, effect: { target: 'opponent', status: 'par', chance: 1.0 } },

    'Ice Beam': { name: 'Ice Beam', type: 'Ice', category: 'Special', power: 90, accuracy: 1.0, priority: 0, pp: 10, maxPp: 10, effect: { target: 'opponent', status: 'frz', chance: 0.1 } },
    'Blizzard': { name: 'Blizzard', type: 'Ice', category: 'Special', power: 110, accuracy: 0.7, priority: 0, pp: 5, maxPp: 5, effect: { target: 'opponent', status: 'frz', chance: 0.1 } },
    
    'Rock Throw': { name: 'Rock Throw', type: 'Rock', category: 'Physical', power: 50, accuracy: 0.9, priority: 0, pp: 15, maxPp: 15 },
    'Earthquake': { name: 'Earthquake', type: 'Ground', category: 'Physical', power: 100, accuracy: 1.0, priority: 0, pp: 10, maxPp: 10 },
    'Dragon Rush': { name: 'Dragon Rush', type: 'Dragon', category: 'Physical', power: 100, accuracy: 0.75, priority: 0, pp: 10, maxPp: 10 },
    
    'Shadow Ball': { name: 'Shadow Ball', type: 'Ghost', category: 'Special', power: 80, accuracy: 1.0, priority: 0, pp: 15, maxPp: 15 },
    'Phantom Force': { name: 'Phantom Force', type: 'Ghost', category: 'Physical', power: 90, accuracy: 1.0, priority: 0, pp: 10, maxPp: 10 },
    'Lick': { name: 'Lick', type: 'Ghost', category: 'Physical', power: 30, accuracy: 1.0, priority: 0, pp: 30, maxPp: 30, effect: { target: 'opponent', status: 'par', chance: 0.3 } },

    'Psychic': { name: 'Psychic', type: 'Psychic', category: 'Special', power: 90, accuracy: 1.0, priority: 0, pp: 10, maxPp: 10, effect: { target: 'opponent', stat: 'spDef', stages: -1, chance: 0.1 } },
    'Teleport': { name: 'Teleport', type: 'Psychic', category: 'Status', power: 0, accuracy: 1.0, priority: 0, pp: 20, maxPp: 20 },
    
    'Hyper Beam': { name: 'Hyper Beam', type: 'Normal', category: 'Special', power: 150, accuracy: 0.9, priority: 0, pp: 5, maxPp: 5 },
    'Drill Peck': { name: 'Drill Peck', type: 'Flying', category: 'Physical', power: 80, accuracy: 1.0, priority: 0, pp: 20, maxPp: 20 },
    'Wing Attack': { name: 'Wing Attack', type: 'Flying', category: 'Physical', power: 60, accuracy: 1.0, priority: 0, pp: 35, maxPp: 35 },
    'Aeroblast': { name: 'Aeroblast', type: 'Flying', category: 'Special', power: 100, accuracy: 0.95, priority: 0, pp: 5, maxPp: 5 },
    'Brave Bird': { name: 'Brave Bird', type: 'Flying', category: 'Physical', power: 120, accuracy: 1.0, priority: 0, pp: 15, maxPp: 15 },

    'Dragon Claw': { name: 'Dragon Claw', type: 'Dragon', category: 'Physical', power: 80, accuracy: 1.0, priority: 0, pp: 15, maxPp: 15 },
    'Outrage': { name: 'Outrage', type: 'Dragon', category: 'Physical', power: 120, accuracy: 1.0, priority: 0, pp: 10, maxPp: 10 },
    'Twister': { name: 'Twister', type: 'Dragon', category: 'Special', power: 40, accuracy: 1.0, priority: 0, pp: 20, maxPp: 20 },
    'Dragon Rage': { name: 'Dragon Rage', type: 'Dragon', category: 'Special', power: 40, accuracy: 1.0, priority: 0, pp: 10, maxPp: 10 },
    'Dragon Darts': { name: 'Dragon Darts', type: 'Dragon', category: 'Physical', power: 100, accuracy: 1.0, priority: 0, pp: 10, maxPp: 10 },

    'Sludge Bomb': { name: 'Sludge Bomb', type: 'Poison', category: 'Special', power: 90, accuracy: 1.0, priority: 0, pp: 10, maxPp: 10, effect: { target: 'opponent', status: 'psn', chance: 0.3 } },
    'Flash Cannon': { name: 'Flash Cannon', type: 'Steel', category: 'Special', power: 80, accuracy: 1.0, priority: 0, pp: 10, maxPp: 10 },
    'Iron Tail': { name: 'Iron Tail', type: 'Steel', category: 'Physical', power: 100, accuracy: 0.75, priority: 0, pp: 15, maxPp: 15, effect: { target: 'opponent', stat: 'def', stages: -1, chance: 0.3 } },
    'Gigaton Hammer': { name: 'Gigaton Hammer', type: 'Steel', category: 'Physical', power: 160, accuracy: 1.0, priority: 0, pp: 5, maxPp: 5 },
    'Recover': { name: 'Recover', type: 'Normal', category: 'Status', power: 0, accuracy: 1.0, priority: 0, pp: 10, maxPp: 10 },

    'Moonblast': { name: 'Moonblast', type: 'Fairy', category: 'Special', power: 95, accuracy: 1.0, priority: 0, pp: 15, maxPp: 15, effect: { target: 'opponent', stat: 'spAtk', stages: -1, chance: 0.3 } },
    'Play Rough': { name: 'Play Rough', type: 'Fairy', category: 'Physical', power: 90, accuracy: 0.9, priority: 0, pp: 10, maxPp: 10, effect: { target: 'opponent', stat: 'atk', stages: -1, chance: 0.1 } },
    'Dark Pulse': { name: 'Dark Pulse', type: 'Dark', category: 'Special', power: 80, accuracy: 1.0, priority: 0, pp: 15, maxPp: 15 },
    'Night Slash': { name: 'Night Slash', type: 'Dark', category: 'Physical', power: 70, accuracy: 1.0, priority: 0, pp: 15, maxPp: 15 },
    'Aura Sphere': { name: 'Aura Sphere', type: 'Fighting', category: 'Special', power: 80, accuracy: 100, priority: 0, pp: 20, maxPp: 20 },
    'Close Combat': { name: 'Close Combat', type: 'Fighting', category: 'Physical', power: 120, accuracy: 1.0, priority: 0, pp: 5, maxPp: 5, effect: { target: 'self', stat: 'def', stages: -1 } },

    // Boss Moves
    'Judgment': { name: 'Judgment', type: 'God', category: 'Special', power: 100, accuracy: 1.0, priority: 0, pp: 10, maxPp: 10 },
    'Psystrike': { name: 'Psystrike', type: 'Psychic', category: 'Special', power: 100, accuracy: 1.0, priority: 0, pp: 10, maxPp: 10 },
    'Dragon Ascent': { name: 'Dragon Ascent', type: 'Flying', category: 'Physical', power: 120, accuracy: 1.0, priority: 0, pp: 5, maxPp: 5 },
};

export const POKEMON_DB: Record<string, PokemonDBEntry> = {
    // Starters
    'Bulbasaur': { 
        id: 1, name: 'Bulbasaur', type: ['Grass', 'Poison'], hp: 45, atk: 49, def: 49, spAtk: 65, spDef: 65, spd: 45, catchRate: 45,
        moves: ['Tackle', 'Growl', 'Vine Whip'], 
        learnset: { 7: 'Vine Whip', 13: 'Poison Powder', 20: 'Razor Leaf', 30: 'Solar Beam' },
        evolution: { level: 16, to: 'Ivysaur' }
    },
    'Ivysaur': { 
        id: 2, name: 'Ivysaur', type: ['Grass', 'Poison'], hp: 60, atk: 62, def: 63, spAtk: 80, spDef: 80, spd: 60, catchRate: 45,
        moves: ['Tackle', 'Growl', 'Vine Whip'],
        learnset: { 20: 'Razor Leaf', 35: 'Solar Beam' },
        evolution: { level: 32, to: 'Venusaur' }
    },
    'Venusaur': { 
        id: 3, name: 'Venusaur', type: ['Grass', 'Poison'], hp: 80, atk: 82, def: 83, spAtk: 100, spDef: 100, spd: 80, catchRate: 45,
        moves: ['Vine Whip', 'Razor Leaf', 'Tackle', 'Growl'],
        learnset: { 32: 'Solar Beam', 45: 'Earthquake' }
    },
    
    'Charmander': { 
        id: 4, name: 'Charmander', type: ['Fire'], hp: 39, atk: 52, def: 43, spAtk: 60, spDef: 50, spd: 65, catchRate: 45,
        moves: ['Scratch', 'Growl', 'Ember'],
        learnset: { 7: 'Ember', 15: 'Slash', 25: 'Flamethrower', 40: 'Fire Blast' },
        evolution: { level: 16, to: 'Charmeleon' }
    },
    'Charmeleon': { 
        id: 5, name: 'Charmeleon', type: ['Fire'], hp: 58, atk: 64, def: 58, spAtk: 80, spDef: 65, spd: 80, catchRate: 45,
        moves: ['Scratch', 'Ember', 'Growl'],
        learnset: { 18: 'Slash', 28: 'Flamethrower', 45: 'Fire Blast' },
        evolution: { level: 36, to: 'Charizard' }
    },
    'Charizard': { 
        id: 6, name: 'Charizard', type: ['Fire', 'Flying'], hp: 78, atk: 84, def: 78, spAtk: 109, spDef: 85, spd: 100, catchRate: 45,
        moves: ['Flamethrower', 'Wing Attack', 'Slash', 'Ember'],
        learnset: { 36: 'Wing Attack', 45: 'Fire Blast', 55: 'Dragon Claw' }
    },
    
    'Squirtle': { 
        id: 7, name: 'Squirtle', type: ['Water'], hp: 44, atk: 48, def: 65, spAtk: 50, spDef: 64, spd: 43, catchRate: 45,
        moves: ['Tackle', 'Tail Whip', 'Water Gun'],
        learnset: { 7: 'Water Gun', 15: 'Bubble', 25: 'Surf', 35: 'Hydro Pump' },
        evolution: { level: 16, to: 'Wartortle' }
    },
    'Wartortle': { 
        id: 8, name: 'Wartortle', type: ['Water'], hp: 59, atk: 63, def: 80, spAtk: 65, spDef: 80, spd: 58, catchRate: 45,
        moves: ['Tackle', 'Water Gun', 'Bubble'],
        learnset: { 25: 'Surf', 40: 'Hydro Pump', 45: 'Ice Beam' },
        evolution: { level: 36, to: 'Blastoise' }
    },
    'Blastoise': { 
        id: 9, name: 'Blastoise', type: ['Water'], hp: 79, atk: 83, def: 100, spAtk: 85, spDef: 105, spd: 78, catchRate: 45,
        moves: ['Surf', 'Ice Beam', 'Hydro Pump', 'Tackle'],
        learnset: { 36: 'Flash Cannon', 50: 'Hydro Pump' }
    },

    // Gen 9
    'Sprigatito': {
        id: 906, name: 'Sprigatito', type: ['Grass'], hp: 40, atk: 61, def: 54, spAtk: 45, spDef: 45, spd: 65, catchRate: 45,
        moves: ['Scratch', 'Tail Whip', 'Razor Leaf'], learnset: { 15: 'Flower Trick' }, evolution: { level: 16, to: 'Floragato' }
    },
    'Floragato': {
        id: 907, name: 'Floragato', type: ['Grass'], hp: 61, atk: 80, def: 63, spAtk: 60, spDef: 63, spd: 83, catchRate: 45,
        moves: ['Razor Leaf', 'Flower Trick', 'Slash'], learnset: { 36: 'Solar Beam' }, evolution: { level: 36, to: 'Meowscarada' }
    },
    'Meowscarada': {
        id: 908, name: 'Meowscarada', type: ['Grass', 'Dark'], hp: 76, atk: 110, def: 70, spAtk: 81, spDef: 70, spd: 123, catchRate: 45,
        moves: ['Flower Trick', 'Night Slash', 'Play Rough', 'Solar Beam'], learnset: { 40: 'Night Slash' }
    },

    'Fuecoco': {
        id: 909, name: 'Fuecoco', type: ['Fire'], hp: 67, atk: 45, def: 59, spAtk: 63, spDef: 40, spd: 36, catchRate: 45,
        moves: ['Tackle', 'Ember'], learnset: { 15: 'Flamethrower' }, evolution: { level: 16, to: 'Crocalor' }
    },
    'Crocalor': {
        id: 910, name: 'Crocalor', type: ['Fire'], hp: 81, atk: 55, def: 78, spAtk: 90, spDef: 58, spd: 49, catchRate: 45,
        moves: ['Ember', 'Flamethrower', 'Hyper Beam'], learnset: { 36: 'Torch Song' }, evolution: { level: 36, to: 'Skeledirge' }
    },
    'Skeledirge': {
        id: 911, name: 'Skeledirge', type: ['Fire', 'Ghost'], hp: 104, atk: 75, def: 100, spAtk: 110, spDef: 75, spd: 66, catchRate: 45,
        moves: ['Torch Song', 'Shadow Ball', 'Earthquake', 'Fire Blast'], learnset: { 40: 'Shadow Ball' }
    },

    'Quaxly': {
        id: 912, name: 'Quaxly', type: ['Water'], hp: 55, atk: 65, def: 45, spAtk: 50, spDef: 45, spd: 50, catchRate: 45,
        moves: ['Pound', 'Water Gun'], learnset: { 15: 'Aqua Step' }, evolution: { level: 16, to: 'Quaxwell' }
    },
    'Quaxwell': {
        id: 913, name: 'Quaxwell', type: ['Water'], hp: 70, atk: 85, def: 65, spAtk: 65, spDef: 60, spd: 65, catchRate: 45,
        moves: ['Water Gun', 'Aqua Step', 'Wing Attack'], learnset: { 36: 'Close Combat' }, evolution: { level: 36, to: 'Quaquaval' }
    },
    'Quaquaval': {
        id: 914, name: 'Quaquaval', type: ['Water', 'Fighting'], hp: 85, atk: 120, def: 80, spAtk: 85, spDef: 75, spd: 85, catchRate: 45,
        moves: ['Aqua Step', 'Close Combat', 'Aura Sphere', 'Hydro Pump'], learnset: { 40: 'Close Combat' }
    },

    // New Gen Pokemon
    'Riolu': {
        id: 447, name: 'Riolu', type: ['Fighting'], hp: 40, atk: 70, def: 40, spAtk: 35, spDef: 40, spd: 60, catchRate: 75,
        moves: ['Quick Attack', 'Rock Throw'], learnset: { 15: 'Aura Sphere' }, evolution: { level: 15, to: 'Lucario' }
    },
    'Lucario': {
        id: 448, name: 'Lucario', type: ['Fighting', 'Steel'], hp: 70, atk: 110, def: 70, spAtk: 115, spDef: 70, spd: 90, catchRate: 45,
        moves: ['Aura Sphere', 'Close Combat', 'Flash Cannon', 'Extreme Speed'], learnset: { 30: 'Close Combat' }
    },
    
    'Gible': {
        id: 443, name: 'Gible', type: ['Dragon', 'Ground'], hp: 58, atk: 70, def: 45, spAtk: 40, spDef: 45, spd: 42, catchRate: 45,
        moves: ['Tackle', 'Sand Attack'], learnset: { 15: 'Dragon Rage', 25: 'Dragon Claw' }, evolution: { level: 24, to: 'Gabite' }
    },
    'Gabite': {
        id: 444, name: 'Gabite', type: ['Dragon', 'Ground'], hp: 68, atk: 90, def: 65, spAtk: 50, spDef: 55, spd: 82, catchRate: 45,
        moves: ['Dragon Claw', 'Sand Attack', 'Slash'], learnset: { 30: 'Earthquake' }, evolution: { level: 48, to: 'Garchomp' }
    },
    'Garchomp': {
        id: 445, name: 'Garchomp', type: ['Dragon', 'Ground'], hp: 108, atk: 130, def: 95, spAtk: 80, spDef: 85, spd: 102, catchRate: 45,
        moves: ['Dragon Rush', 'Earthquake', 'Dragon Claw', 'Fire Blast'], learnset: { 50: 'Dragon Rush' }
    },

    'Froakie': {
        id: 656, name: 'Froakie', type: ['Water'], hp: 41, atk: 56, def: 40, spAtk: 62, spDef: 44, spd: 71, catchRate: 45,
        moves: ['Bubble', 'Quick Attack'], learnset: { 15: 'Water Pulse' }, evolution: { level: 16, to: 'Frogadier' }
    },
    'Frogadier': {
        id: 657, name: 'Frogadier', type: ['Water'], hp: 54, atk: 63, def: 52, spAtk: 83, spDef: 56, spd: 97, catchRate: 45,
        moves: ['Bubble', 'Quick Attack', 'Water Shuriken'], learnset: { 36: 'Water Shuriken' }, evolution: { level: 36, to: 'Greninja' }
    },
    'Greninja': {
        id: 658, name: 'Greninja', type: ['Water', 'Dark'], hp: 72, atk: 95, def: 67, spAtk: 103, spDef: 71, spd: 122, catchRate: 45,
        moves: ['Water Shuriken', 'Night Slash', 'Hydro Pump', 'Dark Pulse'], learnset: { 40: 'Night Slash' }
    },

    'Tinkatink': {
        id: 957, name: 'Tinkatink', type: ['Fairy', 'Steel'], hp: 50, atk: 45, def: 45, spAtk: 35, spDef: 64, spd: 58, catchRate: 190,
        moves: ['Play Rough', 'Rock Throw'], learnset: { 15: 'Flash Cannon' }, evolution: { level: 24, to: 'Tinkatuff' }
    },
    'Tinkatuff': {
        id: 958, name: 'Tinkatuff', type: ['Fairy', 'Steel'], hp: 65, atk: 55, def: 55, spAtk: 45, spDef: 82, spd: 78, catchRate: 90,
        moves: ['Play Rough', 'Flash Cannon'], learnset: { 38: 'Gigaton Hammer' }, evolution: { level: 38, to: 'Tinkaton' }
    },
    'Tinkaton': {
        id: 959, name: 'Tinkaton', type: ['Fairy', 'Steel'], hp: 85, atk: 75, def: 77, spAtk: 70, spDef: 105, spd: 94, catchRate: 45,
        moves: ['Gigaton Hammer', 'Play Rough', 'Flash Cannon', 'Rock Throw'], learnset: { 38: 'Gigaton Hammer' }
    },

    'Dreepy': {
        id: 885, name: 'Dreepy', type: ['Dragon', 'Ghost'], hp: 28, atk: 60, def: 30, spAtk: 40, spDef: 30, spd: 82, catchRate: 45,
        moves: ['Quick Attack', 'Lick'], learnset: { 20: 'Dragon Breath' }, evolution: { level: 50, to: 'Drakloak' }
    },
    'Drakloak': {
        id: 886, name: 'Drakloak', type: ['Dragon', 'Ghost'], hp: 68, atk: 80, def: 50, spAtk: 60, spDef: 50, spd: 102, catchRate: 45,
        moves: ['Dragon Claw', 'Shadow Ball'], learnset: { 50: 'Phantom Force' }, evolution: { level: 60, to: 'Dragapult' }
    },
    'Dragapult': {
        id: 887, name: 'Dragapult', type: ['Dragon', 'Ghost'], hp: 88, atk: 120, def: 75, spAtk: 100, spDef: 75, spd: 142, catchRate: 45,
        moves: ['Dragon Darts', 'Phantom Force', 'Dragon Claw', 'Shadow Ball'], learnset: { 60: 'Dragon Darts' }
    },

    'Sylveon': {
        id: 700, name: 'Sylveon', type: ['Fairy'], hp: 95, atk: 65, def: 65, spAtk: 110, spDef: 130, spd: 60, catchRate: 45,
        moves: ['Moonblast', 'Quick Attack', 'Play Rough', 'Shadow Ball'], learnset: {}
    },
    'Mimikyu': {
        id: 778, name: 'Mimikyu', type: ['Ghost', 'Fairy'], hp: 55, atk: 90, def: 80, spAtk: 50, spDef: 105, spd: 96, catchRate: 45,
        moves: ['Shadow Ball', 'Play Rough', 'Slash', 'Thunderbolt'], learnset: {}
    },
    'Gardevoir': {
        id: 282, name: 'Gardevoir', type: ['Psychic', 'Fairy'], hp: 68, atk: 65, def: 65, spAtk: 125, spDef: 115, spd: 80, catchRate: 45,
        moves: ['Psychic', 'Moonblast', 'Thunderbolt', 'Shadow Ball'], learnset: {}
    },

    // Common Wild
    'Pidgey': { 
        id: 16, name: 'Pidgey', type: ['Normal', 'Flying'], hp: 40, atk: 45, def: 40, spAtk: 35, spDef: 35, spd: 56, catchRate: 255,
        moves: ['Tackle', 'Sand Attack'],
        learnset: { 9: 'Quick Attack', 15: 'Wing Attack' },
        evolution: { level: 18, to: 'Pidgeotto' }
    },
    'Pidgeotto': { 
        id: 17, name: 'Pidgeotto', type: ['Normal', 'Flying'], hp: 63, atk: 60, def: 55, spAtk: 50, spDef: 50, spd: 71, catchRate: 120,
        moves: ['Quick Attack', 'Wing Attack', 'Tackle'],
        learnset: { 20: 'Wing Attack' },
        evolution: { level: 36, to: 'Pidgeot' }
    },
     'Pidgeot': { 
        id: 18, name: 'Pidgeot', type: ['Normal', 'Flying'], hp: 83, atk: 80, def: 75, spAtk: 70, spDef: 70, spd: 101, catchRate: 45,
        moves: ['Wing Attack', 'Quick Attack', 'Slash', 'Hyper Beam'],
        learnset: { 40: 'Hyper Beam' }
    },

    'Pikachu': { 
        id: 25, name: 'Pikachu', type: ['Electric'], hp: 35, atk: 55, def: 40, spAtk: 50, spDef: 50, spd: 90, catchRate: 190,
        moves: ['Thunder Shock', 'Growl'],
        learnset: { 10: 'Quick Attack', 20: 'Thunderbolt', 35: 'Thunder' },
        evolution: { level: 25, to: 'Raichu' } // Item evo simplified to Level for arcade
    },
    'Raichu': { 
        id: 26, name: 'Raichu', type: ['Electric'], hp: 60, atk: 90, def: 55, spAtk: 90, spDef: 80, spd: 110, catchRate: 75,
        moves: ['Thunderbolt', 'Quick Attack', 'Thunder', 'Tail Whip'],
        learnset: { 40: 'Thunder' }
    },

    'Abra': {
        id: 63, name: 'Abra', type: ['Psychic'], hp: 25, atk: 20, def: 15, spAtk: 105, spDef: 55, spd: 90, catchRate: 200,
        moves: ['Teleport'], learnset: { 10: 'Psychic' }, evolution: { level: 16, to: 'Kadabra' }
    },
    'Kadabra': {
        id: 64, name: 'Kadabra', type: ['Psychic'], hp: 40, atk: 35, def: 30, spAtk: 120, spDef: 70, spd: 105, catchRate: 100,
        moves: ['Psychic', 'Shadow Ball'], learnset: { 20: 'Shadow Ball' }, evolution: { level: 36, to: 'Alakazam' }
    },
    'Alakazam': {
        id: 65, name: 'Alakazam', type: ['Psychic'], hp: 55, atk: 50, def: 45, spAtk: 135, spDef: 95, spd: 120, catchRate: 50,
        moves: ['Psychic', 'Shadow Ball', 'Hyper Beam'], learnset: { 40: 'Hyper Beam' }
    },
    
    'Gastly': {
        id: 92, name: 'Gastly', type: ['Ghost', 'Poison'], hp: 30, atk: 35, def: 30, spAtk: 100, spDef: 35, spd: 80, catchRate: 190,
        moves: ['Lick', 'Shadow Ball'], learnset: { 15: 'Shadow Ball' }, evolution: { level: 25, to: 'Haunter' }
    },
    'Haunter': {
        id: 93, name: 'Haunter', type: ['Ghost', 'Poison'], hp: 45, atk: 50, def: 45, spAtk: 115, spDef: 55, spd: 95, catchRate: 90,
        moves: ['Shadow Ball', 'Psychic'], learnset: { 30: 'Psychic' }, evolution: { level: 40, to: 'Gengar' }
    },
    'Gengar': { 
        id: 94, name: 'Gengar', type: ['Ghost', 'Poison'], hp: 60, atk: 65, def: 60, spAtk: 130, spDef: 75, spd: 110, catchRate: 45,
        moves: ['Shadow Ball', 'Psychic', 'Thunderbolt', 'Sludge Bomb'], learnset: { 45: 'Thunderbolt' }
    },

    'Onix': { 
        id: 95, name: 'Onix', type: ['Rock', 'Ground'], hp: 35, atk: 45, def: 160, spAtk: 30, spDef: 45, spd: 70, catchRate: 45,
        moves: ['Rock Throw', 'Tackle', 'Earthquake'], learnset: { 25: 'Earthquake' }, evolution: { level: 30, to: 'Steelix' }
    },
    'Steelix': {
        id: 208, name: 'Steelix', type: ['Steel', 'Ground'], hp: 75, atk: 85, def: 200, spAtk: 55, spDef: 65, spd: 30, catchRate: 25,
        moves: ['Earthquake', 'Rock Throw', 'Iron Tail'], learnset: { 35: 'Iron Tail' }
    },

    'Dratini': {
        id: 147, name: 'Dratini', type: ['Dragon'], hp: 41, atk: 64, def: 45, spAtk: 50, spDef: 50, spd: 50, catchRate: 45,
        moves: ['Thunder Wave', 'Twister'], learnset: { 15: 'Dragon Rage', 30: 'Dragon Claw' }, evolution: { level: 30, to: 'Dragonair' }
    },
    'Dragonair': {
        id: 148, name: 'Dragonair', type: ['Dragon'], hp: 61, atk: 84, def: 65, spAtk: 70, spDef: 70, spd: 70, catchRate: 45,
        moves: ['Dragon Claw', 'Thunder Wave'], learnset: { 40: 'Outrage' }, evolution: { level: 55, to: 'Dragonite' }
    },
    'Dragonite': {
        id: 149, name: 'Dragonite', type: ['Dragon', 'Flying'], hp: 91, atk: 134, def: 95, spAtk: 100, spDef: 100, spd: 80, catchRate: 45,
        moves: ['Outrage', 'Wing Attack', 'Thunderbolt', 'Fire Blast'], learnset: { 60: 'Hyper Beam' }
    },

    // LEGENDARY BOSSES
    'Mewtwo': { 
        id: 150, name: 'Mewtwo', type: ['Psychic'], hp: 106, atk: 110, def: 90, spAtk: 154, spDef: 90, spd: 130, catchRate: 3, isLegend: true,
        moves: ['Psystrike', 'Shadow Ball', 'Ice Beam', 'Recover'], learnset: {}
    },
    'Rayquaza': {
        id: 384, name: 'Rayquaza', type: ['Dragon', 'Flying'], hp: 105, atk: 150, def: 90, spAtk: 150, spDef: 90, spd: 95, catchRate: 3, isLegend: true,
        moves: ['Dragon Ascent', 'Outrage', 'Flamethrower', 'Earthquake'], learnset: {}
    },
    'Arceus': {
        id: 493, name: 'Arceus', type: ['God'], hp: 120, atk: 120, def: 120, spAtk: 120, spDef: 120, spd: 120, catchRate: 3, isLegend: true,
        moves: ['Judgment', 'Hyper Beam', 'Recover', 'Earthquake'], learnset: {}
    },
    'Lugia': {
        id: 249, name: 'Lugia', type: ['Psychic', 'Flying'], hp: 106, atk: 90, def: 130, spAtk: 90, spDef: 154, spd: 110, catchRate: 3, isLegend: true,
        moves: ['Aeroblast', 'Psychic', 'Hydro Pump', 'Recover'], learnset: {}
    },
    'Ho-Oh': {
        id: 250, name: 'Ho-Oh', type: ['Fire', 'Flying'], hp: 106, atk: 130, def: 90, spAtk: 110, spDef: 154, spd: 90, catchRate: 3, isLegend: true,
        moves: ['Sacred Fire', 'Brave Bird', 'Earthquake', 'Recover'], learnset: {}
    }
};
