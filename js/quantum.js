const DOOR_STATUS_MESSAGES = [
    "Access denied. Tracking offender 'in progress'...",
    "Error 192-XV: Unable to render floor. Active_observer.exe not found.",
    "Loading floor....",
    "OBSCRN-88 Clearance Required",
    "Insert magickal word below:",
    "Rotation stabilized. Depth: -3,247 levels.",
    "Passenger manifest: Void (0 entries)",
    "Structural integrity: Quantum fluctuation detected",
    "Warning: Dimensional slide probability - 78.3%",
    "Gravity calibration suspended. Lateral drift confirmed.",
    "Clearance level: Negative quantum",
    "Membrane integrity: Thinning... Membrane integrity: Dissolving...",
    "Passenger count: Recursive. Cannot resolve.",
    "Error: Time coordinates misaligned. Recommended: Surrender navigation",
    "Subsystem alert: Geometry no longer consistent with Euclidean principles"
];

const AUTHORIZED_FLOORS = [1, 2, 3, 255];
const FLOOR_URLS = {
    1: '/floor-1',
    2: '/floor-2',
    3: '/floor-3',
    255: '/255.html'
};

let inputBuffer = '';

window.handleInput = function(num) {
    if (inputBuffer.length < 4) {
        inputBuffer += num;
        updateDisplay();
    }
}

window.handleClear = function() {
    inputBuffer = '';
    updateDisplay();
    document.getElementById('doorStatus').textContent = 'Awaiting input...';
    document.getElementById('accessButton').style.display = 'none';
}

window.handleEnter = function() {
    if (inputBuffer) {
        const floor = parseInt(inputBuffer);
        document.getElementById('floorDisplay').textContent = floor;
        checkFloorAccess(floor);
        inputBuffer = '';
        updateDisplay();
    }
}

function updateDisplay() {
    document.getElementById('inputDisplay').textContent = 
        inputBuffer.padEnd(4, '_');
}

function checkFloorAccess(floor) {
    const doorStatus = document.getElementById('doorStatus');
    const accessButton = document.getElementById('accessButton');
    
    if (AUTHORIZED_FLOORS.includes(floor)) {
        doorStatus.textContent = "Open";
        accessButton.style.display = 'block';
        accessButton.onclick = () => window.location.href = FLOOR_URLS[floor];
    } else {
        const randomMessage = DOOR_STATUS_MESSAGES[Math.floor(Math.random() * DOOR_STATUS_MESSAGES.length)];
        doorStatus.textContent = randomMessage;
        accessButton.style.display = 'none';
    }

    if (floor > 1000) {
        showWarning('DANGER: Quantum tunneling probability exceeding safety threshold');
    } else if (floor < -500) {
        showWarning('ALERT: Dimensional membrane integrity compromised');
    }
}

function showWarning(text) {
    const warning = document.getElementById('warning');
    warning.textContent = text;
    setTimeout(() => warning.textContent = '', 3000);
}