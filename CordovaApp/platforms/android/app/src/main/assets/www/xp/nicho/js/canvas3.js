let skecth3 = (p)=>{

    const container = document.querySelector("#canvas-3")
    let width = innerWidth * 0.8
    let height = innerWidth * 0.8
    let snake
    let food
    let scl = width/18
    let cols = p.round(width/scl)
    let rows = p.round(height/scl)
    let startButton = container.querySelector("button.start-button")
    let condition = false

    p.setup = ()=>{
        p.createCanvas(width, height)
        startButton.addEventListener("click", ()=>{
            startGame()
        })
        p.frameRate(0)
    }

    p.draw = ()=>{

        if(condition){

            p.clear()
            food.show()
            snake.update()
            snake.die()
            snake.show()
            if(snake.eat(food)){
                food = new Food()
            }
        }
    }

    function gameOver(condition){
        p.frameRate(0)
        startButton.style.display = "inline-block"
    }

    function startGame(){
        condition = true
        startButton.style.display = "none"
        snake = new Snake("#ffffff")
        food = new Food()
        p.frameRate(7)
    }

    let buttons = container.querySelectorAll("button.down,button.up,button.left,button.right")
    buttons[0].addEventListener("click", ()=> snake.dir( 0, -1))
    buttons[1].addEventListener("click", ()=> snake.dir(-1,  0))
    buttons[2].addEventListener("click", ()=> snake.dir( 1,  0))
    buttons[3].addEventListener("click", ()=> snake.dir( 0,  1))

    class Snake{
        constructor(color, ai){
            this.x = 0;
            this.y = 0;
            this.xspeed = 0;
            this.yspeed = 0;
            this.total = 0;
            this.tail = [];
            this.color = color;
        }

        update(){
            if(this.total === this.tail.length){
                for(let i = 0; i < this.tail.length-1; i++){
                    this.tail[i] = this.tail[i+1]
                }    
            }
            
            this.tail[this.total-1] = [this.x, this.y]

            this.x = this.x + this.xspeed * scl
            this.y = this.y + this.yspeed * scl

            this.x = p.constrain(this.x, 0, width-scl)
            this.y = p.constrain(this.y, 0, height-scl)
        }

        show(){
            for (let i = 0; i < this.total; i++) {
                p.fill(this.color)
                p.rect(this.tail[i][0], this.tail[i][1], scl , scl )
            }

            p.fill(this.color)
            p.rect(this.x, this.y, scl, scl)
        }

        dir(x, y){
            this.xspeed = x;
            this.yspeed = y;
        }

        eat(food){
            if(p.dist(this.x, this.y, food.x, food.y) < scl){
                this.total++
                return true
            } 
            return false
        }

        die(){
            for (let i = 0; i < this.tail.length; i++) {
                if (this.x == this.tail[i][0] && this.y ==this.tail[i][1]) {
                    gameOver(false)
                }
            }
        }

    }

    class Food{
        constructor(){
            this.x = Math.floor(p.random(cols)) * scl
            this.y = Math.floor(p.random(rows)) * scl
        }

        show(){
            p.fill("#d2e459")
            p.rect(this.x, this.y, scl, scl)
        }
    }
}
