class Experience{
    constructor(id,max, color) {
        this.xpContent = document.querySelector("body > main > header > p")
        this.color = color
        this.id = id
        this.dots
        this.contents
        this.touchStart
        this.maxText = max
        this.currentText = 0
        this.endButton = document.querySelector("button.button")
        this.scrollX
        this.canvasTouch = false
        this.setup()
    }

    setup(){

        let c_user = new Usuario()
        let callback = ()=>{}
        c_user.getInfo(callback)

        let finalContainer = document.createElement('div')
        let coinContainer = document.createElement('div')
        let p = document.createElement('p')
        let coinImg = document.createElement('img')
        p.innerText = '+100'
        coinImg.src = '../../img/coin/coin.gif'
        coinContainer.className = 'coinContainer'
        coinContainer.appendChild(coinImg)
        coinContainer.appendChild(p)
        
        // Creating a container for xp rating
        let ratingContainer = document.createElement('div')
        finalContainer.appendChild(ratingContainer)
        finalContainer.appendChild(coinContainer)
        let rating = new Rating(ratingContainer, this.color)

        // Initiate rating module on the xp end
        this.endButton.addEventListener('click', ()=>{
            swal({
                title: 'Avalie a experiência',
                content: finalContainer
            }).then(
                ()=>{
                    let keys = {
                        idexperiencia: this.id,
                        value: rating.value,
                        idusuario: c_user.idUsuario
                    }
                    this.request('rateXp', keys,
                    ()=>{
                        c_user.addView(100, this.id, ()=>{window.location = '../../xplist.html'})
                    })
                }
            )
        })

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
            this.scrollX.slide(this.scrollX.current+2)
            
            if(this.scrollX.current == this.scrollX.max)
                this.endButton.style.display = "inline-block"
            else
                this.endButton.style.display = 'none'
        } else if (value > 0 && this.scrollX.current > 0) {
            clearAll(this.dots)
            this.dots[this.scrollX.current-1].style.color = this.color
            this.scrollX.slide(this.scrollX.current)
            if(this.scrollX.current == this.scrollX.max)
            
                this.endButton.style.display = "inline-block"
            else
                this.endButton.style.display = 'none'
        }
    }

    async request(opt, payload, callback = ()=>{}, errorCallback = ()=>{}){
        let url = "http://www.labmatii.ifc-camboriu.edu.br/oob/backend/router.php?"
        let token = "&token=" + window.sessionStorage.getItem('token')
        let option = "option=" + opt;
        let req = await fetch(url + option + token, 
        {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        if(await req.status === 200){
            callback(await req.text())
        }else{
            errorCallback(await req.text())
        }
    }
}

window.addEventListener("touchstart", ev=>{

    if (ev.target.toString().includes('Canvas')) xp.canvasTouch = true
    else xp.canvasTouch = false

    touchStart = [ev.touches[0].screenX, ev.touches[0].screenY]

})

window.addEventListener("touchend", ev=>{
    touchEnd = [ev.changedTouches[0].screenX, ev.changedTouches[0].screenY]

    if (xp.canvasTouch) {
        if (Math.abs(touchStart[0] - touchEnd[0]) > innerWidth * 0.6) {
            xp.swipeContent(-(touchStart[0] - touchEnd[0]))   
        }
    }else{
        if (Math.abs(touchStart[0] - touchEnd[0]) > innerWidth * 0.2) {
            xp.swipeContent(-(touchStart[0] - touchEnd[0]))   
        } 
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
