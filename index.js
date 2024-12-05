const gamecanvas = document.getElementById('gameCanvas');
const displayScr =  document.getElementById('btn')
const displayhiScr =  document.getElementById('HiScore')
const level = document.getElementById('difficulty');
const submit = document.getElementById('Submit');
let gameOverSound = new Audio("game-over-160612.mp3")
let gameBonusSound = new Audio("game-bonus-144751.mp3")
let snake =[{x:5,y:7}]
let food = {x:12,y:12}
let direction = { x: 0, y: 0 };
let HiScore =0;
 let score  = 0;
 let flag = true;
 
function display(){
  
     gamecanvas.innerHTML =''
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    
    
    snake.forEach((e,index)=>{
         let head = document.createElement('div')
           head.style.gridRowStart =e.x;
           head.style.gridColumnStart =e.y;
         
           if(index==0)
            {  
               head.classList.add("head")
              
           }else {
            head.classList.add("snake")
           }
          gamecanvas.appendChild(head);
          
        })
        if(snake[0].x===food.x&&snake[0].y===food.y)
            {   let isFoodOnSnake = true;
                gameBonusSound.pause();
                gameBonusSound.currentTime='0'
                gameBonusSound.play();
                //its for food should not be on the body 
                while (isFoodOnSnake) {
                    isFoodOnSnake = false;
                
                    
                    food.x = Math.floor(Math.random() * 18) + 1;
                    food.y = Math.floor(Math.random() * 18) + 1;
                
                   
                    snake.forEach((e) => {
                        if (e.x === food.x && e.y === food.y) {
                            isFoodOnSnake = true; 
                        }
                    });
                }
                score++;
                displayScr.innerHTML = `Score : ${score}`
                   
            }else{
                snake.pop();
            }
            let foodele = document.createElement('div')
             
                    foodele.style.gridRowStart =food.x;
                    foodele.style.gridColumnStart =food.y;
             foodele.classList.add('food')
            gamecanvas.appendChild(foodele);

            isColled() // it will check snake is collied or not (body or it self)
            let getScore = localStorage.getItem('HiScore')
            displayhiScr.innerHTML = `HiScore : ${getScore}`
            if(score>=getScore)
                {
                    HiScore =score
                    localStorage.setItem("HiScore", HiScore);
                  
              }
            
    }
function isColled()
{ 
    // body check  or canvas div 
    if (snake[0].x < 1 || snake[0].x > 18 || snake[0].y < 1 || snake[0].y > 18) {

           reset();
            return
    }
    // itself check
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            
            reset();
            return;
        }
    }
}
window.addEventListener('keydown',e=>{
    
   
    switch (e.key) {
        case "ArrowUp":
           if(direction.x===0)  direction = { x: -1, y: 0 };
            break;
        case "ArrowDown":
            if(direction.x===0)  direction = { x: 1, y: 0 };
            break;
        case "ArrowLeft":
            if(direction.y===0)   direction = { x: 0, y: -1 };
            break;
        case "ArrowRight":
            if(direction.y===0)  direction = { x: 0, y: 1 };
            break;
    }
})

let first; 

submit.addEventListener('click', () => {
   
    if (first) {
        clearInterval(first);
    }

   
    if (level.value === 'medium') {
        first = setInterval(display, 110);
    } else if (level.value === 'easy') {
        first = setInterval(display, 200); 
    } else {
        first = setInterval(display, 75); 
    }
});

   
 function reset(){
    gameBonusSound.pause();
    gameOverSound.play();
    
    const gameOverMessage = document.createElement("div");
    gameOverMessage.innerHTML = `Game Over! You Scored: ${score}`;
    gameOverMessage.style.position = "fixed";
    gameOverMessage.style.top = "50%";
    gameOverMessage.style.left = "50%";
    gameOverMessage.style.transform = "translate(-50%, -50%)";
    gameOverMessage.style.background = "#fff";
    gameOverMessage.style.border = "2px solid #000";
    gameOverMessage.style.padding = "20px";
    document.body.appendChild(gameOverMessage);
    
    displayScr.innerHTML = `Score : ${score}`;
    setTimeout(() => {
        snake = [{ x: 5, y: 7 }];
        food = { x: 12, y: 12 };
        direction = { x: 0, y: 0 };
        document.body.removeChild(gameOverMessage);
        score = 0;
       
    }, 1000);
 }  
 

 