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

            let x = p.constrain(p.mouseX, 15, (width3-15))
            let y = p.constrain(p.mouseY, 15, (height3-15))

            pointA.px = x - width3/2
            pointA.py = height3/2 - y
            pointA.x = x
            pointA.y = y

            p.strokeWeight(4)
            p.stroke("#f4c242") 
            p.line(x, y, x, height3/2)
            p.stroke("#d2e459")
            p.line(x, y, width3/2, y)
            p.fill("#ffffff")
            p.stroke("#ffffff")
            p.ellipse(x, y, 15)
            condition = !condition

            let img = parseInt(height3/2 - y)
            let real = parseInt(x - width3/2)

            if(img > 0) {
                img = "+ "+img
            }

            display2.innerText = "("+real+img+"i)"

        }else{

            let x = p.constrain(p.mouseX, 15, (width3-15))
            let y = p.constrain(p.mouseY, 15, (height3-15))

            pointB.px = x - width3/2
            pointB.py = height3/2 - y
            pointB.x = x
            pointB.y = y

            p.strokeWeight(4)
            p.stroke("#f4c242") 
            p.line(pointA.x, pointA.y, pointA.x, height3/2)
            p.stroke("#d2e459")
            p.line(pointA.x, pointA.y, width3/2, pointA.y)
            p.fill("#ffffff")
            p.stroke("#ffffff")
            p.ellipse(pointA.x, pointA.y, 15)

            p.strokeWeight(4)
            p.stroke("#f4c242") 
            p.line(x, y, x, height3/2)
            p.stroke("#d2e459")
            p.line(x, y, width3/2, y)
            p.fill("#ffffff")
            p.stroke("#ffffff")
            p.ellipse(x, y, 15)

            pointC = sumComplex(pointA, pointB)
            pointC.realX = pointC.px
            pointC.realY = pointC.py

            p.strokeWeight(4)
            p.stroke("#f4c242") 
            p.line(pointC.realX + width3/2, height3/2 - pointC.realY, pointC.realX + width3/2, height3/2)
            p.stroke("#d2e459")
            p.line(pointC.realX + width3/2, height3/2 - pointC.realY, width3/2, height3/2 - pointC.realY)
            p.fill("#f4c242")
            p.stroke("#f4c242")
            p.ellipse(pointC.realX + width3/2, height3/2 - pointC.realY , 15)


            let img = parseInt(height3/2 - y)
            let real = parseInt(x - width3/2)
            
            if(img > 0) {
                img = "+ "+img
            }
            if (pointC.py > 0) pointC.py = "+ " + pointC.py
            
            display2.innerText += " + ("+real+img+"i) = ("+pointC.px+pointC.py+"i)"

            condition = !condition

        }
    }

    // p.touchMoved = ()=>{
    //     p.clear()
    //     p.stroke(255)
    //     p.strokeWeight(4)
    //     p.line(0, height3/2, width3, height3/2)
    //     p.line(width3/2, height3, width3/2, 0)
    //     display.innerText = "(" + parseInt(p.mouseX - width3/2) +"," + parseInt(height3/2 - p.mouseY) +")"
    //     p.strokeWeight(4)
    //     p.stroke("#f4c242") 
    //     p.line(p.mouseX, p.mouseY, p.mouseX, height3/2)
    //     p.stroke("#d2e459")
    //     p.line(p.mouseX, p.mouseY, width/2, p.mouseY)
    //     p.fill("#ffffff")
    //     p.stroke("#ffffff")
    //     p.ellipse(p.mouseX, p.mouseY, 15)
    // }
}

canvas3 = new p5(skecth3, 'canvas-3')