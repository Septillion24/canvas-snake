let canvas = document.getElementById("demo-canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
const gridWidth = 20;
const gridHeight = 20;
let head;
let apples = [];
let isPaused = true;
var lastDirection = left;
var isDead = false;
var currentSections = 3;
clearCanvas();
var gameLoopIntervalID = setInterval(doGameLoop, 300);
if (isPaused) {
    displayPauseIcon();
}

addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key == "a") {
        lastDirection = left;
    }
    if (event.key === "ArrowRight" || event.key == "d") {
        lastDirection = right;
    }
    if (event.key === "ArrowUp" || event.key == "w") {
        lastDirection = up;
    }
    if (event.key === "ArrowDown" || event.key == "s") {
        lastDirection = down;
    }
    if (event.key === " ") {
        isPaused = !isPaused;
        if (isPaused && !isDead) {
            displayPauseIcon();
        } else if (!isDead) {
            doDisplaySequence();
        }
    }
});
function doDisplaySequence() {
    // display apples
    clearCanvas();
    displayAllApples();
    // display snake
    displaySnake();
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function showError(errorText) {
    const errorBoxDiv = document.getElementById("error-box");
    const errorTextElement = document.createElement("p");
    errorTextElement.innerText = errorText;
    errorBoxDiv.appendChild(errorTextElement);
    console.log(errorText);
}
function drawGridSquare(x, y, color = "black") {
    if (x > gridWidth - 1) {
        throw new Error(`Index out of range. ${x} is greater than max index ${gridWidth - 1}`);
    }
    if (y > gridHeight - 1) {
        throw new Error(`Index out of range. ${y} is greater than max index ${gridHeight - 1}`);
    }

    ctx.fillStyle = color;
    const gridSizeX = canvasWidth / gridWidth;
    const xPos = gridSizeX * x;

    const gridSizeY = canvasHeight / gridHeight;
    const yPos = gridSizeY * y;

    ctx.fillRect(xPos, yPos, gridSizeX, gridSizeY);
}
function createNewSnake() {
    head = new SnakePart(Math.floor(gridWidth / 2), Math.floor(gridHeight / 2));
    head.next = new SnakePart(Math.floor(gridWidth / 2) + 1, Math.floor(gridHeight / 2));
    head.next.next = new SnakePart(Math.floor(gridWidth / 2) + 2, Math.floor(gridHeight / 2));
}
function displaySnake() {
    let currentSnakePart = 0;
    for (let current = head; current != null; current = current.next) {
        drawGridSquare(current.x, current.y, (color = `green`));
        currentSnakePart++;
    }
}
function displayAllApples() {
    apples.forEach((apple) => {
        drawGridSquare(apple.x, apple.y, "#b30909");
    });
}
function displayPauseIcon() {
    drawGridSquare(0, 0, "rgba(0, 0, 0, 0.5)");
    drawGridSquare(0, 1, "rgba(0, 0, 0, 0.5)");
    drawGridSquare(0, 2, "rgba(0, 0, 0, 0.5)");

    drawGridSquare(2, 0, "rgba(0, 0, 0, 0.5)");
    drawGridSquare(2, 1, "rgba(0, 0, 0, 0.5)");
    drawGridSquare(2, 2, "rgba(0, 0, 0, 0.5)");
}
function right() {
    if (head.next.x === head.x + 1) {
        return;
    }
    if (head.x + 1 >= gridWidth) {
        killPlayer();
        return;
    }
    lastDirection == right;
    let newHeadX = head.x + 1;
    return { x: newHeadX, y: head.y };
}
function up() {
    if (head.next.y === head.y - 1) {
        return;
    }
    if (head.y - 1 < 0) {
        killPlayer();
        return;
    }
    lastDirection == up;
    let newHeadY = head.y - 1;
    return { x: head.x, y: newHeadY };
}
function left() {
    if (head.next.x === head.x - 1) {
        return;
    }
    if (head.x - 1 < 0) {
        killPlayer();
        return;
    }

    lastDirection == left;
    let newHeadX = head.x - 1;
    return { x: newHeadX, y: head.y };
}
function down() {
    if (head.next.y === head.y + 1) {
        return;
    }
    if (head.y + 1 >= gridHeight) {
        killPlayer();
        return;
    }
    lastDirection == down;
    let newHeadY = head.y + 1;
    return { x: head.x, y: newHeadY };
}
function moveSnake(func) {
    const newPosition = func();
    head.toList().forEach((part) => {
        if (part.x === newPosition.x && part.y === newPosition.y) {
            killPlayer();
        }
    });
    if (!isDead) {
        head.move(newPosition.x, newPosition.y);
    }
}
function clearCanvas() {
    // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}
function createNewAppleWave(numberOfApples = Math.floor(currentSections / 12 + 1)) {
    for (let i = 0; i < numberOfApples - apples.length + 1; i++) {
        const x = Math.floor(Math.random() * gridWidth - 1);
        const y = Math.floor(Math.random() * gridHeight - 1);
        //TODO:
        // make sure new apple location is not under player
        // make sure new apple location is not under another apple
        apples.push(new Apple(x, y));
    }
}
function checkIfOnApple() {
    var eatenAppleIndex = undefined;
    apples.forEach((apple, index) => {
        if (apple.x === head.x && apple.y === head.y) {
            eatenAppleIndex = index;
            return;
        }
    });

    return eatenAppleIndex;
}
function doGameLoop() {
    if (isPaused) {
        return;
    }

    // move
    const status = moveSnake(lastDirection);
    if (isDead) {
        return;
    }
    // check if on apple
    let index = checkIfOnApple();
    if (index !== undefined) {
        head.addPart();
        currentSections++;
        apples.splice(index, 1);
        createNewAppleWave();
    }

    //display
    doDisplaySequence();
}
function killPlayer() {
    isDead = true;
    showError("You Died!");
    clearInterval(gameLoopIntervalID);
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    const centerX = Math.floor((gridWidth-1)/2);
    const centerY = Math.floor((gridHeight-1)/2);
}




try {
    apples.push(new Apple(5, 10));
    displayAllApples();
    createNewSnake();
    displaySnake();
    killPlayer();
} catch (e) {
    showError(e);
}
