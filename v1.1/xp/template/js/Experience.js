class Experience{
    constructor(max, color) {
        this.xpContent = document.querySelector("div.explanation p")
        this.color = color
        this.dots
        this.contents
        this.touchStart
        this.maxText = max
        this.currentText = 0
        this.endButton = document.querySelector("button.button")
        this.scrollX
        this.setup()
    }

    setup(){
        // Set experience color on the labels
        this.xpContent.style.color = this.color

        // Hides end button until the final window
        this.endButton.style.display = "none"

        // Create a dot bar
        let dotBar = document.querySelector ("ul.dotBar")
        for (let i = 0; i < this.maxText; i++) {
            let aux = document.createElement("I")
            aux.className = "fas fa-circle"
            let aux2 = document.createElement("LI")
            aux2.appendChild(aux)
            dotBar.appendChild(aux2)
        }

        this.scrollX = new Scroller(".content-container", this.maxText, "ul.dotBar li")

        // Sets this.dots as the li on this page (minor problem, cannot use li on other elements, should use a class here)
        this.dots = document.querySelectorAll('ul li')

        // Starts first dot as marked
        this.dots[0].style.color = this.color

        // Add id for this.dots
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].dataset.pos = i+1
            this.dots[i].id = i
        }

        this.dots.forEach(dot =>{
            dot.addEventListener('click',ev=>{
                this.scrollX.slide(dot.dataset.pos)
                clearAll(this.dots)
                dot.style.color = this.color
                
                if(this.scrollX.current == this.scrollX.max)
                    this.endButton.style.display = "inline-block"
                else
                    this.endButton.style.display = 'none'
            })
        })
    }



    swipeContent(value) {
        if (value < 0 && this.scrollX.current < this.scrollX.max) {
            clearAll(this.dots)
            this.dots[this.scrollX.current+1].style.color = this.color
            console.log(this.scrollX)
            this.scrollX.slide(this.scrollX.current+2)
        } else if (value > 0 && this.scrollX.current > 0) {
            clearAll(this.dots)
            this.dots[this.scrollX.current-1].style.color = this.color
            this.scrollX.slide(this.scrollX.current)
        }
    }
}

window.addEventListener("touchstart", ev=>{
    touchStart = [ev.touches[0].screenX, ev.touches[0].screenY]
})

window.addEventListener("touchend", ev=>{
    touchEnd = [ev.changedTouches[0].screenX, ev.changedTouches[0].screenY]
    
    if (Math.abs(touchStart[0] - touchEnd[0]) > 120) {
        xp.swipeContent(-(touchStart[0] - touchEnd[0]))   
    } 
})

function clearAll(array){
    for (let i = 0; i < array.length; i++) {
        array[i].style.color = "#fff"
    }
}

function eraseShit(array){
    for (let i = 0; i < array.length; i++) {
        array[i].style.display = 'none'
    }
}
