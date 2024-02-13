let canvas = document.getElementById("demo-canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
const gridWidth = 20;
const gridHeight = 20;
let head;
let apples = [];
var lastDirection = left;

setInterval(doGameLoop, 500);

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
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function moveBasedOnKeyPress(keyPress) {
    
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
    for (let current = head; current != null; current = current.next) {
        drawGridSquare(current.x, current.y, (color = "green"));
    }
}
function displayAllApples() {
    apples.forEach((apple) => {
        drawGridSquare(apple.x, apple.y, "#b30909");
    });
}
function right() {
    if (head.next.x === head.x + 1) {
        return;
    }
    if (head.x + 1 >= gridWidth) {
        showError("right death");
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
        showError("up death");
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
        showError("left death");
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
        showError("down death");
        return;
    }
    lastDirection == down;
    let newHeadY = head.y + 1;
    return { x: head.x, y: newHeadY };
}
function moveSnake(func) {
    const newPosition = func();
    head.move(newPosition.x, newPosition.y);
}

function doGameLoop() {
    // move
    moveSnake(lastDirection);
    // check if on apple

    // display apples
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    displayAllApples();
    // display snake
    displaySnake();
}

try {
    
    apples.push(new Apple(2, 2));
    displayAllApples();
    createNewSnake();
    displaySnake();
    // drawGridSquare(1, 1);
} catch (e) {
    showError(e);
}
