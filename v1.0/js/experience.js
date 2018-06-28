class Experience{
    constructor(max, color) {
        this.xpContent = document.querySelector("div.explanation p")
        this.color = color
        this.dots
        this.contents
        this.touchStart
        this.maxText = max
        this.currentText = 0
        this.setup()
    }

    setup(){
        this.xpContent.style.color = this.color

        let dotBar = document.querySelector ("ul.dotBar")
        for (let i = 0; i < this.maxText; i++) {
            let aux = document.createElement("I")
            aux.className = "fas fa-circle"
            let aux2 = document.createElement("LI")
            aux2.appendChild(aux)
            dotBar.appendChild(aux2)
        }

        this.dots = document.querySelectorAll('ul li')

        // Starts first dot as marked
        this.dots[0].style.color = this.color

        // Add id for this.dots
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].id = i
        }
        // EventListener on this.dots
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].addEventListener("click", ev => {
                clearAll(this.dots)
                this.setCurrentContent(this.dots[i].id)
                this.dots[i].style.color = this.color
            })
        }
        this.setContent()
        this.setCurrentContent(0)
    }

    setContent() {
        this.contents = document.querySelectorAll('div.content')
        for (let i = 0; i < this.contents.length; i++) {
            this.contents[i].classList += " carousel" + i
        }
    }

    setCurrentContent(number) {
        eraseShit(this.contents)
        this.currentText = number
        this.contents[number].style.display = 'flex'
    }

    swipeContent(value) {
        if (value < 0 && this.currentText < this.maxText) {
            this.currentText++
            this.setCurrentContent(this.currentText)
            clearAll(this.dots)
            this.dots[this.currentText].style.color = this.color
        } else if (value > 0 && this.currentText > 0) {
            this.currentText--
            this.setCurrentContent(this.currentText)
            clearAll(this.dots)
            this.dots[this.currentText].style.color = this.color
        }
    }

}



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

window.addEventListener("touchstart", ev=>{
    touchStart = [ev.touches[0].screenX, ev.touches[0].screenY]
})

window.addEventListener("touchend", ev=>{
    touchEnd = [ev.changedTouches[0].screenX, ev.changedTouches[0].screenY]
    if (Math.abs(calcDist(touchStart, touchEnd)) > 120) {
        xp.swipeContent(calcDist(touchStart, touchEnd))   
    } 
})

function calcDist(start, end){
    if (start[0] < end[0]) {
        return Math.sqrt((Math.pow((start[0] - end[0]), 2) + Math.pow((start[1] - end[1]), 2)))   
    }else{
        return - Math.sqrt((Math.pow((start[0] - end[0]), 2) + Math.pow((start[1] - end[1]), 2)))   
    }
}