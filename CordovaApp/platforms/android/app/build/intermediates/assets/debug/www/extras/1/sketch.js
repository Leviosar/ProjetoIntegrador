let controls = document.querySelector('div.controls')

document.addEventListener('deviceready', ()=>{
    navigator.vibrate(50)
})

let score = document.querySelector('main > section > div.hud > div.score-display > div.score')
let highscore = document.querySelector('main > section > div.hud > div.score-display > div.high-score')
let canvas

document.querySelector('main > section > div.hud > div.buttons > button#start').addEventListener('click', ()=>{
    document.querySelector('main > section > div.hud > div.buttons').style.display = 'none'
    if (!canvas) {
        canvas = new p5(skecth, 'canvas-1')   
    }
})

document.querySelector('main > section > div.hud > div.buttons > button:first-child').addEventListener('click', ()=>{
    window.location = '../extras.html'
})

let skecth = (p)=>{

    document.querySelector('main > section > div.hud > div.buttons > button#start').addEventListener('click', ()=>{
        document.querySelector('main > section > div.hud > div.buttons').style.display = 'none'
        startGame()
    })

    const container = document.querySelector("section > div.display")
    let count = 0
    let highcount = 0
    let width = container.offsetWidth
    let height = container.offsetHeight
    let snake, food
    let scl = 20
    let cols = p.floor(width/scl)
    let rows = p.floor(height/scl)
    let condition = false

    let keys = {
        cols:cols,
        rows:rows,
        scl:scl,
        width: width,
        height: height
    }

    p.setup = ()=>{
        p.createCanvas(width, height)
        joy = new Joystick(document.querySelector('section'))
        p.frameRate(7)
        startGame()
    }
    
    p.draw = ()=>{

        if (condition) {   

            score.innerText = 'Score: '+ count
            highscore.innerText = 'High score: '+ highcount

            if (joy.up() && snake.yspeed != 1)
                snake.dir(0, -1)

            if (joy.down() && snake.yspeed != -1)
                snake.dir(0, 1)

            if (joy.left() && snake.xspeed != 1)
                snake.dir(-1, 0)

            if (joy.right() && snake.xspeed != -1)
                snake.dir(1, 0)

            p.clear()
            p.stroke("rgba(0,0,0,.5)")
            p.background(154,197,3)
            snake.update()
            snake.show()
            food.show()

            if (snake.eat()){
                food.reset()
                count++
                if (count >= highcount) {
                    highcount = count
                }      
            } 
            
            if(snake.die()) gameOver()

        }
        
    }

    function gameOver(){
        c_user.addScore(1,count)
        condition = false
        count = 0
        document.querySelector('main > section > div.hud > div.buttons').style.display = 'flex'
        p.frameRate(0)
    }

    function startGame(){
        food = new Food(p, keys)
        snake = new Snake("rgba(0,0,0,.5)", p, keys, food, container)
        condition = true
        p.frameRate(7)
    }
}
