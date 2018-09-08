
let canvasContainer = document.querySelector("div.canvas-container")
let intervalPlus
let intervalMinus
let buttons = {
    minus: document.querySelector("div.input-container > button:first-child"),
    plus: document.querySelector("div.input-container > button:last-child")
}

let inputnumbers = document.querySelectorAll("div.input-group input")

let skecth1 = (p)=>{

    buttons.minus.addEventListener('click', ()=>{
        x.period -= 10
    })

    buttons.plus.addEventListener('mousedown', ()=>{
        x.period += 10
    })

    p.setup = ()=>{
        let canvas = p.createCanvas(200, 200)
        canvas.elt.style.width = "100%"
        canvas.elt.style.height = "50%"
        canvasContainer.appendChild(canvas.elt)
        p.strokeWeight(4)
        p.stroke(255)
        p.noFill()
        p.strokeWeight(2)
        p.line(0, p.height/2, p.width, p.height/2)
        x = new Wave(30, 250, p.color("#185e82"))
    }

    p.draw = ()=>{
        p.clear()
        p.stroke(255)
        p.line(0, p.height/2, p.width, p.height/2)
        x.update()
        x.calc()
        x.show()
    }

    class Wave{
        constructor(amp, period, color){
            this.amplitude = amp
            this.color = color
            this.theta = 0
            this.soundWave
            this.dx
            this.y
            this.w
            this.period = period
            this.spacing = 3
            this.setup()
            this.sound()
        }
    
        setup(){
            this.dx = (p.TWO_PI / this.period) * this.spacing
            this.w = p.width + this.spacing
            this.y = new Array(p.floor(this.w/this.spacing))
        }
    
        calc(){
            this.theta += 0.04
            let x = this.theta
            for (let i = 0; i < this.y.length; i++) {
                this.y[i] = p.sin(x) * this.amplitude
                x += this.dx;
            }
        }
    
        show(){
            p.noStroke()
            p.fill(this.color)
            for (let x = 0; x < this.y.length; x++) {
                p.ellipse(x * this.spacing, p.height/2 + this.y[x], 3, 3)    
            }
        }
    
        sound(){
            this.soundWave = new Pizzicato.Sound({ 
                source: 'wave', 
                options: {
                    frequency: (1 / this.period) * 10000
                }
            });
            
            this.soundWave.play();
        }
    
        updateSound(){
            this.soundWave.frequency = ( 1 / this.period) * 20000
            this.soundWave.volume = this.amplitude/120
        }
    
        update(){
            this.dx = (p.TWO_PI / this.period) * this.spacing
            this.w = p.width + this.spacing
            this.show()
            this.updateSound()
        }
    }
    
}
