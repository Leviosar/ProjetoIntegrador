const xp = new Experience(8, "#daa5e2")

xp.scrollX.container.addEventListener('move', (ev)=>{
    switch(ev.detail.current){
        case 5:
            if(!document.querySelector('canvas')){
                canvas1 = new p5(skecth1, 'canvas-1')
            } 
        break;
        default:
            let canvas = document.querySelectorAll('div canvas')
            for (let canva of canvas) {
                x.soundWave.pause()
                canva.remove()
            }
        break;
    }
})