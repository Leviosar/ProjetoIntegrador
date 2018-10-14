const xp = new Experience(5, 10, '#185e82')

let canvas1,canvas2,canvas3
resetEvents()

function resetEvents(){
    let listContainer = document.querySelector('div.listContainer')
    let listButtons = document.querySelectorAll('div.listContainer > button')

    for (let i = 0; i < listButtons.length; i++) {
        listButtons[i].onclick = ()=>{
            listContainer.insertBefore(listButtons[i], listButtons[i-1])
            resetEvents()
        }
    }    
}

xp.scrollX.container.addEventListener('move', (ev)=>{
    switch(ev.detail.current){
        case 5:
            if(!document.querySelector('canvas')){
                canvas1 = new p5(skecth1, 'canvas-1')
            } 
        break;
        case 8:
            if(!document.querySelector('canvas')){
                canvas2 = new p5(skecth2, 'canvas-2')
                canvas3 = new p5(skecth3, 'canvas-2')
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