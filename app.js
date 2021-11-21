let lastPaintTime = 0
let speed = 5
let inputDir = { x: 0, y: 0 };
let snakearr = [
    { x: 12, y: 13 }
];
let food = { x: 7, y: 8 };
let score = 0;



let main = (ctime) => {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEnige();
}


let iscolaid = (sarr) => {
    for (let i = 1; i < sarr.length; i++) {
        if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
            return true;
        }
    }
    // sanke collapse to wall
    if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
        return true;
    }
}



function gameEnige() {
    let board = document.getElementById('board');

    if (iscolaid(snakearr)) {
        console.log("game over");
        inputDir = { x: 0, y: 0 };
        alert("Game over...");
        snakearr = [
            { x: 12, y: 13 }
        ];
        score = 0;
    }

    // sanke eat food and regenrate food increse snake length
    if (snakearr[0].x == food.x && snakearr[0].y == food.y) {
        snakearr.unshift({ x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }


    // snake move
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;

    board.innerHTML = '';
    // sanke and food display 
    // sanke display    
    snakearr.forEach((ele, index) => {
        let sankediv = document.createElement('div');
        sankediv.style.gridRowStart = ele.y
        sankediv.style.gridColumnStart = ele.x
        if (index === 0) {
            sankediv.classList.add('head');
        } else {
            sankediv.classList.add('sanke');
        }
        board.appendChild(sankediv);
    });
    // Food display
    let fooddiv = document.createElement('div');
    fooddiv.style.gridColumnStart = food.x;
    fooddiv.style.gridRowStart = food.y;
    fooddiv.classList.add('food');
    board.appendChild(fooddiv);
}


window.requestAnimationFrame(main);
//main logic
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown": 
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft": 
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight": 
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})