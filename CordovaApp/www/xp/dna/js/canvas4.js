let container4 = document.querySelector("div#canvas-4")
let width4, height4
let scl
let skecth4 = (p)=>{
    let buttons = container4.querySelectorAll('button')
    width4 = container4.offsetWidth, height4 = container4.offsetHeight

    class Basket{
        constructor(px, py, scl, color, value){
            this.px = px*2
            this.py = py - scl*1.6
            this.size = scl
            this.color = color
            this.value = value
        }

        show(){
            p.fill(this.color)
            p.rect(this.px, this.py, this.size*2, this.size)
        }
    }

    class Base{
        constructor(){
            this.initial
            this.color
            this.px = 0 + Math.floor(p.random(0, 8)) * scl
            this.py = 0
            this.size = scl
            this.value = Math.ceil(p.random(0, 4))
            this.speed = 2
            this.setup()
        }

        setup(){
            switch(this.value){
                case 1:
                    this.initial = 'G'
                    this.color = '#f4c242'
                break;
                case 2:
                    this.initial = 'C'
                    this.color = '#d2e459'
                break;
                case 3:
                    this.initial = 'A'
                    this.color = '#daa5e2'
                break;
                case 4:
                    this.initial = 'T'
                    this.color = '#185e82'
                break;
            }
        }

        move(value){
            if (value > 0) {
                if (this.px + this.size < p.width) {
                    this.px+=scl
                }
            }
            if (value < 0) {
                if (this.px != 0) {
                    this.px-=scl
                }
            }
        }

        score(){
            switch(this.value){
                case 1:
                    if (this.px == scl*2 || this.px == scl*3) {
                        score++
                        this.speed = this.speed + (score/10)
                    }else{
                        score = 0
                        this.speed = 2 
                    }
                break;
                case 2:
                    if (this.px == 0 || this.px == scl) {
                        score++
                        this.speed = this.speed + (score/10)
                    }else{
                        score = 0
                        this.speed = 2 
                    }
                break;
                case 3:
                    if (this.px == p.width - scl || this.px == p.width - scl*2) {
                        score++    
                        this.speed = this.speed + (score/10)
                    }else{
                        score = 0
                        this.speed = 2 
                    }
                break;
                case 4:
                    if (this.px == p.width - scl*3 || this.px == p.width - scl*4) {
                        score++
                        this.speed = this.speed + (score/10)
                    }else{
                        score = 0
                        this.speed = 2 
                    }
                break;
            }
        }

        update(){
            this.py += this.speed;
            if (this.py + this.size >= p.height) {
                this.score()
                this.reset()
            }
        }

        reset(){
            this.px = 0 + Math.floor(p.random(0, 4)) * scl
            this.py = 0
            this.value = Math.ceil(p.random(0, 4))
            this.setup()
        }

        show(){
            p.fill(this.color)
            p.noStroke()
            p.rect(this.px, this.py, this.size, this.size)
        }

    }
    let g, c, a, t
    let score = 0
    p.setup = ()=>{
        p.createCanvas(width4, height4)
        scl = p.width/8
        base = new Base()
        g = new Basket(0, p.height, scl, '#f4c242', 1)
        c = new Basket(0 + scl, p.height, scl, '#d2e459', 2)
        a = new Basket(0 + scl * 2, p.height, scl, '#daa5e2', 3)
        t = new Basket(0 + scl * 3, p.height, scl, '#185e82', 4)

        buttons[0].addEventListener('click', ()=>{
            base.move(-1)
        })

        buttons[1].addEventListener('click', ()=>{
            base.move(1)
        })
    }

    p.draw = ()=>{
        p.clear()
        base.update()
        base.show()
        g.show()
        c.show()
        a.show()
        t.show()
        p.textAlign(p.CENTER, p.CENTER)
        p.noStroke(255)
        p.fill(255)
        p.textSize(80)
        p.text(score, p.width/2, p.height/8)
    }

    p.hexagon = (transX, transY, s, color)=> {
        p.noStroke(255);
        p.fill(color);
        p.push();
        p.translate(transX, transY);
        p.scale(s);
        p.beginShape();
        p.vertex(-75, -130);
        p.vertex(75, -130);
        p.vertex(150, 0);
        p.vertex(75, 130);
        p.vertex(-75, 130);
        p.vertex(-150, 0);
        p.endShape(p.CLOSE); 
        p.pop();
    }
}