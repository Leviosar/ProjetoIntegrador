class Rating{
    constructor(container, color){
        this.container = container
        this.color = color
        this.buttons = []
        this.create()
        this.clear()
        this.value
    }

    create(){
        
        this.container.style.display = 'flex'
        this.container.style.width = '100%'
        this.container.style.justifyContent = 'center'
        this.container.style.fontSize = '3em'

        for (let i = 0; i < 5; i++) {
            let div = document.createElement('DIV')
            let star = document.createElement('I')
            star.className = 'fas fa-star'
            star.style.color = '#3390c9'
            div.appendChild(star)
            div.dataset.value = i
            this.buttons.push(div)
            this.container.appendChild(div)

            div.addEventListener('click', ()=>{
                this.rate(i+1)
            })

        }
    }

    clear(){
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].firstChild.style.color = '#3390c9'
        }
    }

    rate(index){
        this.clear()
        this.value = index
        for (let i = 0; i < index; i++) {
            this.buttons[i].firstChild.style.color = this.color
        }
    }
}