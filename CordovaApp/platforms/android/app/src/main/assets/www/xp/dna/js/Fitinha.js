class Fitinha{
    constructor(render, double, n, container){
        this.p5 = render
        this.total = n
        this.scl = container.offsetWidth/n
        this.container = container
        if (double) {
            this.buildDNA()
        }else{
            this.buildRNA()
        }
    }

    buildRNA() {
        let total = 0
        this.buildTape(total, true)
    }

    buildDNA(){
        let total = 0
        this.buildTape(total, false)

        let total2 = 0
        this.buildTape(total, true)
    }

    buildTape(total, condition){
        this.p5.stroke(255)
        this.p5.noFill()
        this.p5.strokeWeight(5)
        console.log(this.p5.height/2 - this.p5.sin(this.scl) * 100)
        console.log(this.p5.height/2 + this.p5.sin(this.scl) * 100)
        if (condition)
            this.p5.bezier(total, this.p5.height/2, total + this.scl/2, (this.p5.height/2 - this.p5.sin(this.scl) * 100), total + this.scl/2, (this.p5.height/2 - this.p5.sin(this.scl) * 100), total + this.scl, this.p5.height/2)
        else
            this.p5.bezier(total, this.p5.height/2, total + this.scl/2, (this.p5.height/2 + this.p5.sin(this.scl) * 100), total + this.scl/2, (this.p5.height/2 + this.p5.sin(this.scl) * 100), total + this.scl, this.p5.height/2)
        
        condition = !condition
        total = total + this.scl

        if (total < this.container.offsetWidth) {
            this.buildTape(total, condition)
        }
    }

}