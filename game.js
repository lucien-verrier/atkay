// Game configuration
const GAME_WIDTH = 60;
const GAME_HEIGHT = 30;
const WALL_CHAR = '#';
const FLOOR_CHAR = '.';
const PLAYER_CHAR = '@';

// Game state
let gameMap = [];
let player = { x: 0, y: 0 };

// Initialize the game
function init() {
    generateCave();
    placePlayer();
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
                gameMap[y][x] = Math.random() < 0.45 ? WALL_CHAR : FLOOR_CHAR;
            }
        }
    }

    // Apply cellular automata rules to smooth the cave
    for (let iteration = 0; iteration < 4; iteration++) {
        gameMap = smoothCave(gameMap);
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
                newMap[y][x] = FLOOR_CHAR;
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
    return gameMap[y][x] === FLOOR_CHAR;
}

// Render the game to the canvas
function render() {
    const canvas = document.getElementById('game-canvas');
    let html = '';

    for (let y = 0; y < GAME_HEIGHT; y++) {
        for (let x = 0; x < GAME_WIDTH; x++) {
            if (x === player.x && y === player.y) {
                html += `<span class="player">${PLAYER_CHAR}</span>`;
            } else if (gameMap[y][x] === WALL_CHAR) {
                html += `<span class="wall">${WALL_CHAR}</span>`;
            } else {
                html += `<span class="floor">${FLOOR_CHAR}</span>`;
            }
        }
        html += '\n';
    }

    canvas.innerHTML = html;
}

// Setup keyboard input for numpad
function setupInput() {
    document.addEventListener('keydown', handleInput);
}

// Handle keyboard input
function handleInput(event) {
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

// Move the player
function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    // Check collision with walls
    if (isValidPosition(newX, newY)) {
        player.x = newX;
        player.y = newY;
        render();
    }
}

// Start the game when the page loads
window.addEventListener('load', init);
