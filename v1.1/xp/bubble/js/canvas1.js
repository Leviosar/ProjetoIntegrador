let container = document.querySelector("div#canvas-1")
let width, height

// Funções inseridas no protótipo do array para trocar valores e embaralhar o array

Array.prototype.swap = function(a, b){
    let temp = this[a]
    this[a] = this[b]
    this[b] = temp
}

Array.prototype.shuffle = function() {
    var i = this.length, j, temp;
    if ( i == 0 ) return this;
    while ( --i ) {
       j = Math.floor( Math.random() * ( i + 1 ) );
       temp = this[i];
       this[i] = this[j];
       this[j] = temp;
    }
    return this;
}

let arr = []

for (let i = 1; i < 18; i++) {
    arr[i-1] = Math.floor(container.offsetWidth * 0.9/i)
}

arr = arr.shuffle()

let skecth1 = (p)=>{
    width = container.offsetWidth * 0.9, height = container.offsetHeight * 0.6
    scl = width/2/18
    frame = 3
    p.setup = ()=>{
        p.createCanvas(width, height)
        p.strokeCap(p.SQUARE);
        p.frameRate(10)
        atual = -1
        
        
        let controlPanel = document.querySelectorAll('div.controlPanel button')

        controlPanel[0].addEventListener('click', ()=>{
            if(p.frameRate() > 1) frame--
        })       
        controlPanel[1].addEventListener('click', ()=>{
            p.clear()

            for (let i = 1; i < 18; i++) {
                arr[i-1] = Math.floor(container.offsetWidth * 0.9/i)
            }
            
            arr = arr.shuffle()
            atual = -1
        }) 
        controlPanel[2].addEventListener('click', ()=>{
            if(p.frameRate() > 0){
                p.frameRate(0)
                controlPanel[2].innerHTML = '<i class="fas fa-play"></i>'
            }else{
                p.frameRate(frame)
                controlPanel[2].innerHTML = '<i class="fas fa-pause"></i>' 
            } 
        })
        controlPanel[3].addEventListener('click', ()=>{
            if(p.frameRate() < 60) frame++
        })


    }

    p.draw = ()=>{
        p.frameRate(frame)
        prox = atual + 1

        for (let i = 0; i < arr.length; i++) {
            p.stroke(255)
            p.strokeWeight(10)
            p.line(20 + 2*i*scl, height, 20 + 2*i*scl, height-arr[i])
        }

        p.stroke('#185e82')
        p.line(20 + 2*atual*scl, height, 20 + 2*atual*scl, height-arr[atual])
        p.line(20 + 2*prox*scl, height, 20 + 2*prox*scl, height-arr[prox])

        if(arr[atual] > arr[prox]){
            arr.swap(atual, prox)
            p.clear()

            for (let i = 0; i < arr.length; i++) {
                p.stroke(255)
                p.strokeWeight(10)
                p.line(20 + 2*i*scl, height, 20 + 2*i*scl, height-arr[i])
            }
            
            p.stroke('#f4c242')
            p.line(20 + 2*atual*scl, height, 20 + 2*atual*scl, height-arr[atual])
            p.line(20 + 2*prox*scl, height, 20 + 2*prox*scl, height-arr[prox])

        }

        if(atual == arr.length-2){
            atual = -1
        }

        atual++
    }
}
