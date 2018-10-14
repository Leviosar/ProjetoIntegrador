class Snake{
    constructor(color, render, keys, food, container){
        this.container = container
        this.p5 = render;
        this.keys = keys
        this.x = 120
        this.y = 60
        this.xspeed = 0;
        this.yspeed = 0;
        this.total = 0;
        this.tail = [];
        this.color = color;
        this.food = food
    }

    update(){
        if(this.total === this.tail.length){
            for(let i = 0; i < this.tail.length-1; i++){
                this.tail[i] = this.tail[i+1]
            }    
        }

        this.tail[this.total-1] = [this.x, this.y]
        

        this.x = this.x + this.xspeed * this.keys.scl
        this.y = this.y + this.yspeed * this.keys.scl

        this.x = this.p5.constrain(this.x, 0, this.p5.width-this.keys.scl*2)
        this.y = this.p5.constrain(this.y, 0, this.p5.height-this.keys.scl*2)
    }

    show(){
        for (let i = 0; i < this.total; i++) {
            this.p5.fill(this.color)
            this.p5.rect(this.tail[i][0], this.tail[i][1], this.keys.scl , this.keys.scl )
        }

        this.p5.fill(this.color)
        this.p5.rect(this.x, this.y, this.keys.scl, this.keys.scl)
    }

    dir(x, y){
        this.xspeed = x;
        this.yspeed = y;
    }

    eat(){
        if(this.p5.dist(this.x, this.y, this.food.x, this.food.y) < this.keys.scl){
            this.total++
            return true
        } 
        return false
    }

    die(){
        console.log(this.tail)
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x == this.tail[i][0] && this.y ==this.tail[i][1]) {
                return true
            }
            else return false
        }
    }

}
