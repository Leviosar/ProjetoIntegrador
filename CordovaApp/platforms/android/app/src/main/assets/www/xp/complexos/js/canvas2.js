let container2 = document.querySelector("div#canvas-2")
let width2, height2
let display = document.querySelector("div#complex-number-1 p")
let skecth2 = (p)=>{
    width2 = container2.offsetWidth * 0.8, height2 = container2.offsetWidth * 0.8
    p.setup = ()=>{
        p.strokeCap(p.RECT)
        p.createCanvas(width2, height2)
        p.stroke(255)
        p.strokeWeight(4)
        p.line(0, height2/2, width2, height2/2)
        p.line(width2/2, height2, width2/2, 0)
        p.loop()
    }

    p.draw = ()=>{
        
    }

    p.mouseClicked = ()=>{
        p.clear()
        p.stroke(255)
        p.strokeWeight(4)
        p.line(0, height2/2, width2, height2/2)
        p.line(width2/2, height2, width2/2, 0)
        display.innerText = "(" + parseInt(p.mouseX - width2/2) +"," + parseInt(height2/2 - p.mouseY) +")"
        p.strokeWeight(4)
        p.stroke("#f4c242") 
        p.line(p.mouseX, p.mouseY, p.mouseX, height+2)
        p.stroke("#d2e459")
        p.line(p.mouseX, p.mouseY, width/2, p.mouseY)
        p.fill("#ffffff")
        p.stroke("#ffffff")
        p.ellipse(p.mouseX, p.mouseY, 15)
    }

    p.touchMoved = ()=>{
        p.clear()
        p.stroke(255)
        p.strokeWeight(4)
        p.line(0, height2/2, width2, height2/2)
        p.line(width2/2, height2, width2/2, 0)
        display.innerText = "(" + parseInt(p.mouseX - width2/2) +"," + parseInt(height2/2 - p.mouseY) +")"
        p.strokeWeight(4)
        p.stroke("#f4c242") 
        p.line(p.mouseX, p.mouseY, p.mouseX, height+2)
        p.stroke("#d2e459")
        p.line(p.mouseX, p.mouseY, width/2, p.mouseY)
        p.fill("#ffffff")
        p.stroke("#ffffff")
        p.ellipse(p.mouseX, p.mouseY, 15)
    }
}
let canvas2 = new p5(skecth2, 'canvas-2')