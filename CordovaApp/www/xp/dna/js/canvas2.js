let container2 = document.querySelector("div#canvas-2")
let width2, height2
let display = document.querySelector("div#complex-number-1 p")

let skecth2 = (p)=>{
    width2 = container2.offsetWidth * 3, height2 = container2.offsetWidth * 0.4
    
    p.setup = ()=>{

        let canvas = p.createCanvas(width2, height2)
        canvas.elt.style.marginLeft = container2.offsetWidth*2

        p.stroke(255)
        p.line(0, p.height/2, p.width, p.height/2)
        y = new Wave(40, 500, p.color("#d2e459"), true)
    }

    p.draw = ()=>{
        p.clear()
        y.update()
        y.calc()
        y.show()
    }

    p.mouseClicked = ()=>{

    }

    p.touchMoved = ()=>{

    }

    class Wave{
        constructor(amp, period, color, condition){
            this.amplitude = amp
            this.color = color
            this.theta = 0
            this.soundWave
            this.dx
            this.y
            this.w
            this.period = period
            this.spacing = 30
            this.condition = condition
            this.colors = ['#f4c242', '#d2e459', '#daa5e2', '#185e82']
            this.setup()
        }
    
        setup(){
            this.dx = (p.TWO_PI / this.period) * this.spacing
            this.w = p.width + this.spacing
            this.y = new Array(p.floor(this.w/this.spacing))
        }
    
        calc(){
            this.theta += 0.02
            let x = this.theta
            if (this.condition) {   
                for (let i = 0; i < this.y.length; i++) {
                    this.y[i] = p.sin(x) * this.amplitude
                    x += this.dx;
                }   
            }else{
                for (let i = 0; i < this.y.length; i++) {
                    this.y[i] = - p.sin(x) * this.amplitude
                    x += this.dx;
                }
            }
        }
    
        show(){
            for (let x = 0; x < this.y.length; x++) {
                p.strokeWeight(4)
                p.stroke(255)  
                p.line(x * this.spacing, p.height/2 + this.y[x], x * this.spacing, (p.height/2 - this.y[x]))  

                p.noStroke()
                p.fill(this.colors[Math.floor(x % 4)])
                p.ellipse(x * this.spacing, p.height/2 + this.y[x], 15, 15)
                switch (this.colors[Math.floor(x % 4)]) {
                    case '#f4c242':
                        p.fill('#d2e459')
                    break;
                    case '#d2e459':
                        p.fill('#f4c242')
                    break;
                    case '#daa5e2':
                        p.fill('#185e82')
                    break;
                    case '#185e82':
                        p.fill('#daa5e2')
                    break;
                }
                p.ellipse(x * this.spacing, p.height/2 - this.y[x], 15, 15)
            }
        }

        update(){
            this.dx = (p.TWO_PI / this.period) * this.spacing
            this.w = p.width + this.spacing
        }
    }

}

canvas2 = new p5(skecth2, 'canvas-2')