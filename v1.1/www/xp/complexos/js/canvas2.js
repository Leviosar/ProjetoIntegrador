let container2 = document.querySelector("div#canvas-2")
let width2, height2
let display = document.querySelector("div#complex-number-1 p")

let skecth2 = (p)=>{

    // Define uma altura específica para esse canvas 
    width2 = container2.offsetWidth * 0.8, height2 = container2.offsetWidth * 0.8
    
    p.setup = ()=>{
        p.strokeCap(p.RECT)
        p.createCanvas(width2, height2)
        p.stroke(255)
        p.strokeWeight(4)
        p.line(0, height2/2, width2, height2/2)
        p.line(width2/2, height2, width2/2, 0)
        p.loop()
            
        p.canvas.addEventListener('click', (ev)=>{
            p.clear()
            p.stroke(255)
            p.strokeWeight(4)
            p.line(0, height2/2, width2, height2/2)
            p.line(width2/2, height2, width2/2, 0)
            display.innerText = "(" + parseInt(ev.offsetX - width2/2) +"," + parseInt(height2/2 - ev.offsetY) +")"
            p.strokeWeight(4)
            p.stroke("#f4c242") 
            p.line(ev.offsetX, ev.offsetY, ev.offsetX, height2/2)
            p.stroke("#d2e459")
            p.line(ev.offsetX, ev.offsetY, width2/2, ev.offsetY)
            p.fill("#ffffff")
            p.stroke("#ffffff")
            p.ellipse(ev.offsetX, ev.offsetY, 15)            
        })

        p.canvas.addEventListener('touchmove', (ev)=>{
            var rect = ev.target.getBoundingClientRect();
            var x = ev.targetTouches[0].pageX - rect.left;
            var y = ev.targetTouches[0].pageY - rect.top;

            p.clear()
            p.stroke(255)
            p.strokeWeight(4)
            p.line(0, height2/2, width2, height2/2)
            p.line(width2/2, height2, width2/2, 0)
            display.innerText = "z = (" + parseInt(x - width2/2) +"," + parseInt(height2/2 - y) +")"
            p.strokeWeight(4)
            p.stroke("#f4c242") 
            p.line(x, y, x, height2/2)
            p.stroke("#d2e459")
            p.line(x, y, width2/2, y)
            p.fill("#ffffff")
            p.stroke("#ffffff")
            p.ellipse(x, y, 15)            
        })
    }


    p.draw = ()=>{
    }
}

canvas2 = new p5(skecth2, 'canvas-2')