let canvas = document.getElementById("demo-canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
const gridWidth = 10;
const gridHeight = 10;
let head;
let apples = [];

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
}
function displaySnake() {
    for (let current = head; current != null; current = current.next) {
        drawGridSquare(current.x, current.y, (color = "green"));
    }
}
function displayAllApples(){
    apples.forEach(apple => {
       drawGridSquare(apple.x,apple.y, "#b30909"); 
    });
}


try {
    apples.push(new Apple(2,2));
    displayAllApples();
    createNewSnake();
    displaySnake();
    // drawGridSquare(1, 1);
} catch (e) {
    showError(e);
}
