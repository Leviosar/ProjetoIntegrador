class Scroller {
    constructor(container, max, triggers) {
        this.container = document.querySelector(container)
        this.windows = this.container.querySelectorAll('.window')
        this.currentWindow = this.windows[0]
        this.current = 0
        this.toLeft = (container.scrollWidth > container.offsetWidth)
        this.steps = document.querySelectorAll(triggers)
        this.max = max-1
        this.setup()
    }

    setup() {
        this.steps[0].style.transform = 'scale(1.3)'
    }

    slideTimes(step) {
        this.slide(this.current + step)
    }

    slide(step) {
        this.steps.forEach(element => {

            if (element.dataset.pos == step || step == this.max + 2 && element.dataset.pos == 1)
                element.style.transform = 'scale(1.3)'

            else 
                element.style.transform = 'scale(1)'
        })
        this.current = step - 1

        if (this.current < 0 || this.current > this.max)
            this.current = 0

        if (this.windows.length - 1 <= this.current)
            this.current = this.windows.length - 1

    
        return this.container.style.transform = `translate3d(${this.current * -100}%,0,0)`
    }

    next() {
        return this.slide(1)
    }

    prev() {
        return this.slide(-1)
    }
}

