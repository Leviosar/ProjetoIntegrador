let container3 = document.querySelector("div#canvas-3")
let width3, height3
let display2 = document.querySelector("div#complex-number-2 p")
let condition = true

let pointA = {}
let pointB = {}
let pointC = {}

function sumComplex(a, b){
    let c = {}
    c.px = Math.floor(a.px+b.px)
    c.py = Math.floor(a.py+b.py)
    c.x = Math.floor(a.x+b.x)
    c.y = Math.floor(a.y+b.y)
    return c
}

let skecth3 = (p)=>{
    width3 = container2.offsetWidth * 0.8, height3 = container2.offsetWidth * 0.8
    p.setup = ()=>{
        p.strokeCap(p.RECT)
        p.createCanvas(width3, height3)
        p.stroke(255)
        p.strokeWeight(4)
        p.line(0, height3/2, width3, height3/2)
        p.line(width3/2, height3, width3/2, 0)
        p.loop()
    }

    p.draw = ()=>{
        
    }

    p.mouseClicked = ()=>{
        p.clear()
        p.stroke(255)
        p.strokeWeight(4)
        p.line(0, height3/2, width3, height3/2)
        p.line(width3/2, height3, width3/2, 0)

        if(condition){

            pointA.px = p.mouseX - width3/2
            pointA.py = height3/2 - p.mouseY
            pointA.x = p.mouseX
            pointA.y = p.mouseY

            p.strokeWeight(4)
            p.stroke("#f4c242") 
            p.line(p.mouseX, p.mouseY, p.mouseX, height+2)
            p.stroke("#d2e459")
            p.line(p.mouseX, p.mouseY, width/2, p.mouseY)
            p.fill("#ffffff")
            p.stroke("#ffffff")
            p.ellipse(p.mouseX, p.mouseY, 15)
            condition = !condition

            let img = parseInt(height3/2 - p.mouseY)
            let real = parseInt(p.mouseX - width3/2)

            if(img > 0) {
                img = "+ "+img
            }

            display2.innerText = "("+real+img+"i)"

        }else{

            pointB.px = p.mouseX - width3/2
            pointB.py = height3/2 - p.mouseY
            pointB.x = p.mouseX
            pointB.y = p.mouseY

            p.strokeWeight(4)
            p.stroke("#f4c242") 
            p.line(pointA.x, pointA.y, pointA.x, height+2)
            p.stroke("#d2e459")
            p.line(pointA.x, pointA.y, width/2, pointA.y)
            p.fill("#ffffff")
            p.stroke("#ffffff")
            p.ellipse(pointA.x, pointA.y, 15)

            p.strokeWeight(4)
            p.stroke("#f4c242") 
            p.line(p.mouseX, p.mouseY, p.mouseX, height+2)
            p.stroke("#d2e459")
            p.line(p.mouseX, p.mouseY, width/2, p.mouseY)
            p.fill("#ffffff")
            p.stroke("#ffffff")
            p.ellipse(p.mouseX, p.mouseY, 15)

            pointC = sumComplex(pointA, pointB)
            pointC.realX = pointC.px
            pointC.realY = pointC.py
            console.log(pointC)

            p.strokeWeight(4)
            p.stroke("#f4c242") 
            p.line(pointC.realX + width3/2, height3/2 - pointC.realY, pointC.realX + width3/2, height+2)
            p.stroke("#d2e459")
            p.line(pointC.realX + width3/2, height3/2 - pointC.realY, width/2, height3/2 - pointC.realY)
            p.fill("#f4c242")
            p.stroke("#f4c242")
            p.ellipse(pointC.realX + width3/2, height3/2 - pointC.realY , 15)


            let img = parseInt(height3/2 - p.mouseY)
            let real = parseInt(p.mouseX - width3/2)
            
            if(img > 0) {
                img = "+ "+img
            }
            if (pointC.py > 0) pointC.py = "+ " + pointC.py
            
            display2.innerText += " + ("+real+img+"i) = ("+pointC.px+pointC.py+"i)"

            condition = !condition

        }
    }

    p.touchMoved = ()=>{
        p.clear()
        p.stroke(255)
        p.strokeWeight(4)
        p.line(0, height3/2, width3, height3/2)
        p.line(width3/2, height3, width3/2, 0)
        display.innerText = "(" + parseInt(p.mouseX - width3/2) +"," + parseInt(height3/2 - p.mouseY) +")"
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
let canvas3 = new p5(skecth3, 'canvas-3')