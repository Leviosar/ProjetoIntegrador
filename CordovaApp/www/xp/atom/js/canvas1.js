let container = document.querySelector("div#canvas-1")
let width, height


let skecth1 = (p)=>{

    p.setup = ()=>{
        p.createCanvas(container.offsetWidth, container.offsetHeight, p.WEBGL)
        p.frameRate(60)
    }

    p.draw = ()=>{
        p.clear()
        p.ambientLight(255)
        p.pointLight(255,255,255, p.mouseX-200, p.mouseY-200, 1000)
        p.specularMaterial('#ff8585')
        p.noStroke()
        // p.translate(p.mouseX - p.width/2, p.mouseY - p.height/2)
        p.sphere(100,24,24)
    }

    p.mouseClicked = ()=>{

    }

    p.touchMoved = ()=>{

    }
}

canvas1 = new p5(skecth1, 'canvas-1')
