const xp = new Experience(6, 10, '#f4c242')
const game = new Blackjack(document.querySelector('div#blackjack'))
let windows = document.querySelectorAll('body > main > section > div')
let canvas1,canvas2,canvas3,canvas4

xp.scrollX.container.addEventListener('move', (ev)=>{
    switch(ev.detail.current){
        case 7:
            console.log('cu')
            if(!windows[ev.detail.current].querySelector('canvas')){
                canvas4 = new p5(skecth4, 'canvas-4')
            } 
        break;
        default:
            let canvas = document.querySelectorAll('div canvas')
            for (let canva of canvas) {
                // canva.remove()
            }
        break;
    }
})