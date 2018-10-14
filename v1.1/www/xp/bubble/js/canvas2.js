let container2 = document.querySelector("div#canvas-2")
let width2, height22

// Funções inseridas no protótipo do array para trocar valores e embaralhar o array

function sortNumber(a,b){
    return a - b
}

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

let skecth2 = (p)=>{
    


        
    let arr2 = []
    width2 = container2.offsetWidth * 0.9, height2 = container2.offsetHeight * 0.3
    scl = width2/2/18
    frame = 3
    total = 0
    p.setup = ()=>{


        for (let i = 1; i < 18; i++) {
            arr2[i-1] = Math.floor(container2.offsetHeight * 0.3/i)
        }
    
        arr2 = arr2.shuffle()

        p.createCanvas(width2, height2)
        p.strokeCap(p.SQUARE);
        p.frameRate(40)
        atual2 = -1
    }

    p.draw = ()=>{
        p.frameRate(40)
        prox = atual2 + 1

        for (let i = 0; i < arr2.length; i++) {
            p.stroke(255)
            p.strokeWeight(10)
            p.line(20 + 2*i*scl, height2, 20 + 2*i*scl, height2-arr2[i])
        }

        p.stroke('#185e82')
        p.line(20 + 2*atual2*scl, height2, 20 + 2*atual2*scl, height2-arr2[atual2])
        p.line(20 + 2*prox*scl, height2, 20 + 2*prox*scl, height2-arr2[prox])

        if(arr2[atual2] > arr2[prox]){
            arr2.swap(atual2, prox)
            p.clear()

            for (let i = 0; i < arr2.length; i++) {
                p.stroke(255)
                p.strokeWeight(10)
                p.line(20 + 2*i*scl, height2, 20 + 2*i*scl, height2-arr2[i])
            }
            
            p.stroke('#f4c242')
            p.line(20 + 2*atual2*scl, height2, 20 + 2*atual2*scl, height2-arr2[atual2])
            p.line(20 + 2*prox*scl, height2, 20 + 2*prox*scl, height2-arr2[prox])

        }else{
            total++
        }

        if(total == arr2.length){
            p.clear()
            for (let i = 0; i < arr2.length; i++) {
                p.stroke('#185e82')
                p.strokeWeight(10)
                p.line(20 + 2*i*scl, height2, 20 + 2*i*scl, height2-arr2[i])
            }
            p.frameRate(0)
        }

        if(atual2 == arr2.length-2){
            total = 0
            atual2 = -1
        }

        atual2++
    }
}


