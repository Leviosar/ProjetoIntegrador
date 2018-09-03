let container = document.querySelector("div#canvas-1")
let width, height
let skecth1 = (p)=>{
    width = container.offsetWidth * 0.8, height = container.offsetHeight * 0.4
    p.setup = ()=>{
        p.createCanvas(width, height)
        p.noLoop()
        p.stroke(255)
        p.strokeWeight(4)
        p.line(0, height/2, width, height/2)
        p.fill("#f4c242")
        p.stroke("#f4c242")
        p.strokeWeight(8)
        p.line(width/2, (height/2 + height/10), width/2, height/2.5)
    }

    p.draw = ()=>{

    }

    p.mouseClicked = ()=>{
        p.clear()
        p.stroke(255)
        p.strokeWeight(4)
        p.line(0, height/2, width, height/2)
        p.fill("#f4c242")
        p.stroke("#f4c242")
        p.strokeWeight(8)
        p.line(width/2, (height/2 + height/10), width/2, height/2.5)
        p.ellipse(p.mouseX, p.mouseY, height/16)
    }
}
let canvas1 = new p5(skecth1, 'canvas-1')