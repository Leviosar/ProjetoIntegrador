let container3 = document.querySelector("div#canvas-3")
let width3, height3

let skecth3 = (p)=>{

    class Base{
        constructor(nome, color, px, py, scale){
            this.initial = nome
            this.color = color
            this.px = px
            this.py = py
            this.size = scale
            this.growing = true
        }

        update(){
            if(this.growing){
                this.size += 0.0005
            }else{
                this.size -= 0.0005
            }

            if (this.size >= 0.4) this.growing = !this.growing
            if (this.size <= 0.25) this.growing = !this.growing 
        }

        show(){
            p.hexagon(this.px, this.py, this.size, this.color)
            p.fill(255)
            p.textSize(32)
            p.textAlign(p.CENTER, p.CENTER)
            p.text(this.initial, this.px, this.py)
        }

    }

    width3 = container2.offsetWidth, height3 = container2.offsetWidth * 0.8

    let g, c, a, t

    p.setup = ()=>{
        p.createCanvas(width3, height3)
        p.fill(0)
        p.stroke(255)
        g = new Base('G', '#f4c242', p.width/4, p.height/4, 0.3)
        c = new Base('C', '#d2e459', p.width - p.width/4, p.height/4, 0.3)
        a = new Base('A', '#daa5e2', p.width/4, p.height - p.height/3, 0.3)
        t = new Base('T', '#185e82', p.width - p.width/4, p.height - p.height/3, 0.3)
    }

    p.draw = ()=>{
        p.clear()
        p.stroke(255)
        p.strokeWeight(4)
        p.line(g.px, g.py, c.px, c.py)
        p.line(g.px, g.py - (g.py/4), c.px, c.py - (c.py/4))
        p.line(g.px, g.py + (g.py/4), c.px, c.py + (c.py/4))
        p.line(g.px, g.py, c.px, c.py)

        p.line(a.px, a.py - (a.py/8), t.px, t.py - (t.py/8))
        p.line(a.px, a.py + (a.py/8), t.px, t.py + (t.py/8))

        g.update()
        c.update()
        a.update()
        t.update()
        g.show()
        c.show()
        a.show()
        t.show()
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



canvas3 = new p5(skecth3, 'canvas-3')