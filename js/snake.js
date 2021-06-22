// constants and variables
let inputDir = {x: 0, y: 0 }
let speed = 5
let paint = 0
let score = 0
food = {x:6, y:7}
let snake = [
    {x:16, y:12}
]

const hintergrund = new Audio('src/sounds/background.mp4') 
const essen = new Audio('#')
const bewegen = new Audio('#')
const ende = new Audio('src/sounds/scheiße.wav')


function main(time){
        window.requestAnimationFrame(main)
        if((time - paint)/1000 < 1/speed){
            return
        }
        paint = time
        gameEngine()       
}
function isCollide(sarr){
    for (let i = 1; i < snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
            return true;
    }

    return false;

}
function gameEngine(){
    if(isCollide(snake)){
        ende.play()
        hintergrund.pause()
        inputDir = {x: 0, y: 0}
        alert("Game Over, Pleasy Press any key to restart.")
        snake = [{x: 13, y: 15}]
       // hintergrund.play()
        score = 0
    }

    if(snake[0].y === food.y && snake[0].x === food.x){
        essen.play()
        score += 1
        scoreBox.innerHTML = "Score: " + score
        let a = 2;
        let b = 16; 
        snake.unshift({x: snake[0].x + inputDir.x, y: snake[0].y + inputDir.y})
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }


    for (let i = snake.length - 2; i>=0; i--){
        const element = Array[i]
        snake[i+1] = {...snake[i]}
    }

    snake[0].x += inputDir.x
    snake[0].y += inputDir.y

    board.innerHTML = ""
    snake.forEach((e, index) => {
           snakeElement = document.createElement('div')
           snakeElement.style.gridRowStart = e.y
           snakeElement.style.gridColumnStart = e.x
           if(index === 0){
            snakeElement.classList.add('head')
           }
           else {
            snakeElement.classList.add('snake')
           }
           board.appendChild(snakeElement)
    })

    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}

window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = {x:0, y:1}
    bewegen.play()
    switch (e.key){
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
        break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
        break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
        break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
        break;
        default:
            break
    }
})
