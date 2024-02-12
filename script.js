let canvas = document.getElementById("demo-canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const gridWidth = 10;
const gridHeight = 10;
var grid = [];
grid.length = gridWidth;
for (let index = 0; index < gridWidth; index++) {
    grid[index] = new Array(gridHeight);
}
grid[2][1] = 1;



function showError(errorText) {
    const errorBoxDiv = document.getElementById("error-box");
    const errorTextElement = document.createElement("p");
    errorTextElement.innerText = errorText;
    errorBoxDiv.appendChild(errorTextElement);
    console.log(errorText);
}
function drawGridSquare(x, y, color = "black") {

    if(x > gridWidth-1)
    {
        throw new Error(`Index out of range. ${x} is greater than max index ${gridWidth-1}`);
    }
    if(y > gridHeight-1)
    {
        throw new Error(`Index out of range. ${y} is greater than max index ${gridHeight-1}`);
    }
    
    ctx.fillStyle = "black";
    const gridSizeX = canvasWidth / gridWidth;
    const xPos = gridSizeX * x;

    const gridSizeY = canvasHeight / gridHeight;
    const yPos = gridSizeY * y;

    ctx.fillRect(xPos, yPos, gridSizeX, gridSizeY);
}




try {
    drawGridSquare(1,9)
} catch (e) {
    showError(e);
}
