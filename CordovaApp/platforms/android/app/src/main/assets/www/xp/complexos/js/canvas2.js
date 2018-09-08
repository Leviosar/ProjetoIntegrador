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
        let x = p.constrain(p.mouseX, 15, (width2-15))
        let y = p.constrain(p.mouseY, 15, (height2-15))
        p.clear()
        p.stroke(255)
        p.strokeWeight(4)
        p.line(0, height2/2, width2, height2/2)
        p.line(width2/2, height2, width2/2, 0)
        display.innerText = "(" + parseInt(x - width2/2) +"," + parseInt(height2/2 - y) +")"
        p.strokeWeight(4)
        p.stroke("#f4c242") 
        p.line(x, y, x, height2/2)
        p.stroke("#d2e459")
        p.line(x, y, width2/2, y)
        p.fill("#ffffff")
        p.stroke("#ffffff")
        p.ellipse(x, y, 15)
    }

    p.touchMoved = ()=>{
        let x = p.constrain(p.mouseX, 15, (width2-15))
        let y = p.constrain(p.mouseY, 15, (height2-15))
        p.clear()
        p.stroke(255)
        p.strokeWeight(4)
        p.line(0, height2/2, width2, height2/2)
        p.line(width2/2, height2, width2/2, 0)
        display.innerText = "(" + parseInt(x - width2/2) +"," + parseInt(height2/2 - y) +")"
        p.strokeWeight(4)
        p.stroke("#f4c242") 
        p.line(x, y, x, height2/2)
        p.stroke("#d2e459")
        p.line(x, y, width2/2, y)
        p.fill("#ffffff")
        p.stroke("#ffffff")
        p.ellipse(x, y, 15)
    }
}
