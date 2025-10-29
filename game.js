// Game configuration
const GAME_WIDTH = 60;
const GAME_HEIGHT = 30;
const WALL_CHAR = '#';
const FLOOR_CHARS = ['.', ',', '`', '\''];
const PLAYER_CHAR = '@';

// Enemy definitions
const ENEMY_TYPES = {
    goblin: {
        char: 'g',
        name: 'Goblin',
        hp: 8,
        attack: 3,
        xp: 10,
        color: 'enemy-goblin'
    },
    kobold: {
        char: 'k',
        name: 'Kobold',
        hp: 6,
        attack: 2,
        xp: 8,
        color: 'enemy-kobold'
    },
    ogre: {
        char: 'O',
        name: 'Ogre',
        hp: 20,
        attack: 6,
        xp: 25,
        color: 'enemy-ogre'
    }
};

// Game state
let gameMap = [];
let floorVariants = [];
let enemies = [];
let player = {
    x: 0,
    y: 0,
    hp: 30,
    maxHp: 30,
    attack: 5,
    xp: 0,
    level: 1
};
let gameOver = false;
let messageLog = [];

// Initialize the game
function init() {
    generateCave();
    generateFloorVariants();
    placePlayer();
    spawnEnemies();
    addMessage('Welcome to the dungeon! Fight monsters and survive.');
    render();
    setupInput();
}

// Generate a cave using cellular automata
function generateCave() {
    // Initialize with random noise
    gameMap = [];
    for (let y = 0; y < GAME_HEIGHT; y++) {
        gameMap[y] = [];
        for (let x = 0; x < GAME_WIDTH; x++) {
            // Borders are always walls
            if (x === 0 || y === 0 || x === GAME_WIDTH - 1 || y === GAME_HEIGHT - 1) {
                gameMap[y][x] = WALL_CHAR;
            } else {
                // 45% chance of wall for initial random noise
                gameMap[y][x] = Math.random() < 0.45 ? WALL_CHAR : 'floor';
            }
        }
    }

    // Apply cellular automata rules to smooth the cave
    for (let iteration = 0; iteration < 4; iteration++) {
        gameMap = smoothCave(gameMap);
    }
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

// Smooth the cave using cellular automata rules
function smoothCave(map) {
    const newMap = [];
    for (let y = 0; y < GAME_HEIGHT; y++) {
        newMap[y] = [];
        for (let x = 0; x < GAME_WIDTH; x++) {
            // Count wall neighbors
            const wallCount = countWallNeighbors(map, x, y);

            // If this is a border cell, keep it as a wall
            if (x === 0 || y === 0 || x === GAME_WIDTH - 1 || y === GAME_HEIGHT - 1) {
                newMap[y][x] = WALL_CHAR;
            }
            // Apply smoothing rules
            else if (wallCount >= 5) {
                newMap[y][x] = WALL_CHAR;
            } else if (wallCount <= 3) {
                newMap[y][x] = 'floor';
            } else {
                newMap[y][x] = map[y][x]; // Keep current state
            }
        }
    }
    return newMap;
}

// Count wall neighbors in a 3x3 area
function countWallNeighbors(map, x, y) {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue; // Skip center cell

            const nx = x + dx;
            const ny = y + dy;

            // Out of bounds counts as wall
            if (nx < 0 || ny < 0 || nx >= GAME_WIDTH || ny >= GAME_HEIGHT) {
                count++;
            } else if (map[ny][nx] === WALL_CHAR) {
                count++;
            }
        }
    }
    return count;
}

// Place player in a valid floor position
function placePlayer() {
    // Try to find a floor tile near the center
    let attempts = 0;
    const maxAttempts = 1000;

    while (attempts < maxAttempts) {
        const x = Math.floor(GAME_WIDTH / 2) + Math.floor(Math.random() * 10 - 5);
        const y = Math.floor(GAME_HEIGHT / 2) + Math.floor(Math.random() * 10 - 5);

        if (isValidPosition(x, y)) {
            player.x = x;
            player.y = y;
            return;
        }
        attempts++;
    }

    // If we couldn't find a position near center, search the entire map
    for (let y = 1; y < GAME_HEIGHT - 1; y++) {
        for (let x = 1; x < GAME_WIDTH - 1; x++) {
            if (isValidPosition(x, y)) {
                player.x = x;
                player.y = y;
                return;
            }
        }
    }
}

// Check if a position is valid (floor tile)
function isValidPosition(x, y) {
    if (x < 0 || y < 0 || x >= GAME_WIDTH || y >= GAME_HEIGHT) {
        return false;
    }
    return gameMap[y][x] === 'floor';
}

// Spawn enemies on the map
function spawnEnemies() {
    enemies = [];
    const enemyCount = 8 + Math.floor(Math.random() * 5); // 8-12 enemies

    for (let i = 0; i < enemyCount; i++) {
        // Randomly select enemy type
        const types = Object.keys(ENEMY_TYPES);
        const typeKey = types[Math.floor(Math.random() * types.length)];
        const template = ENEMY_TYPES[typeKey];

        // Find a valid position
        let x, y, attempts = 0;
        do {
            x = Math.floor(Math.random() * (GAME_WIDTH - 2)) + 1;
            y = Math.floor(Math.random() * (GAME_HEIGHT - 2)) + 1;
            attempts++;
        } while ((!isValidPosition(x, y) || isPositionOccupied(x, y)) && attempts < 100);

        if (attempts < 100) {
            enemies.push({
                x: x,
                y: y,
                char: template.char,
                name: template.name,
                hp: template.hp,
                maxHp: template.hp,
                attack: template.attack,
                xp: template.xp,
                color: template.color,
                colorVariant: Math.floor(Math.random() * 3) // 0, 1, or 2 for color variants
            });
        }
    }
}

// Check if position is occupied by player or enemy
function isPositionOccupied(x, y) {
    if (player.x === x && player.y === y) return true;
    return enemies.some(e => e.x === x && e.y === y);
}

// Get enemy at position
function getEnemyAt(x, y) {
    return enemies.find(e => e.x === x && e.y === y);
}

// Add message to log
function addMessage(text) {
    messageLog.push(text);
    if (messageLog.length > 5) {
        messageLog.shift();
    }
}

// Combat system
function attack(attacker, defender) {
    const damage = attacker.attack + Math.floor(Math.random() * 3) - 1; // +/- 1 variance
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
        player.maxHp += 5;
        player.hp = player.maxHp; // Full heal on level up
        player.attack += 2;
        addMessage(`LEVEL UP! You are now level ${player.level}!`);
        addMessage(`HP: ${player.maxHp} | Attack: ${player.attack}`);
    }
}

// Render the game to the canvas
function render() {
    if (gameOver) {
        renderGameOver();
        return;
    }

    const canvas = document.getElementById('game-canvas');
    let html = '';

    for (let y = 0; y < GAME_HEIGHT; y++) {
        for (let x = 0; x < GAME_WIDTH; x++) {
            const enemy = getEnemyAt(x, y);

            if (x === player.x && y === player.y) {
                const healthPercent = player.hp / player.maxHp;
                const playerColor = healthPercent > 0.6 ? 'player-healthy' :
                                   healthPercent > 0.3 ? 'player-injured' : 'player-critical';
                html += `<span class="${playerColor}">${PLAYER_CHAR}</span>`;
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
    const hpBar = createBar(player.hp, player.maxHp, 20);
    const xpBar = createBar(player.xp, xpNeeded, 20);

    let html = `
        <div class="stat-row">
            <span class="stat-label">Level:</span> ${player.level}
        </div>
        <div class="stat-row">
            <span class="stat-label">HP:</span> ${hpBar} ${player.hp}/${player.maxHp}
        </div>
        <div class="stat-row">
            <span class="stat-label">XP:</span> ${xpBar} ${player.xp}/${xpNeeded}
        </div>
        <div class="stat-row">
            <span class="stat-label">Attack:</span> ${player.attack}
        </div>
        <div class="stat-row">
            <span class="stat-label">Enemies:</span> ${enemies.length}
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

// Create a visual bar
function createBar(current, max, length) {
    const filled = Math.floor((current / max) * length);
    const empty = length - filled;
    return '[' + '='.repeat(filled) + ' '.repeat(empty) + ']';
}

// Render game over screen
function renderGameOver() {
    const canvas = document.getElementById('game-canvas');
    const statusEl = document.getElementById('status-panel');

    canvas.innerHTML = `
        <div class="game-over">
            ╔════════════════════════════╗
            ║       GAME OVER            ║
            ║                            ║
            ║   You have died...         ║
            ║                            ║
            ║   Final Level: ${String(player.level).padStart(2, ' ')}          ║
            ║   Kills: ${String(enemies.length).padStart(2, ' ')}               ║
            ║                            ║
            ║   Press R to restart       ║
            ╚════════════════════════════╝
        </div>
    `;

    statusEl.innerHTML = '<div class="game-over-text">You were slain!</div>';
}

// Setup keyboard input for numpad
function setupInput() {
    document.addEventListener('keydown', handleInput);
}

// Handle keyboard input
function handleInput(event) {
    if (gameOver && (event.code === 'KeyR' || event.code === 'Numpad5')) {
        event.preventDefault();
        restartGame();
        return;
    }

    if (gameOver) return;

    // Map numpad keys to directions
    const keyMap = {
        'Numpad7': { dx: -1, dy: -1 }, // NW
        'Numpad8': { dx: 0, dy: -1 },  // N
        'Numpad9': { dx: 1, dy: -1 },  // NE
        'Numpad4': { dx: -1, dy: 0 },  // W
        'Numpad5': { dx: 0, dy: 0 },   // Wait
        'Numpad6': { dx: 1, dy: 0 },   // E
        'Numpad1': { dx: -1, dy: 1 },  // SW
        'Numpad2': { dx: 0, dy: 1 },   // S
        'Numpad3': { dx: 1, dy: 1 }    // SE
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
    messageLog = [];
    player = {
        x: 0,
        y: 0,
        hp: 30,
        maxHp: 30,
        attack: 5,
        xp: 0,
        level: 1
    };
    init();
}

// Move the player
function movePlayer(dx, dy) {
    if (gameOver) return;

    const newX = player.x + dx;
    const newY = player.y + dy;

    // Check for enemy at target position
    const enemy = getEnemyAt(newX, newY);
    if (enemy) {
        // Combat!
        const damage = attack(player, enemy);
        addMessage(`You hit ${enemy.name} for ${damage} damage!`);

        if (enemy.hp <= 0) {
            addMessage(`You killed the ${enemy.name}!`);
            gainXP(enemy.xp);
            enemies = enemies.filter(e => e !== enemy);
        }

        // Enemy counter-attacks if still alive
        if (enemy.hp > 0) {
            const counterDamage = attack(enemy, player);
            addMessage(`${enemy.name} hits you for ${counterDamage} damage!`);

            if (player.hp <= 0) {
                gameOver = true;
                addMessage('You have died!');
            }
        }

        // Enemy AI - all enemies take a turn
        enemyTurns();
        render();
        return;
    }

    // Check collision with walls
    if (isValidPosition(newX, newY)) {
        player.x = newX;
        player.y = newY;

        // Enemy AI - all enemies take a turn
        enemyTurns();
        render();
    }
}

// Enemy AI - simple chase behavior
function enemyTurns() {
    if (gameOver) return;

    enemies.forEach(enemy => {
        // Simple AI: move towards player if within range
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.abs(dx) + Math.abs(dy);

        // Only chase if within 10 tiles
        if (distance > 10) return;

        // Calculate move direction (one step at a time)
        let moveX = 0, moveY = 0;
        if (Math.abs(dx) > Math.abs(dy)) {
            moveX = dx > 0 ? 1 : -1;
        } else if (dy !== 0) {
            moveY = dy > 0 ? 1 : -1;
        }

        const targetX = enemy.x + moveX;
        const targetY = enemy.y + moveY;

        // Check if target is player
        if (targetX === player.x && targetY === player.y) {
            // Attack player
            const damage = attack(enemy, player);
            addMessage(`${enemy.name} hits you for ${damage} damage!`);

            if (player.hp <= 0) {
                gameOver = true;
                addMessage('You have died!');
            }
        }
        // Check if target is valid and not occupied by another enemy
        else if (isValidPosition(targetX, targetY) && !getEnemyAt(targetX, targetY)) {
            enemy.x = targetX;
            enemy.y = targetY;
        }
    });
}

// Start the game when the page loads
window.addEventListener('load', init);
