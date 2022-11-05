const container = document.querySelector('.container');
const resetButton = document.querySelector('.reset');
const eraserButton = document.querySelector('.eraser');
const paintButton = document.querySelector('.paint');
const currentColorDiv = document.querySelector('.current-color');
const changeResBtn = document.querySelector('.change-resolution');

let blocks;
let currentColor;

init();

function init() {
    blocks = createBlocks();
    changeColor('black');

    changeResBtn.addEventListener('click', () => changeRes());
    resetButton.addEventListener('click', reset);
    eraserButton.addEventListener('click', () => changeColor('white'));
    paintButton.addEventListener('click', () => changeColor('black'));
}

function changeRes(){
    res = prompt("Enter a single number 1-100");
    blocks.forEach(rows => {
        rows.forEach(block => {
            block.remove();
        })
    })
    blocks = createBlocks(res);
}

function changeColor(color) {
    currentColor = color;
    currentColorDiv.style.backgroundColor = currentColor;
}

function reset() {
    blocks.forEach(row => {
        row.forEach(block => {
            block.style.backgroundColor = 'white';
        });
    });
}

function createBlocks(gridSize = 16) {
    let blocks = [];
    if (gridSize > 100) {
        gridSize = 100;
    }
    for (let i = 0; i < gridSize; i++) {
        blocks[i] = [];
        for (let j = 0; j < gridSize; j++) {
            blocks[i][j] = document.createElement('div');
            blocks[i][j].addEventListener('mouseover', (e) => blockEntered(e));
        }
    }
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    addBlocksTo(blocks, container);
    return blocks;
}

function blockEntered(e) {
    colorBlock(e.target, currentColor);
}

function colorBlock(block, color) {
    block.style.backgroundColor = color;
}

function addBlocksTo(blocks, parent) {
    blocks.forEach(row => {
        row.forEach(block => {
            parent.appendChild(block);
        });
    });
}