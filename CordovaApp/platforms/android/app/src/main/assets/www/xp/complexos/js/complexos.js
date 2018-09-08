const xp = new Experience(10, '#f4c242')

let canvas1,canvas2,canvas3

xp.scrollX.container.addEventListener('move', (ev)=>{
    switch(ev.detail.current){
        case 0:
            if(!document.querySelector('canvas')){
                canvas1 = new p5(skecth1, 'canvas-1')
            } 
        break;
        case 5:
            if(!document.querySelector('canvas')){
                canvas2 = new p5(skecth2, 'canvas-2')
            } 
        break;
        case 8:
            if(!document.querySelector('canvas')){
                canvas3 = new p5(skecth3, 'canvas-3')
            }
        break;
        default:
            let canvas = document.querySelectorAll('div canvas')
            for (let canva of canvas) {
                canva.remove()
            }
        break;
    }
})