
class Food{
    constructor(render, keys){
        this.p5 = render
        this.keys = keys
        this.x = Math.floor(this.p5.random(keys.cols)-1) * keys.scl
        this.y = Math.floor(this.p5.random(keys.rows)-1) * keys.scl
    }

    show(){
        this.p5.fill("#d2e459")
        this.p5.rect(this.x, this.y, this.keys.scl, this.keys.scl)
    }

    reset(){
        this.x = Math.floor(this.p5.random(0, this.keys.cols - 1)) * this.keys.scl
        this.y = Math.floor(this.p5.random(0, this.keys.rows - 1)) * this.keys.scl
    }
}