let container3 = document.querySelector("div#canvas-2")
let width3, height33

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



let skecth3 = (p)=>{

    width3 = container3.offsetWidth * 0.9, height3 = container3.offsetHeight * 0.3
    scl = width3/2/18
    frame = 3
    min = 900000
    index = 0
    total = 0
    let arr3 = []
    p.setup = ()=>{


        for (let i = 1; i < 18; i++) {
            arr3[i-1] = Math.floor(container3.offsetHeight * 0.3/i)
        }
    
        arr3 = arr3.shuffle()

        p.createCanvas(width3, height3)
        p.strokeCap(p.SQUARE);
        p.frameRate(40)
        atual3 = 0
        console.log(arr3)
    }

    p.draw = ()=>{
        p.clear()
        p.frameRate(40)
        
        // Printa todos os indexes em branco
        for (let i = 0; i < arr3.length; i++) {
            p.stroke(255)
            p.strokeWeight(10)
            p.line(20 + 2*i*scl, height3, 20 + 2*i*scl, height3-arr3[i])
        }


        if(atual3 < arr3.length){
            if(arr3[atual3] < min){
                min = arr3[atual3]
                index = atual3
            }
        
            p.stroke('#f4c242')
            p.line(20 + 2*index*scl, height3, 20 + 2*index*scl, height3-arr3[index])
            p.stroke('#185e82')
            p.line(20 + 2*atual3*scl, height3, 20 + 2*atual3*scl, height3-arr3[atual3])

            atual3++
        }else{
            arr3.swap(total, index)
            min = 900000
            total = total + 1
            atual3 = total
        }
        
        // Caso a iteração tenha terminado, printa todos os indexes em azul
        if(total == arr.length){
            p.clear()
            for (let i = 0; i < arr3.length; i++) {
                p.stroke('#185e82')
                p.strokeWeight(10)
                p.line(20 + 2*i*scl, height3, 20 + 2*i*scl, height3-arr3[i])
            }  
            p.frameRate(0)
        } 
    }
}
