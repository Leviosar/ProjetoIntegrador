const xp = new Experience(3,10, '#d2e459')

let canvas1,canvas2,canvas3,canvas4

xp.scrollX.container.addEventListener('move', (ev)=>{
    switch(ev.detail.current){
        case 1:
            if(!document.querySelector('canvas')){
                canvas1 = new p5(skecth1, 'canvas-1')
            } 
        break;
        case 3:
            if(!document.querySelector('canvas')){
                canvas2 = new p5(skecth2, 'canvas-2')
            } 
        break;
        case 6:
            if(!document.querySelector('canvas')){
                canvas3 = new p5(skecth3, 'canvas-3')
            } 
        break;
        case 8:
            if(!document.querySelector('canvas')){
                canvas4 = new p5(skecth4, 'canvas-4')
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