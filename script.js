// Variables
let inputDirection = {x: 0, y: 0};
let score = 0;
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{x: 9, y: 9}];
let food = {x: 13, y: 15};

// Game function
function main(currentTime){
    window.requestAnimationFrame(main);
    // console.log(currentTime);
    if((currentTime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}

function isCollide(snakeArr){
    // If snake hits itself
    for(let i=1; i<snakeArr.length; i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }

    // If snake hits wall
    if(snakeArr[0].x > 18 || snakeArr[0].x < 0 || snakeArr[0].y > 18 || snakeArr[0].y < 0){
        return true;
    }
}

function gameEngine(){
    // Updating the snake array & food
    if(isCollide(snakeArr)){
        inputDirection = {x: 0, y: 0};
        alert("Game Over. Your Score is: " + score);
        snakeArr = [{x: 9, y: 9}];
        score = 0;
    }

    // If food eaten, increment the score and regenerate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score += 1;
        snakeArr.unshift({x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())};
    }

    // Moving the snake
    for(let i=snakeArr.length-2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((ele, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = ele.y;
        snakeElement.style.gridColumnStart = ele.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snakeBody');
        }
        board.appendChild(snakeElement);
    });

    // Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDirection = {x: 0, y: 1}; // Game start
    switch(e.key){
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;
        case "ArrowDown":
            // console.log("ArrowDown");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;
        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        case "ArrowRight":
            // console.log("ArrowRight");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
        default:
            break;
    }
});