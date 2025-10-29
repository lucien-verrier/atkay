// Game configuration
const GAME_WIDTH = 60;
const GAME_HEIGHT = 30;
const WALL_CHAR = '#';
const FLOOR_CHARS = ['.', ',', '`', '\''];
const PLAYER_CHAR = '@';
const STAIRS_CHAR = '>';
const CHALICE_CHAR = '☆';
const CHEST_CHAR = '□';
const MAX_FLOORS = 20;

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

// Item definitions
const WEAPON_TYPES = [
    { name: 'Rusty Dagger', attack: 2, rarity: 1 },
    { name: 'Short Sword', attack: 4, rarity: 1 },
    { name: 'Iron Sword', attack: 6, rarity: 2 },
    { name: 'Steel Blade', attack: 8, rarity: 2 },
    { name: 'Enchanted Sword', attack: 10, rarity: 3 },
    { name: 'Flamebrand', attack: 12, rarity: 3 },
    { name: 'Dragon Slayer', attack: 15, rarity: 4 }
];

const ARMOR_TYPES = [
    { name: 'Cloth Armor', defense: 1, hp: 5, rarity: 1 },
    { name: 'Leather Armor', defense: 2, hp: 8, rarity: 1 },
    { name: 'Chainmail', defense: 3, hp: 12, rarity: 2 },
    { name: 'Plate Armor', defense: 4, hp: 15, rarity: 2 },
    { name: 'Enchanted Mail', defense: 5, hp: 20, rarity: 3 },
    { name: 'Dragon Scale', defense: 7, hp: 25, rarity: 4 }
];

const RING_TYPES = [
    { name: 'Ring of Strength', effect: 'attack', value: 3, rarity: 2 },
    { name: 'Ring of Protection', effect: 'defense', value: 2, rarity: 2 },
    { name: 'Ring of Vitality', effect: 'hp', value: 15, rarity: 2 },
    { name: 'Ring of Regeneration', effect: 'regen', value: 1, rarity: 3 },
    { name: 'Ring of Power', effect: 'attack', value: 5, rarity: 3 }
];

const POTION_TYPES = [
    { name: 'Health Potion', effect: 'heal', value: 20, rarity: 1 },
    { name: 'Greater Health Potion', effect: 'heal', value: 40, rarity: 2 },
    { name: 'Strength Potion', effect: 'attack', value: 3, rarity: 2 },
    { name: 'Defense Potion', effect: 'defense', value: 2, rarity: 2 },
    { name: 'Full Restore', effect: 'fullheal', value: 0, rarity: 3 }
];

// Game state
let gameMap = [];
let floorVariants = [];
let enemies = [];
let chests = [];
let stairs = null;
let chalice = null;
let currentFloor = 1;
let gameWon = false;
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

// Initialize the game
function init() {
    generateLevel();
    render();
    if (!document.querySelector('[data-input-setup]')) {
        setupInput();
        document.body.setAttribute('data-input-setup', 'true');
    }
}

// Generate a complete level
function generateLevel() {
    let attempts = 0;
    let validLevel = false;

    while (!validLevel && attempts < 50) {
        generateCave();
        generateFloorVariants();

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
                gameMap[y][x] = WALL_CHAR;
            } else {
                gameMap[y][x] = Math.random() < 0.45 ? WALL_CHAR : 'floor';
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
                gameMap[y][x] = WALL_CHAR;
            } else {
                gameMap[y][x] = 'floor';
            }
        }
    }

    generateFloorVariants();

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

// Smooth the cave
function smoothCave(map) {
    const newMap = [];
    for (let y = 0; y < GAME_HEIGHT; y++) {
        newMap[y] = [];
        for (let x = 0; x < GAME_WIDTH; x++) {
            const wallCount = countWallNeighbors(map, x, y);
            if (x === 0 || y === 0 || x === GAME_WIDTH - 1 || y === GAME_HEIGHT - 1) {
                newMap[y][x] = WALL_CHAR;
            } else if (wallCount >= 5) {
                newMap[y][x] = WALL_CHAR;
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
            } else if (map[ny][nx] === WALL_CHAR) {
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
    const enemyCount = baseCount + Math.floor(Math.random() * 5);

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
            const enemy = {
                x: tile.x,
                y: tile.y,
                char: template.char,
                name: template.name,
                hp: template.hp,
                maxHp: template.hp,
                attack: template.attack,
                xp: template.xp,
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
    const chestCount = 2 + Math.floor(Math.random() * 3); // 2-4 chests per floor
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
    return { ...template, type };
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
    // If leaving item behind, mark chest as opened so it can't be accessed again
    if (currentChest && currentChest.item) {
        currentChest.opened = true;
        currentChest.item = null;
        addMessage('You left the item behind.');
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
            } else if (gameMap[y][x] === WALL_CHAR) {
                const wallVariant = (x + y) % 3;
                html += `<span class="wall-${wallVariant}">${WALL_CHAR}</span>`;
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
    const hpBar = createBar(player.hp, player.maxHp, 15);
    const xpBar = createBar(player.xp, xpNeeded, 15);

    let html = `
        <div class="stat-row"><span class="stat-label">Floor:</span> ${currentFloor}/${MAX_FLOORS}</div>
        <div class="stat-row"><span class="stat-label">Level:</span> ${player.level}</div>
        <div class="stat-row"><span class="stat-label">HP:</span> ${hpBar} ${player.hp}/${player.maxHp}</div>
        <div class="stat-row"><span class="stat-label">XP:</span> ${xpBar} ${player.xp}/${xpNeeded}</div>
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

    canvas.innerHTML = `
        <div class="chest-ui">
            ╔════════════════════════════════════╗
            ║          CHEST OPENED!             ║
            ╠════════════════════════════════════╣
            ║                                    ║
            ║  Found: ${item.name.padEnd(25, ' ')} ║
            ║  Type: ${item.type.padEnd(26, ' ')} ║
            ║  ${itemStats.padEnd(32, ' ')} ║
            ║                                    ║
            ║  Current ${item.type}: ${(currentItem ? currentItem.name : 'None').padEnd(18, ' ')} ║
            ${currentItem ? `║  ${currentStats.padEnd(32, ' ')} ║` : ''}
            ║                                    ║
            ║  [T] Take / Swap                   ║
            ║  [L] Leave it                      ║
            ║                                    ║
            ╚════════════════════════════════════╝
        </div>
    `;
}

// Create a visual bar
function createBar(current, max, length) {
    const filled = Math.floor((current / max) * length);
    const empty = length - filled;
    return '[' + '='.repeat(Math.max(0, filled)) + ' '.repeat(Math.max(0, empty)) + ']';
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

// Setup keyboard input
function setupInput() {
    document.addEventListener('keydown', handleInput);
}

// Handle keyboard input
function handleInput(event) {
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
        if (chest) {
            openChest(chest);
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
