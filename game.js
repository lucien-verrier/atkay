// ===== NAME GENERATION SYSTEM =====

// Enemy name components by type
const NAME_BANKS = {
    rat: {
        prefixes: ['Scurry', 'Nibble', 'Scratch', 'Squeak', 'Gnaw', 'Filth', 'Plague', 'Sewer'],
        suffixes: ['tail', 'tooth', 'claw', 'whisker', 'eye', 'fur', 'paw']
    },
    kobold: {
        first: ['Klaus', 'Gregor', 'Dimitri', 'Boris', 'Viktor', 'Igor', 'Sergei', 'Mikhail', 'Anton', 'Pavel', 'Yuri', 'Stanislav'],
        last: ['Kowalski', 'Novak', 'Kovač', 'Petrov', 'Volkov', 'Sokolov', 'Popov', 'Ivanov']
    },
    goblin: {
        names: ['Grak', 'Snark', 'Grizz', 'Brak', 'Skrag', 'Grub', 'Muck', 'Gnarl', 'Zog', 'Krag', 'Throk', 'Drek', 'Grot', 'Snag']
    },
    spider: {
        prefixes: ['Venom', 'Shadow', 'Web', 'Silk', 'Dark', 'Night', 'Creep', 'Fang'],
        suffixes: ['spinner', 'crawler', 'lurker', 'stalker', 'weaver', 'hunter', 'biter']
    },
    skeleton: {
        titles: ['Sir', 'Lord', 'Duke', 'Baron', 'Count', 'Knight'],
        names: ['Aldric', 'Godwin', 'Oswald', 'Edmund', 'Cedric', 'Bertram', 'Thurstan', 'Wulfric', 'Aelfric', 'Leofric']
    },
    orc: {
        names: ['Ghor', 'Thrak', 'Morg', 'Uruk', 'Gorz', 'Drog', 'Kruk', 'Grok', 'Shak', 'Grash', 'Urg', 'Nazg', 'Grishnakh']
    },
    ogre: {
        names: ['Bonecrusher', 'Gut', 'Maw', 'Stomp', 'Grendel', 'Lunk', 'Thud', 'Crush', 'Smash', 'Grunk', 'Mog']
    },
    wraith: {
        titles: ['The Forgotten', 'The Lost', 'The Hollow', 'The Eternal', 'The Pale', 'The Mourning', 'The Silent'],
        names: ['Specter', 'Phantom', 'Shade', 'Banshee', 'Revenant', 'Apparition', 'Wraith']
    },
    troll: {
        names: ['Thorgar', 'Haldor', 'Ragnar', 'Bjorn', 'Ulfar', 'Sven', 'Gunnar', 'Torsten', 'Hrothgar', 'Gorm']
    },
    minotaur: {
        names: ['Asterion', 'Tauros', 'Minos', 'Theron', 'Aegeus', 'Perseus', 'Daedalus', 'Icarus', 'Arion', 'Theseus']
    },
    demon: {
        names: ['Belial', 'Moloch', 'Baal', 'Asmodeus', 'Beelzebub', 'Mephistopheles', 'Abaddon', 'Apollyon', 'Leviathan', 'Mammon', 'Azazel', 'Lucifuge']
    },
    lich: {
        titles: ['Archlich', 'Necromancer', 'Death Lord', 'Dark Sorcerer'],
        names: ['Vecna', 'Acererak', 'Szass', 'Larloch', 'Zengyi', 'Azalin', 'Velsharoon']
    },
    dragon: {
        prefixes: ['Ancient', 'Elder', 'Wyrm', 'Great', 'Dread', 'Eternal'],
        names: ['Smaug', 'Bahamut', 'Tiamat', 'Ancalagon', 'Glaurung', 'Fafnir', 'Nidhogg', 'Jormungandr']
    }
};

// Item name components
const ITEM_NAME_BANKS = {
    weapon: {
        prefixes: ['Crimson', 'Shadow', 'Ancient', 'Blessed', 'Cursed', 'Radiant', 'Void', 'Storm', 'Frost', 'Flame', 'Thunder', 'Spectral', 'Divine', 'Infernal', 'Ethereal'],
        bases: ['Blade', 'Sword', 'Edge', 'Fang', 'Claw', 'Talon', 'Reaver', 'Cleaver', 'Saber', 'Scimitar'],
        suffixes: ['of Power', 'of Fury', 'of Ruin', 'of Light', 'of Darkness', 'of Storms', 'of Flame', 'of Frost', 'of Wrath', 'of Vengeance', 'of Glory', 'of Despair']
    },
    armor: {
        prefixes: ['Iron', 'Steel', 'Mythril', 'Dragon', 'Demon', 'Angel', 'Crystal', 'Shadow', 'Radiant', 'Obsidian', 'Sapphire', 'Ruby'],
        bases: ['Mail', 'Plate', 'Guard', 'Ward', 'Shell', 'Aegis', 'Bulwark', 'Carapace'],
        suffixes: ['of Protection', 'of Warding', 'of Resilience', 'of Fortitude', 'of the Titan', 'of the Mountain', 'of the Ancients', 'of Invulnerability']
    },
    ring: {
        prefixes: ['Ring', 'Band', 'Circle', 'Loop', 'Sigil'],
        descriptors: ['of Strength', 'of Power', 'of Vitality', 'of Protection', 'of Warding', 'of Might', 'of Endurance', 'of Regeneration', 'of the Bear', 'of the Lion', 'of the Titan', 'of the Phoenix', 'of the Serpent', 'of the Dragon']
    },
    potion: {
        types: ['Elixir', 'Draught', 'Philter', 'Tonic', 'Essence', 'Brew', 'Concoction', 'Mixture'],
        descriptors: ['of Healing', 'of Vigor', 'of Strength', 'of Resilience', 'of Fortitude', 'of Restoration', 'of Life', 'of Vitality', 'of Might', 'of Power', 'of the Gods', 'of Renewal']
    }
};

// Level name components
const LEVEL_NAME_BANKS = {
    numbers: ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen'],
    nouns1: ['Knights', 'Shadows', 'Echoes', 'Whispers', 'Dreams', 'Memories', 'Sorrows', 'Ravens', 'Serpents', 'Wolves', 'Crows', 'Ghosts'],
    verbs: ['Advance', 'Fall', 'Rise', 'Wait', 'Weep', 'Dance', 'Sleep', 'Wake', 'Linger', 'Fade', 'Gather', 'Scatter'],
    articles: ['The', 'A', 'An'],
    adjectives: ['Azure', 'Crimson', 'Forgotten', 'Lost', 'Ancient', 'Broken', 'Silent', 'Hollow', 'Endless', 'Bitter', 'Pale', 'Deep', 'Dark'],
    nouns2: ['Thumbprint', 'Staircase', 'Garden', 'Chamber', 'Threshold', 'Passage', 'Archive', 'Gallery', 'Sanctum', 'Vault', 'Crypt', 'Spire'],
    possessiveNouns: ['Azem', 'Mordred', 'Ashur', 'Selene', 'Corvus', 'Morrow', 'Vesper', 'Kael', 'Lysander', 'Nyx', 'Oberon', 'Circe'],
    locations: ['Belfry', 'Tower', 'Gate', 'Bridge', 'Hall', 'Court', 'Throne', 'Crown', 'Sepulcher', 'Ossuary', 'Chapel', 'Refectory'],
    phrases: [
        'A Meeting Cut Short',
        'Whither the Wanderlust Wait',
        'Where Shadows Conspire',
        'The Hour Before Dawn',
        'A Path Less Traveled',
        'The Weight of Silence',
        'Where Light Fails',
        'The Edge of Memory',
        'A Door Left Ajar',
        'The Sound of Falling',
        'Between Breath and Stone',
        'The Last Vigil'
    ]
};

// Track used names to avoid duplicates
let usedNames = {
    enemies: new Set(),
    items: new Set(),
    levels: new Set()
};

// Random selection helper
function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Generate enemy name based on type
function generateEnemyName(type) {
    const bank = NAME_BANKS[type];
    if (!bank) return ENEMY_TYPES[type].name;

    let name = '';
    let attempts = 0;
    const maxAttempts = 50;

    do {
        switch(type) {
            case 'rat':
                name = randomFrom(bank.prefixes) + randomFrom(bank.suffixes);
                break;
            case 'kobold':
                name = randomFrom(bank.first) + ' ' + randomFrom(bank.last);
                break;
            case 'goblin':
            case 'orc':
            case 'ogre':
            case 'troll':
            case 'minotaur':
                name = randomFrom(bank.names);
                break;
            case 'spider':
                name = randomFrom(bank.prefixes) + randomFrom(bank.suffixes);
                break;
            case 'skeleton':
                name = randomFrom(bank.titles) + ' ' + randomFrom(bank.names);
                break;
            case 'wraith':
                if (Math.random() < 0.5) {
                    name = randomFrom(bank.names) + ' ' + randomFrom(bank.titles);
                } else {
                    name = randomFrom(bank.titles);
                }
                break;
            case 'demon':
                name = randomFrom(bank.names);
                if (Math.random() < 0.3) {
                    name += ' the ' + randomFrom(['Corruptor', 'Defiler', 'Destroyer', 'Tempter', 'Deceiver']);
                }
                break;
            case 'lich':
                name = randomFrom(bank.titles) + ' ' + randomFrom(bank.names);
                break;
            case 'dragon':
                name = randomFrom(bank.prefixes) + ' ' + randomFrom(bank.names);
                break;
            default:
                name = ENEMY_TYPES[type].name;
        }
        attempts++;
    } while (usedNames.enemies.has(name) && attempts < maxAttempts);

    usedNames.enemies.add(name);
    return name;
}

// Generate item name
function generateItemName(type, rarity) {
    const bank = ITEM_NAME_BANKS[type];
    if (!bank) return 'Unknown Item';

    let name = '';
    let attempts = 0;
    const maxAttempts = 100;

    do {
        switch(type) {
            case 'weapon':
                if (rarity <= 1) {
                    name = randomFrom(bank.bases);
                } else if (rarity <= 2) {
                    name = randomFrom(bank.prefixes) + ' ' + randomFrom(bank.bases);
                } else {
                    name = randomFrom(bank.prefixes) + ' ' + randomFrom(bank.bases) + ' ' + randomFrom(bank.suffixes);
                }
                break;
            case 'armor':
                if (rarity <= 1) {
                    name = randomFrom(bank.bases);
                } else if (rarity <= 2) {
                    name = randomFrom(bank.prefixes) + ' ' + randomFrom(bank.bases);
                } else {
                    name = randomFrom(bank.prefixes) + ' ' + randomFrom(bank.bases) + ' ' + randomFrom(bank.suffixes);
                }
                break;
            case 'ring':
                name = randomFrom(bank.prefixes) + ' ' + randomFrom(bank.descriptors);
                break;
            case 'potion':
                name = randomFrom(bank.types) + ' ' + randomFrom(bank.descriptors);
                break;
            default:
                name = 'Mysterious ' + type;
        }
        attempts++;
    } while (usedNames.items.has(name) && attempts < maxAttempts);

    usedNames.items.add(name);
    return name;
}

// Generate level name
function generateLevelName() {
    const patterns = [
        () => randomFrom(LEVEL_NAME_BANKS.numbers) + ' ' + randomFrom(LEVEL_NAME_BANKS.nouns1) + ' ' + randomFrom(LEVEL_NAME_BANKS.verbs),
        () => randomFrom(LEVEL_NAME_BANKS.articles) + ' ' + randomFrom(LEVEL_NAME_BANKS.adjectives) + ' ' + randomFrom(LEVEL_NAME_BANKS.nouns2),
        () => randomFrom(LEVEL_NAME_BANKS.possessiveNouns) + "'s " + randomFrom(LEVEL_NAME_BANKS.locations),
        () => randomFrom(LEVEL_NAME_BANKS.phrases)
    ];

    let name = '';
    let attempts = 0;
    const maxAttempts = 50;

    do {
        const pattern = randomFrom(patterns);
        name = pattern();
        attempts++;
    } while (usedNames.levels.has(name) && attempts < maxAttempts);

    usedNames.levels.add(name);
    return name;
}

// ===== END NAME GENERATION SYSTEM =====

// Game configuration
const GAME_WIDTH = 60;
const GAME_HEIGHT = 30;
const WALL_CHARS = ['█', '▓', '▒', '░', '■'];  // Different wall textures for heightmap
const FLOOR_CHARS = ['.', ',', '`', '\''];
const PLAYER_CHAR = '@';
const STAIRS_CHAR = '>';
const CHALICE_CHAR = '☆';
const CHEST_CHAR = '□';
const MAX_FLOORS = 20;

// Difficulty system (0 = normal, 10 = mega hard)
let difficultyLevel = 0;
let difficultyMultipliers = {
    enemyHP: 1.0,
    enemyAttack: 1.0,
    enemyCount: 1.0,
    chestCount: 1.0,
    xpReward: 1.0
};

// Enemy definitions with difficulty tiers
const ENEMY_TYPES = {
    rat: { char: 'r', name: 'Rat', hp: 3, attack: 1, xp: 5, color: 'enemy-rat', minFloor: 1, maxFloor: 5 },
    kobold: { char: 'k', name: 'Kobold', hp: 6, attack: 2, xp: 8, color: 'enemy-kobold', minFloor: 1, maxFloor: 8 },
    goblin: { char: 'g', name: 'Goblin', hp: 8, attack: 3, xp: 10, color: 'enemy-goblin', minFloor: 2, maxFloor: 10 },
    spider: { char: 's', name: 'Spider', hp: 7, attack: 3, xp: 12, color: 'enemy-spider', minFloor: 3, maxFloor: 10 },
    skeleton: { char: 'S', name: 'Skeleton', hp: 12, attack: 4, xp: 15, color: 'enemy-skeleton', minFloor: 4, maxFloor: 12 },
    orc: { char: 'o', name: 'Orc', hp: 15, attack: 5, xp: 18, color: 'enemy-orc', minFloor: 5, maxFloor: 14 },
    ogre: { char: 'O', name: 'Ogre', hp: 20, attack: 6, xp: 25, color: 'enemy-ogre', minFloor: 6, maxFloor: 15 },
    wraith: { char: 'W', name: 'Wraith', hp: 18, attack: 7, xp: 30, color: 'enemy-wraith', minFloor: 8, maxFloor: 16 },
    troll: { char: 'T', name: 'Troll', hp: 30, attack: 8, xp: 35, color: 'enemy-troll', minFloor: 10, maxFloor: 18 },
    minotaur: { char: 'M', name: 'Minotaur', hp: 35, attack: 9, xp: 40, color: 'enemy-minotaur', minFloor: 12, maxFloor: 19 },
    demon: { char: 'D', name: 'Demon', hp: 40, attack: 10, xp: 50, color: 'enemy-demon', minFloor: 14, maxFloor: 20 },
    lich: { char: 'L', name: 'Lich', hp: 45, attack: 12, xp: 60, color: 'enemy-lich', minFloor: 16, maxFloor: 20 },
    dragon: { char: 'X', name: 'Dragon', hp: 60, attack: 15, xp: 100, color: 'enemy-dragon', minFloor: 18, maxFloor: 20 }
};

// Item definitions (names will be generated, these are templates)
const WEAPON_TYPES = [
    { name: 'Weapon', attack: 2, rarity: 1 },
    { name: 'Weapon', attack: 3, rarity: 1 },
    { name: 'Weapon', attack: 4, rarity: 1 },
    { name: 'Weapon', attack: 5, rarity: 2 },
    { name: 'Weapon', attack: 6, rarity: 2 },
    { name: 'Weapon', attack: 7, rarity: 2 },
    { name: 'Weapon', attack: 8, rarity: 2 },
    { name: 'Weapon', attack: 9, rarity: 3 },
    { name: 'Weapon', attack: 10, rarity: 3 },
    { name: 'Weapon', attack: 11, rarity: 3 },
    { name: 'Weapon', attack: 12, rarity: 3 },
    { name: 'Weapon', attack: 13, rarity: 3 },
    { name: 'Weapon', attack: 14, rarity: 4 },
    { name: 'Weapon', attack: 15, rarity: 4 },
    { name: 'Weapon', attack: 16, rarity: 4 },
    { name: 'Weapon', attack: 17, rarity: 4 },
    { name: 'Weapon', attack: 18, rarity: 4 },
    { name: 'Weapon', attack: 19, rarity: 4 },
    { name: 'Weapon', attack: 20, rarity: 4 },
    { name: 'Weapon', attack: 22, rarity: 4 }
];

const ARMOR_TYPES = [
    { name: 'Armor', defense: 1, hp: 5, rarity: 1 },
    { name: 'Armor', defense: 1, hp: 8, rarity: 1 },
    { name: 'Armor', defense: 2, hp: 10, rarity: 1 },
    { name: 'Armor', defense: 2, hp: 12, rarity: 2 },
    { name: 'Armor', defense: 3, hp: 14, rarity: 2 },
    { name: 'Armor', defense: 3, hp: 16, rarity: 2 },
    { name: 'Armor', defense: 4, hp: 18, rarity: 2 },
    { name: 'Armor', defense: 4, hp: 20, rarity: 3 },
    { name: 'Armor', defense: 5, hp: 22, rarity: 3 },
    { name: 'Armor', defense: 5, hp: 24, rarity: 3 },
    { name: 'Armor', defense: 6, hp: 26, rarity: 3 },
    { name: 'Armor', defense: 6, hp: 28, rarity: 3 },
    { name: 'Armor', defense: 7, hp: 30, rarity: 4 },
    { name: 'Armor', defense: 7, hp: 32, rarity: 4 },
    { name: 'Armor', defense: 8, hp: 34, rarity: 4 },
    { name: 'Armor', defense: 8, hp: 36, rarity: 4 },
    { name: 'Armor', defense: 9, hp: 38, rarity: 4 },
    { name: 'Armor', defense: 9, hp: 40, rarity: 4 },
    { name: 'Armor', defense: 10, hp: 42, rarity: 4 },
    { name: 'Armor', defense: 10, hp: 45, rarity: 4 }
];

const RING_TYPES = [
    { name: 'Ring', effect: 'attack', value: 2, rarity: 2 },
    { name: 'Ring', effect: 'attack', value: 3, rarity: 2 },
    { name: 'Ring', effect: 'attack', value: 4, rarity: 3 },
    { name: 'Ring', effect: 'attack', value: 5, rarity: 3 },
    { name: 'Ring', effect: 'attack', value: 6, rarity: 3 },
    { name: 'Ring', effect: 'attack', value: 7, rarity: 4 },
    { name: 'Ring', effect: 'attack', value: 8, rarity: 4 },
    { name: 'Ring', effect: 'defense', value: 2, rarity: 2 },
    { name: 'Ring', effect: 'defense', value: 3, rarity: 2 },
    { name: 'Ring', effect: 'defense', value: 4, rarity: 3 },
    { name: 'Ring', effect: 'defense', value: 5, rarity: 4 },
    { name: 'Ring', effect: 'hp', value: 10, rarity: 2 },
    { name: 'Ring', effect: 'hp', value: 15, rarity: 2 },
    { name: 'Ring', effect: 'hp', value: 20, rarity: 3 },
    { name: 'Ring', effect: 'hp', value: 25, rarity: 3 },
    { name: 'Ring', effect: 'hp', value: 30, rarity: 4 },
    { name: 'Ring', effect: 'regen', value: 1, rarity: 3 },
    { name: 'Ring', effect: 'regen', value: 2, rarity: 3 },
    { name: 'Ring', effect: 'regen', value: 3, rarity: 4 },
    { name: 'Ring', effect: 'regen', value: 4, rarity: 4 }
];

const POTION_TYPES = [
    { name: 'Potion', effect: 'heal', value: 15, rarity: 1 },
    { name: 'Potion', effect: 'heal', value: 20, rarity: 1 },
    { name: 'Potion', effect: 'heal', value: 25, rarity: 1 },
    { name: 'Potion', effect: 'heal', value: 30, rarity: 2 },
    { name: 'Potion', effect: 'heal', value: 35, rarity: 2 },
    { name: 'Potion', effect: 'heal', value: 40, rarity: 2 },
    { name: 'Potion', effect: 'heal', value: 50, rarity: 2 },
    { name: 'Potion', effect: 'heal', value: 60, rarity: 3 },
    { name: 'Potion', effect: 'heal', value: 70, rarity: 3 },
    { name: 'Potion', effect: 'heal', value: 80, rarity: 3 },
    { name: 'Potion', effect: 'attack', value: 2, rarity: 2 },
    { name: 'Potion', effect: 'attack', value: 3, rarity: 2 },
    { name: 'Potion', effect: 'attack', value: 4, rarity: 2 },
    { name: 'Potion', effect: 'attack', value: 5, rarity: 3 },
    { name: 'Potion', effect: 'attack', value: 6, rarity: 3 },
    { name: 'Potion', effect: 'attack', value: 7, rarity: 3 },
    { name: 'Potion', effect: 'defense', value: 2, rarity: 2 },
    { name: 'Potion', effect: 'defense', value: 3, rarity: 3 },
    { name: 'Potion', effect: 'defense', value: 4, rarity: 3 },
    { name: 'Potion', effect: 'fullheal', value: 0, rarity: 4 }
];

// Game state
let gameMap = [];
let floorVariants = [];
let wallHeightMap = [];
let enemies = [];
let chests = [];
let stairs = null;
let chalice = null;
let currentFloor = 1;
let levelName = '';
let gameWon = false;
let gameStarted = false;
let player = {
    x: 0,
    y: 0,
    hp: 30,
    maxHp: 30,
    baseAttack: 5,
    baseDefense: 0,
    attack: 5,
    defense: 0,
    xp: 0,
    level: 1,
    inventory: {
        weapon: null,
        armor: null,
        ring: null,
        potion: null
    }
};
let gameOver = false;
let messageLog = [];
let showingChest = false;
let currentChest = null;

// Calculate difficulty multipliers based on level
function calculateDifficultyMultipliers() {
    const d = difficultyLevel / 10; // 0.0 to 1.0

    difficultyMultipliers.enemyHP = 1.0 + (d * 1.5);        // 1.0x to 2.5x
    difficultyMultipliers.enemyAttack = 1.0 + (d * 1.0);   // 1.0x to 2.0x
    difficultyMultipliers.enemyCount = 1.0 + (d * 0.5);    // 1.0x to 1.5x
    difficultyMultipliers.chestCount = 1.0 - (d * 0.3);    // 1.0x to 0.7x
    difficultyMultipliers.xpReward = 1.0 + (d * 0.5);      // 1.0x to 1.5x (reward for harder)
}

// Initialize the game
function init() {
    if (!gameStarted) {
        renderDifficultySelection();
        if (!document.querySelector('[data-input-setup]')) {
            setupInput();
            document.body.setAttribute('data-input-setup', 'true');
        }
    } else {
        generateLevel();
        render();
    }
}

// Generate a complete level
function generateLevel() {
    // Generate a unique name for this level
    levelName = generateLevelName();

    let attempts = 0;
    let validLevel = false;

    while (!validLevel && attempts < 50) {
        generateCave();
        generateFloorVariants();
        generateWallHeightMap();

        // Get all accessible floor tiles
        const accessibleTiles = getAccessibleTiles();

        if (accessibleTiles.length > 100) { // Ensure enough space
            // Place player
            placePlayerOnAccessibleTile(accessibleTiles);

            // Place stairs or chalice
            if (currentFloor < MAX_FLOORS) {
                stairs = placeObjectOnAccessibleTile(accessibleTiles, [player]);
            } else {
                chalice = placeObjectOnAccessibleTile(accessibleTiles, [player]);
            }

            // Spawn enemies
            spawnEnemies(accessibleTiles);

            // Spawn chests
            spawnChests(accessibleTiles);

            // Verify everything is accessible
            if (verifyAllAccessible()) {
                validLevel = true;
            }
        }
        attempts++;
    }

    if (!validLevel) {
        // Fallback: simpler level
        generateSimpleLevel();
    }

    if (currentFloor === 1 && !player.inventory.weapon) {
        initializePlayerInventory();
        addMessage('Welcome to the dungeon! Descend 20 floors to find the chalice!');
    } else {
        addMessage(`Floor ${currentFloor} - ${enemies.length} enemies lurk nearby...`);
    }
}

// Initialize player with starting items
function initializePlayerInventory() {
    player.inventory.weapon = generateItem('weapon', 1);
    player.inventory.armor = generateItem('armor', 1);
    player.inventory.potion = generateItem('potion', 1);
    updatePlayerStats();
}

// Generate a cave using cellular automata
function generateCave() {
    gameMap = [];
    for (let y = 0; y < GAME_HEIGHT; y++) {
        gameMap[y] = [];
        for (let x = 0; x < GAME_WIDTH; x++) {
            if (x === 0 || y === 0 || x === GAME_WIDTH - 1 || y === GAME_HEIGHT - 1) {
                gameMap[y][x] = 'wall';
            } else {
                gameMap[y][x] = Math.random() < 0.45 ? 'wall' : 'floor';
            }
        }
    }

    for (let iteration = 0; iteration < 4; iteration++) {
        gameMap = smoothCave(gameMap);
    }
}

// Generate a simpler guaranteed-connected level
function generateSimpleLevel() {
    gameMap = [];
    for (let y = 0; y < GAME_HEIGHT; y++) {
        gameMap[y] = [];
        for (let x = 0; x < GAME_WIDTH; x++) {
            if (x === 0 || y === 0 || x === GAME_WIDTH - 1 || y === GAME_HEIGHT - 1) {
                gameMap[y][x] = 'wall';
            } else {
                gameMap[y][x] = 'floor';
            }
        }
    }

    generateFloorVariants();
    generateWallHeightMap();

    const allFloors = [];
    for (let y = 1; y < GAME_HEIGHT - 1; y++) {
        for (let x = 1; x < GAME_WIDTH - 1; x++) {
            allFloors.push({x, y});
        }
    }

    placePlayerOnAccessibleTile(allFloors);

    if (currentFloor < MAX_FLOORS) {
        stairs = placeObjectOnAccessibleTile(allFloors, [player]);
    } else {
        chalice = placeObjectOnAccessibleTile(allFloors, [player]);
    }

    spawnEnemies(allFloors);
    spawnChests(allFloors);
}

// Generate floor texture variants
function generateFloorVariants() {
    floorVariants = [];
    for (let y = 0; y < GAME_HEIGHT; y++) {
        floorVariants[y] = [];
        for (let x = 0; x < GAME_WIDTH; x++) {
            floorVariants[y][x] = FLOOR_CHARS[Math.floor(Math.random() * FLOOR_CHARS.length)];
        }
    }
}

// Generate wall heightmap for texture variation
function generateWallHeightMap() {
    wallHeightMap = [];

    // Create noisy heightmap for rocky texture
    const scale = 0.2;
    for (let y = 0; y < GAME_HEIGHT; y++) {
        wallHeightMap[y] = [];
        for (let x = 0; x < GAME_WIDTH; x++) {
            // Base smooth noise using multiple frequencies
            let value = 0;
            value += Math.sin(x * scale) * Math.cos(y * scale);
            value += Math.sin(x * scale * 2) * Math.cos(y * scale * 2) * 0.5;
            value += Math.sin(x * scale * 0.5) * Math.cos(y * scale * 0.5) * 1.5;

            // Add significant random noise for roughness (30% influence)
            const randomNoise = (Math.random() - 0.5) * 2; // -1 to 1
            value = value * 0.7 + randomNoise * 0.3;

            // Add small-scale detail noise for rocky texture
            const detailNoise = (Math.random() - 0.5) * 1.5;
            value += detailNoise * 0.4;

            // Normalize to 0-4 range for WALL_CHARS indices
            value = (value + 3) / 6; // Roughly normalize
            value = Math.max(0, Math.min(0.99, value)); // Clamp 0-0.99
            wallHeightMap[y][x] = Math.floor(value * WALL_CHARS.length);
        }
    }
}

// Smooth the cave
function smoothCave(map) {
    const newMap = [];
    for (let y = 0; y < GAME_HEIGHT; y++) {
        newMap[y] = [];
        for (let x = 0; x < GAME_WIDTH; x++) {
            const wallCount = countWallNeighbors(map, x, y);
            if (x === 0 || y === 0 || x === GAME_WIDTH - 1 || y === GAME_HEIGHT - 1) {
                newMap[y][x] = 'wall';
            } else if (wallCount >= 5) {
                newMap[y][x] = 'wall';
            } else if (wallCount <= 3) {
                newMap[y][x] = 'floor';
            } else {
                newMap[y][x] = map[y][x];
            }
        }
    }
    return newMap;
}

// Count wall neighbors
function countWallNeighbors(map, x, y) {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= GAME_WIDTH || ny >= GAME_HEIGHT) {
                count++;
            } else if (map[ny][nx] === 'wall') {
                count++;
            }
        }
    }
    return count;
}

// Get all accessible floor tiles using flood fill
function getAccessibleTiles() {
    // Find a starting floor tile
    let startX = -1, startY = -1;
    for (let y = 1; y < GAME_HEIGHT - 1 && startX === -1; y++) {
        for (let x = 1; x < GAME_WIDTH - 1 && startX === -1; x++) {
            if (gameMap[y][x] === 'floor') {
                startX = x;
                startY = y;
            }
        }
    }

    if (startX === -1) return [];

    // Flood fill to find all connected tiles
    const visited = Array(GAME_HEIGHT).fill(null).map(() => Array(GAME_WIDTH).fill(false));
    const accessible = [];
    const queue = [{x: startX, y: startY}];
    visited[startY][startX] = true;

    while (queue.length > 0) {
        const pos = queue.shift();
        accessible.push(pos);

        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (Math.abs(dx) + Math.abs(dy) !== 1) continue; // Only cardinal directions
                const nx = pos.x + dx;
                const ny = pos.y + dy;
                if (nx >= 0 && ny >= 0 && nx < GAME_WIDTH && ny < GAME_HEIGHT &&
                    !visited[ny][nx] && gameMap[ny][nx] === 'floor') {
                    visited[ny][nx] = true;
                    queue.push({x: nx, y: ny});
                }
            }
        }
    }

    return accessible;
}

// Place player on accessible tile
function placePlayerOnAccessibleTile(tiles) {
    if (tiles.length === 0) return;
    const tile = tiles[Math.floor(Math.random() * tiles.length)];
    player.x = tile.x;
    player.y = tile.y;
}

// Place an object on accessible tile away from existing objects
function placeObjectOnAccessibleTile(tiles, existingObjects = []) {
    if (tiles.length === 0) return null;

    // Try to place far from existing objects
    let bestTile = null;
    let bestDistance = 0;

    for (let i = 0; i < Math.min(20, tiles.length); i++) {
        const tile = tiles[Math.floor(Math.random() * tiles.length)];
        let minDist = Infinity;

        for (const obj of existingObjects) {
            const dist = Math.abs(tile.x - obj.x) + Math.abs(tile.y - obj.y);
            minDist = Math.min(minDist, dist);
        }

        if (minDist > bestDistance) {
            bestDistance = minDist;
            bestTile = tile;
        }
    }

    return bestTile || tiles[0];
}

// Spawn enemies based on floor difficulty
function spawnEnemies(accessibleTiles) {
    enemies = [];
    const baseCount = 5 + Math.floor(currentFloor / 2);
    const adjustedCount = Math.floor(baseCount * difficultyMultipliers.enemyCount);
    const enemyCount = adjustedCount + Math.floor(Math.random() * 5);

    // Get valid enemy types for this floor
    const validTypes = Object.entries(ENEMY_TYPES).filter(([key, type]) =>
        currentFloor >= type.minFloor && currentFloor <= type.maxFloor
    );

    if (validTypes.length === 0) return;

    const occupied = [player, stairs, chalice].filter(o => o);

    for (let i = 0; i < enemyCount && accessibleTiles.length > occupied.length; i++) {
        const [typeKey, template] = validTypes[Math.floor(Math.random() * validTypes.length)];
        const tile = placeObjectOnAccessibleTile(accessibleTiles, occupied);

        if (tile) {
            // Apply difficulty multipliers
            const scaledHP = Math.ceil(template.hp * difficultyMultipliers.enemyHP);
            const scaledAttack = Math.ceil(template.attack * difficultyMultipliers.enemyAttack);

            const enemy = {
                x: tile.x,
                y: tile.y,
                char: template.char,
                name: generateEnemyName(typeKey),
                hp: scaledHP,
                maxHp: scaledHP,
                attack: scaledAttack,
                xp: Math.ceil(template.xp * difficultyMultipliers.xpReward),
                color: template.color,
                colorVariant: Math.floor(Math.random() * 3)
            };
            enemies.push(enemy);
            occupied.push(enemy);
        }
    }
}

// Spawn chests
function spawnChests(accessibleTiles) {
    chests = [];
    // Reduced base count: 1-2 chests (50% of original 2-4)
    const baseChestCount = 1 + Math.floor(Math.random() * 2);
    const chestCount = Math.max(1, Math.floor(baseChestCount * difficultyMultipliers.chestCount));
    const occupied = [player, stairs, chalice, ...enemies].filter(o => o);

    for (let i = 0; i < chestCount && accessibleTiles.length > occupied.length; i++) {
        const tile = placeObjectOnAccessibleTile(accessibleTiles, occupied);
        if (tile) {
            const chest = {
                x: tile.x,
                y: tile.y,
                opened: false,
                item: generateItemForFloor()
            };
            chests.push(chest);
            occupied.push(chest);
        }
    }
}

// Verify all objects are accessible
function verifyAllAccessible() {
    const accessible = getAccessibleTiles();
    const accessibleSet = new Set(accessible.map(t => `${t.x},${t.y}`));

    // Check player
    if (!accessibleSet.has(`${player.x},${player.y}`)) return false;

    // Check stairs/chalice
    if (stairs && !accessibleSet.has(`${stairs.x},${stairs.y}`)) return false;
    if (chalice && !accessibleSet.has(`${chalice.x},${chalice.y}`)) return false;

    // Check all enemies
    for (const enemy of enemies) {
        if (!accessibleSet.has(`${enemy.x},${enemy.y}`)) return false;
    }

    // Check all chests
    for (const chest of chests) {
        if (!accessibleSet.has(`${chest.x},${chest.y}`)) return false;
    }

    return true;
}

// Generate item based on floor
function generateItemForFloor() {
    const itemType = ['weapon', 'armor', 'ring', 'potion'][Math.floor(Math.random() * 4)];
    const maxRarity = Math.min(4, 1 + Math.floor(currentFloor / 5));
    return generateItem(itemType, maxRarity);
}

// Generate a random item
function generateItem(type, maxRarity) {
    let pool;
    switch(type) {
        case 'weapon': pool = WEAPON_TYPES; break;
        case 'armor': pool = ARMOR_TYPES; break;
        case 'ring': pool = RING_TYPES; break;
        case 'potion': pool = POTION_TYPES; break;
        default: return null;
    }

    const validItems = pool.filter(item => item.rarity <= maxRarity);
    if (validItems.length === 0) return null;

    const template = validItems[Math.floor(Math.random() * validItems.length)];
    const item = { ...template, type };

    // Generate a unique name for this item
    item.name = generateItemName(type, template.rarity);

    return item;
}

// Update player stats based on equipment
function updatePlayerStats() {
    player.attack = player.baseAttack;
    player.defense = player.baseDefense;
    let maxHpBonus = 0;

    if (player.inventory.weapon) {
        player.attack += player.inventory.weapon.attack;
    }
    if (player.inventory.armor) {
        player.defense += player.inventory.armor.defense;
        maxHpBonus += player.inventory.armor.hp;
    }
    if (player.inventory.ring) {
        if (player.inventory.ring.effect === 'attack') player.attack += player.inventory.ring.value;
        if (player.inventory.ring.effect === 'defense') player.defense += player.inventory.ring.value;
        if (player.inventory.ring.effect === 'hp') maxHpBonus += player.inventory.ring.value;
    }

    const oldMaxHp = player.maxHp;
    player.maxHp = 30 + (player.level - 1) * 5 + maxHpBonus;

    // Adjust current HP proportionally
    if (oldMaxHp > 0) {
        const hpRatio = player.hp / oldMaxHp;
        player.hp = Math.floor(player.maxHp * hpRatio);
    }
}

// Check if a position is valid
function isValidPosition(x, y) {
    if (x < 0 || y < 0 || x >= GAME_WIDTH || y >= GAME_HEIGHT) return false;
    return gameMap[y][x] === 'floor';
}

// Check if position is occupied
function isPositionOccupied(x, y, includeChests = false) {
    if (player.x === x && player.y === y) return true;
    if (enemies.some(e => e.x === x && e.y === y)) return true;
    if (includeChests && chests.some(c => c.x === x && c.y === y)) return true;
    return false;
}

// Get enemy at position
function getEnemyAt(x, y) {
    return enemies.find(e => e.x === x && e.y === y);
}

// Get chest at position
function getChestAt(x, y) {
    return chests.find(c => c.x === x && c.y === y);
}

// Add message to log
function addMessage(text) {
    messageLog.push(text);
    if (messageLog.length > 6) {
        messageLog.shift();
    }
}

// Combat system with defense
function attack(attacker, defender) {
    let damage = attacker.attack + Math.floor(Math.random() * 3) - 1;

    // Apply defender's defense
    if (defender === player) {
        damage = Math.max(1, damage - player.defense);
    }

    defender.hp -= damage;
    return damage;
}

// Grant XP and check for level up
function gainXP(amount) {
    player.xp += amount;
    const xpNeeded = player.level * 20;

    if (player.xp >= xpNeeded) {
        player.xp -= xpNeeded;
        player.level++;
        player.baseAttack += 2;
        player.hp = Math.min(player.maxHp, player.hp + 10); // Partial heal
        updatePlayerStats();
        addMessage(`LEVEL UP! You are now level ${player.level}!`);
    }
}

// Descend stairs
function descendStairs() {
    if (currentFloor >= MAX_FLOORS) return;

    currentFloor++;
    addMessage(`Descending to floor ${currentFloor}...`);
    generateLevel();
}

// Collect chalice (win condition)
function collectChalice() {
    gameWon = true;
    addMessage('YOU FOUND THE CHALICE! YOU WIN!');
}

// Use potion
function usePotion() {
    if (!player.inventory.potion) {
        addMessage('No potion to use!');
        return false;
    }

    const potion = player.inventory.potion;
    switch(potion.effect) {
        case 'heal':
            player.hp = Math.min(player.maxHp, player.hp + potion.value);
            addMessage(`Used ${potion.name}! Restored ${potion.value} HP.`);
            break;
        case 'fullheal':
            player.hp = player.maxHp;
            addMessage(`Used ${potion.name}! Fully restored!`);
            break;
        case 'attack':
            player.baseAttack += potion.value;
            updatePlayerStats();
            addMessage(`Used ${potion.name}! Attack increased!`);
            break;
        case 'defense':
            player.baseDefense += potion.value;
            updatePlayerStats();
            addMessage(`Used ${potion.name}! Defense increased!`);
            break;
    }

    player.inventory.potion = null;
    return true;
}

// Open chest
function openChest(chest) {
    if (chest.opened) {
        addMessage('This chest is empty.');
        return;
    }

    currentChest = chest;
    showingChest = true;
    render();
}

// Take item from chest
function takeItem(slot) {
    if (!currentChest || !currentChest.item) return;

    const newItem = currentChest.item;
    const oldItem = player.inventory[slot];

    player.inventory[slot] = newItem;
    updatePlayerStats();

    // Mark chest as opened and remove item
    currentChest.opened = true;
    currentChest.item = null;

    if (oldItem) {
        addMessage(`Swapped ${oldItem.name} for ${newItem.name}`);
    } else {
        addMessage(`Took ${newItem.name}`);
    }

    closeChest();
}

// Leave item in chest
function closeChest() {
    // Always mark current chest as opened when closing
    if (currentChest) {
        currentChest.opened = true;
        if (currentChest.item) {
            currentChest.item = null;
            addMessage('You left the item behind.');
        }
    }

    currentChest = null;
    showingChest = false;
    render();
}

// Render the game
function render() {
    if (gameWon) {
        renderVictory();
        return;
    }

    if (gameOver) {
        renderGameOver();
        return;
    }

    if (showingChest) {
        renderChestUI();
        return;
    }

    const canvas = document.getElementById('game-canvas');
    let html = '';

    for (let y = 0; y < GAME_HEIGHT; y++) {
        for (let x = 0; x < GAME_WIDTH; x++) {
            const enemy = getEnemyAt(x, y);
            const chest = getChestAt(x, y);

            if (x === player.x && y === player.y) {
                const healthPercent = player.hp / player.maxHp;
                const playerColor = healthPercent > 0.6 ? 'player-healthy' :
                                   healthPercent > 0.3 ? 'player-injured' : 'player-critical';
                html += `<span class="${playerColor}">${PLAYER_CHAR}</span>`;
            } else if (chalice && x === chalice.x && y === chalice.y) {
                html += `<span class="chalice">${CHALICE_CHAR}</span>`;
            } else if (stairs && x === stairs.x && y === stairs.y) {
                html += `<span class="stairs">${STAIRS_CHAR}</span>`;
            } else if (chest) {
                const chestClass = chest.opened ? 'chest-opened' : 'chest-closed';
                html += `<span class="${chestClass}">${CHEST_CHAR}</span>`;
            } else if (enemy) {
                const colorClass = `${enemy.color}-${enemy.colorVariant}`;
                html += `<span class="${colorClass}">${enemy.char}</span>`;
            } else if (gameMap[y][x] === 'wall') {
                const heightIndex = wallHeightMap[y][x];
                const wallChar = WALL_CHARS[heightIndex];
                html += `<span class="wall-${heightIndex}">${wallChar}</span>`;
            } else {
                const floorChar = floorVariants[y][x];
                const floorVariant = (x * y) % 4;
                html += `<span class="floor-${floorVariant}">${floorChar}</span>`;
            }
        }
        html += '\n';
    }

    canvas.innerHTML = html;
    renderStatus();
}

// Render status panel
function renderStatus() {
    const statusEl = document.getElementById('status-panel');
    const xpNeeded = player.level * 20;

    // Color code HP based on percentage
    const hpPercent = player.hp / player.maxHp;
    let hpClass = 'hp-full';
    if (hpPercent <= 0.25) hpClass = 'hp-critical';
    else if (hpPercent <= 0.5) hpClass = 'hp-low';
    else if (hpPercent <= 0.75) hpClass = 'hp-medium';

    // Color code XP based on percentage
    const xpPercent = player.xp / xpNeeded;
    let xpClass = 'xp-low';
    if (xpPercent >= 0.75) xpClass = 'xp-high';
    else if (xpPercent >= 0.5) xpClass = 'xp-medium';

    let html = `
        <div class="stat-row"><span class="stat-label">Floor:</span> ${currentFloor}/${MAX_FLOORS}</div>
        <div class="stat-row" style="color: #888; font-size: 12px; font-style: italic; margin-left: 10px;">"${levelName}"</div>
        <div class="stat-row"><span class="stat-label">Level:</span> ${player.level}</div>
        <div class="stat-row"><span class="stat-label">HP:</span> <span class="${hpClass}">${player.hp}/${player.maxHp}</span></div>
        <div class="stat-row"><span class="stat-label">XP:</span> <span class="${xpClass}">${player.xp}/${xpNeeded}</span></div>
        <div class="stat-row"><span class="stat-label">Attack:</span> ${player.attack}</div>
        <div class="stat-row"><span class="stat-label">Defense:</span> ${player.defense}</div>
        <div class="stat-row"><span class="stat-label">Enemies:</span> ${enemies.length}</div>

        <div class="inventory-section">
            <div class="inventory-title">INVENTORY</div>
            <div class="inventory-item">Weapon: ${player.inventory.weapon ? player.inventory.weapon.name : 'None'}</div>
            <div class="inventory-item">Armor: ${player.inventory.armor ? player.inventory.armor.name : 'None'}</div>
            <div class="inventory-item">Ring: ${player.inventory.ring ? player.inventory.ring.name : 'None'}</div>
            <div class="inventory-item">Potion: ${player.inventory.potion ? player.inventory.potion.name : 'None'}</div>
        </div>
    `;

    if (messageLog.length > 0) {
        html += '<div class="message-log">';
        messageLog.forEach(msg => {
            html += `<div class="message">${msg}</div>`;
        });
        html += '</div>';
    }

    statusEl.innerHTML = html;
}

// Render chest UI
function renderChestUI() {
    const canvas = document.getElementById('game-canvas');

    // Safety check
    if (!currentChest || !currentChest.item) {
        showingChest = false;
        render();
        return;
    }

    const item = currentChest.item;
    const BOX_WIDTH = 36;

    // Helper to create a properly padded line
    const padLine = (text) => {
        if (text.length >= BOX_WIDTH) {
            return text.substring(0, BOX_WIDTH);
        }
        return text + ' '.repeat(BOX_WIDTH - text.length);
    };

    let itemStats = '';
    if (item.type === 'weapon') itemStats = `Attack: +${item.attack}`;
    else if (item.type === 'armor') itemStats = `Defense: +${item.defense}, HP: +${item.hp}`;
    else if (item.type === 'ring') itemStats = `${item.effect}: +${item.value}`;
    else if (item.type === 'potion') itemStats = `Effect: ${item.effect}`;

    const currentItem = player.inventory[item.type];
    let currentStats = '';
    if (currentItem) {
        if (currentItem.type === 'weapon') currentStats = `Attack: +${currentItem.attack}`;
        else if (currentItem.type === 'armor') currentStats = `Defense: +${currentItem.defense}, HP: +${currentItem.hp}`;
        else if (currentItem.type === 'ring') currentStats = `${currentItem.effect}: +${currentItem.value}`;
        else if (currentItem.type === 'potion') currentStats = `Effect: ${currentItem.effect}`;
    }

    const foundLine = padLine(`  Found: ${item.name}`);
    const typeLine = padLine(`  Type: ${item.type}`);
    const statsLine = padLine(`  ${itemStats}`);
    const currentLine = padLine(`  Current ${item.type}: ${currentItem ? currentItem.name : 'None'}`);
    const currentStatsLine = currentItem ? padLine(`  ${currentStats}`) : '';

    canvas.innerHTML = `
        <div class="chest-ui">
            ╔════════════════════════════════════╗
            ║${padLine('          CHEST OPENED!')}║
            ╠════════════════════════════════════╣
            ║${padLine('')}║
            ║${foundLine}║
            ║${typeLine}║
            ║${statsLine}║
            ║${padLine('')}║
            ║${currentLine}║
            ${currentItem ? `║${currentStatsLine}║` : ''}
            ║${padLine('')}║
            ║${padLine('  [T] Take / Swap')}║
            ║${padLine('  [L] Leave it')}║
            ║${padLine('')}║
            ╚════════════════════════════════════╝
        </div>
    `;
}

// Render victory screen
function renderVictory() {
    const canvas = document.getElementById('game-canvas');
    const statusEl = document.getElementById('status-panel');

    canvas.innerHTML = `
        <div class="victory">
            ╔════════════════════════════════╗
            ║         VICTORY!               ║
            ║                                ║
            ║   You found the Chalice!       ║
            ║                                ║
            ║   Final Level: ${String(player.level).padStart(2, ' ')}              ║
            ║   Final Floor: ${String(currentFloor).padStart(2, ' ')}/${MAX_FLOORS}           ║
            ║                                ║
            ║   Press R to play again        ║
            ╚════════════════════════════════╝
        </div>
    `;

    statusEl.innerHTML = '<div class="victory-text">You are victorious!</div>';
}

// Render game over screen
function renderGameOver() {
    const canvas = document.getElementById('game-canvas');
    const statusEl = document.getElementById('status-panel');

    canvas.innerHTML = `
        <div class="game-over">
            ╔════════════════════════════════╗
            ║        GAME OVER               ║
            ║                                ║
            ║   You have died...             ║
            ║                                ║
            ║   Final Level: ${String(player.level).padStart(2, ' ')}              ║
            ║   Reached Floor: ${String(currentFloor).padStart(2, ' ')}/${MAX_FLOORS}         ║
            ║                                ║
            ║   Press R to restart           ║
            ╚════════════════════════════════╝
        </div>
    `;

    statusEl.innerHTML = '<div class="game-over-text">You were slain!</div>';
}

// Render difficulty selection screen
function renderDifficultySelection() {
    const canvas = document.getElementById('game-canvas');
    const statusEl = document.getElementById('status-panel');

    const BOX_WIDTH = 36;
    const padLine = (text) => {
        if (text.length >= BOX_WIDTH) {
            return text.substring(0, BOX_WIDTH);
        }
        return text + ' '.repeat(BOX_WIDTH - text.length);
    };

    const line1 = padLine('     ASCII ROGUELIKE DUNGEON');
    const line2 = padLine('   SELECT DIFFICULTY (0-10):');
    const line3 = padLine(`   Current: ${difficultyLevel}`);
    const line4 = padLine('   0 = Normal');
    const line5 = padLine('   5 = Hard');
    const line6 = padLine('   10 = Mega Hard');
    const line7 = padLine('   [↑/↓] Adjust | [Enter] Start');

    canvas.innerHTML = `
        <div class="difficulty-screen">
            ╔════════════════════════════════════╗
            ║${line1}║
            ╠════════════════════════════════════╣
            ║${padLine('')}║
            ║${line2}║
            ║${padLine('')}║
            ║${line3}║
            ║${padLine('')}║
            ║${line4}║
            ║${line5}║
            ║${line6}║
            ║${padLine('')}║
            ║${line7}║
            ║${padLine('')}║
            ╚════════════════════════════════════╝
        </div>
    `;

    const multipliers = `
        <div class="difficulty-info">
            <div class="difficulty-title">Difficulty ${difficultyLevel}</div>
            <div class="multiplier">Enemy HP: ${(difficultyMultipliers.enemyHP * 100).toFixed(0)}%</div>
            <div class="multiplier">Enemy Attack: ${(difficultyMultipliers.enemyAttack * 100).toFixed(0)}%</div>
            <div class="multiplier">Enemy Count: ${(difficultyMultipliers.enemyCount * 100).toFixed(0)}%</div>
            <div class="multiplier">Chest Count: ${(difficultyMultipliers.chestCount * 100).toFixed(0)}%</div>
            <div class="multiplier">XP Reward: ${(difficultyMultipliers.xpReward * 100).toFixed(0)}%</div>
        </div>
    `;

    statusEl.innerHTML = multipliers;
}

// Setup keyboard input
function setupInput() {
    document.addEventListener('keydown', handleInput);
}

// Handle keyboard input
function handleInput(event) {
    // Difficulty selection handling
    if (!gameStarted) {
        if (event.code === 'ArrowUp') {
            event.preventDefault();
            difficultyLevel = Math.min(10, difficultyLevel + 1);
            calculateDifficultyMultipliers();
            renderDifficultySelection();
        } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            difficultyLevel = Math.max(0, difficultyLevel - 1);
            calculateDifficultyMultipliers();
            renderDifficultySelection();
        } else if (event.code === 'Enter') {
            event.preventDefault();
            gameStarted = true;
            init();
        }
        return;
    }

    // Restart game
    if ((gameOver || gameWon) && event.code === 'KeyR') {
        event.preventDefault();
        restartGame();
        return;
    }

    if (gameOver || gameWon) return;

    // Chest UI handling
    if (showingChest) {
        // Safety check
        if (!currentChest || !currentChest.item) {
            showingChest = false;
            render();
            return;
        }

        if (event.code === 'KeyT') {
            event.preventDefault();
            takeItem(currentChest.item.type);
        } else if (event.code === 'KeyL') {
            event.preventDefault();
            closeChest();
        }
        return;
    }

    // Use potion
    if (event.code === 'KeyP') {
        event.preventDefault();
        if (usePotion()) {
            enemyTurns();
            render();
        }
        return;
    }

    // Interact with objects
    if (event.code === 'KeyE') {
        event.preventDefault();

        // Don't interact if already in chest UI
        if (showingChest) return;

        // Check for stairs
        if (stairs && player.x === stairs.x && player.y === stairs.y) {
            descendStairs();
            return;
        }

        // Check for chalice
        if (chalice && player.x === chalice.x && player.y === chalice.y) {
            collectChalice();
            render();
            return;
        }

        // Check for chest
        const chest = getChestAt(player.x, player.y);
        if (chest && !chest.opened) {
            openChest(chest);
            return;
        } else if (chest && chest.opened) {
            addMessage('This chest is empty.');
            return;
        }

        addMessage('Nothing to interact with here.');
        render();
        return;
    }

    // Movement
    const keyMap = {
        'Numpad7': { dx: -1, dy: -1 },
        'Numpad8': { dx: 0, dy: -1 },
        'Numpad9': { dx: 1, dy: -1 },
        'Numpad4': { dx: -1, dy: 0 },
        'Numpad5': { dx: 0, dy: 0 },
        'Numpad6': { dx: 1, dy: 0 },
        'Numpad1': { dx: -1, dy: 1 },
        'Numpad2': { dx: 0, dy: 1 },
        'Numpad3': { dx: 1, dy: 1 }
    };

    const direction = keyMap[event.code];
    if (direction) {
        event.preventDefault();
        movePlayer(direction.dx, direction.dy);
    }
}

// Restart the game
function restartGame() {
    gameOver = false;
    gameWon = false;
    gameStarted = false;
    messageLog = [];
    currentFloor = 1;
    showingChest = false;
    currentChest = null;
    player = {
        x: 0,
        y: 0,
        hp: 30,
        maxHp: 30,
        baseAttack: 5,
        baseDefense: 0,
        attack: 5,
        defense: 0,
        xp: 0,
        level: 1,
        inventory: {
            weapon: null,
            armor: null,
            ring: null,
            potion: null
        }
    };
    init();
}

// Move the player
function movePlayer(dx, dy) {
    if (gameOver || gameWon) return;

    const newX = player.x + dx;
    const newY = player.y + dy;

    // Check for enemy
    const enemy = getEnemyAt(newX, newY);
    if (enemy) {
        const damage = attack(player, enemy);
        addMessage(`You hit ${enemy.name} for ${damage} damage!`);

        if (enemy.hp <= 0) {
            addMessage(`You killed the ${enemy.name}!`);
            gainXP(enemy.xp);
            enemies = enemies.filter(e => e !== enemy);
        } else if (enemy.hp > 0) {
            const counterDamage = attack(enemy, player);
            addMessage(`${enemy.name} hits you for ${counterDamage} damage!`);

            if (player.hp <= 0) {
                gameOver = true;
                addMessage('You have died!');
            }
        }

        enemyTurns();
        render();
        return;
    }

    // Check collision with walls
    if (isValidPosition(newX, newY)) {
        player.x = newX;
        player.y = newY;

        // Check if standing on stairs/chalice/chest
        if (stairs && player.x === stairs.x && player.y === stairs.y) {
            addMessage('Press E to descend the stairs.');
        } else if (chalice && player.x === chalice.x && player.y === chalice.y) {
            addMessage('Press E to claim the Chalice!');
        } else {
            const chest = getChestAt(player.x, player.y);
            if (chest && !chest.opened) {
                addMessage('Press E to open the chest.');
            }
        }

        enemyTurns();
        render();
    }
}

// Enemy AI
function enemyTurns() {
    if (gameOver || gameWon) return;

    enemies.forEach(enemy => {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.abs(dx) + Math.abs(dy);

        if (distance > 10) return;

        let moveX = 0, moveY = 0;
        if (Math.abs(dx) > Math.abs(dy)) {
            moveX = dx > 0 ? 1 : -1;
        } else if (dy !== 0) {
            moveY = dy > 0 ? 1 : -1;
        }

        const targetX = enemy.x + moveX;
        const targetY = enemy.y + moveY;

        if (targetX === player.x && targetY === player.y) {
            const damage = attack(enemy, player);
            addMessage(`${enemy.name} hits you for ${damage} damage!`);

            if (player.hp <= 0) {
                gameOver = true;
                addMessage('You have died!');
            }
        } else if (isValidPosition(targetX, targetY) && !getEnemyAt(targetX, targetY) && !getChestAt(targetX, targetY)) {
            enemy.x = targetX;
            enemy.y = targetY;
        }
    });
}

// Start the game when the page loads
window.addEventListener('load', init);
