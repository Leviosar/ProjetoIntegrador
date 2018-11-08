Array.prototype.remove = function(index){
    this.splice(index, 1)
}

class Blackjack{
    
    constructor(container){
        this.deck = [{suit:"hearts",value:2},{suit:"hearts",value:3},{suit:"hearts",value:4},{suit:"hearts",value:5},{suit:"hearts",value:6},{suit:"hearts",value:7},{suit:"hearts",value:8},{suit:"hearts",value:9},{suit:"hearts",value:10},{suit:"hearts",value:11},{suit:"hearts",value:12},{suit:"hearts",value:13},{suit:"hearts",value:1},{suit:"diamonds",value:2},{suit:"diamonds",value:3},{suit:"diamonds",value:4},{suit:"diamonds",value:5},{suit:"diamonds",value:6},{suit:"diamonds",value:7},{suit:"diamonds",value:8},{suit:"diamonds",value:9},{suit:"diamonds",value:10},{suit:"diamonds",value:11},{suit:"diamonds",value:12},{suit:"diamonds",value:13},{suit:"diamonds",value:1},{suit:"clubs",value:2},{suit:"clubs",value:3},{suit:"clubs",value:4},{suit:"clubs",value:5},{suit:"clubs",value:6},{suit:"clubs",value:7},{suit:"clubs",value:8},{suit:"clubs",value:9},{suit:"clubs",value:10},{suit:"clubs",value:11},{suit:"clubs",value:12},{suit:"clubs",value:13},{suit:"clubs",value:1},{suit:"spades",value:2},{suit:"spades",value:3},{suit:"spades",value:4},{suit:"spades",value:5},{suit:"spades",value:6},{suit:"spades",value:7},{suit:"spades",value:8},{suit:"spades",value:9},{suit:"spades",value:10},{suit:"spades",value:11},{suit:"spades",value:12},{suit:"spades",value:13},{suit:"spades",value:1}]
        this.remaining = [{suit:"hearts",value:2},{suit:"hearts",value:3},{suit:"hearts",value:4},{suit:"hearts",value:5},{suit:"hearts",value:6},{suit:"hearts",value:7},{suit:"hearts",value:8},{suit:"hearts",value:9},{suit:"hearts",value:10},{suit:"hearts",value:11},{suit:"hearts",value:12},{suit:"hearts",value:13},{suit:"hearts",value:1},{suit:"diamonds",value:2},{suit:"diamonds",value:3},{suit:"diamonds",value:4},{suit:"diamonds",value:5},{suit:"diamonds",value:6},{suit:"diamonds",value:7},{suit:"diamonds",value:8},{suit:"diamonds",value:9},{suit:"diamonds",value:10},{suit:"diamonds",value:11},{suit:"diamonds",value:12},{suit:"diamonds",value:13},{suit:"diamonds",value:1},{suit:"clubs",value:2},{suit:"clubs",value:3},{suit:"clubs",value:4},{suit:"clubs",value:5},{suit:"clubs",value:6},{suit:"clubs",value:7},{suit:"clubs",value:8},{suit:"clubs",value:9},{suit:"clubs",value:10},{suit:"clubs",value:11},{suit:"clubs",value:12},{suit:"clubs",value:13},{suit:"clubs",value:1},{suit:"spades",value:2},{suit:"spades",value:3},{suit:"spades",value:4},{suit:"spades",value:5},{suit:"spades",value:6},{suit:"spades",value:7},{suit:"spades",value:8},{suit:"spades",value:9},{suit:"spades",value:10},{suit:"spades",value:11},{suit:"spades",value:12},{suit:"spades",value:13},{suit:"spades",value:1}]
        this.used = new Array()
        this.deckContainer = container.querySelector('div:first-child > div:last-child > span')
        this.resetContainer = container.querySelector('div:first-child > div:last-child > span:last-child')
        this.totalContainer = container.querySelector('div:first-child > div:first-child > span')
        this.cvContainer = container.querySelector('div:first-child > div:first-child > span:last-child')
        this.handContainer = container.querySelector('.hand')
        this.counting = 0
        console.log(this)
        this.attachEvents()
    }

    attachEvents(){
        this.deckContainer.addEventListener('click', ()=>{
            if(this.pickRandomCard()){
                this.deckContainer.classList.add('blink_button')
                setTimeout(()=>{
                    this.deckContainer.classList.remove('blink_button')
                }, 300)
                this.remaining.remove(this.used[this.used.length-1])
                this.counting += this.deck[this.used[this.used.length-1]].value
                this.totalContainer.innerText = 'Total: '+this.counting
                this.cvContainer.innerText = 'CV: '+ this.calcVictory().toPrecision(3) + '%'
                this.showCard()
            }
        })

        this.resetContainer.addEventListener('click', ()=>{
            this.resetContainer.classList.add('blink_button')
            setTimeout(()=>{
                this.resetContainer.classList.remove('blink_button')
            }, 300)
            this.resetGame()
        })
    }

    showCard(){
        let div = document.createElement('div')

        let cardHeader = document.createElement('div')
        cardHeader.innerText = this.deck[this.used[this.used.length-1]].value
        let cardCenter = document.createElement('img')
        cardCenter.src = 'src/'+this.deck[this.used[this.used.length-1]].suit+'.png'

        div.appendChild(cardHeader)
        div.appendChild(cardCenter)
        
        this.handContainer.appendChild(div)
    }

    calcVictory(){
        if (this.counting == 21){
            this.totalContainer.style.color = '#d2e459'
            return 100  
        } 
        if (this.counting > 21){
            this.totalContainer.style.color = '#ff8585'
            return 0
        } 

        let delta = 21 - this.counting
        let acertos = 0

        for (let i = 0; i < this.remaining.length; i++) {
            if (this.remaining[i].value == delta) acertos++
        }
    
        return (acertos/this.remaining.length) * 100

    }

    pickRandomCard(){
        if (this.counting >= 21) return false
        if (this.used.length == 52) return false
        
        let picked = Math.floor(Math.random() * ((this.deck.length - 1) - 0 + 1)) + 0
        
        if (this.used.includes(picked)) this.pickRandomCard()
        
        else{
            this.used.push(picked)
            return picked
        }
    }

    resetGame(){
        this.handContainer.innerHTML = ''
        this.remaining = [{suit:"hearts",value:2},{suit:"hearts",value:3},{suit:"hearts",value:4},{suit:"hearts",value:5},{suit:"hearts",value:6},{suit:"hearts",value:7},{suit:"hearts",value:8},{suit:"hearts",value:9},{suit:"hearts",value:10},{suit:"hearts",value:11},{suit:"hearts",value:12},{suit:"hearts",value:13},{suit:"hearts",value:1},{suit:"diamonds",value:2},{suit:"diamonds",value:3},{suit:"diamonds",value:4},{suit:"diamonds",value:5},{suit:"diamonds",value:6},{suit:"diamonds",value:7},{suit:"diamonds",value:8},{suit:"diamonds",value:9},{suit:"diamonds",value:10},{suit:"diamonds",value:11},{suit:"diamonds",value:12},{suit:"diamonds",value:13},{suit:"diamonds",value:1},{suit:"clubs",value:2},{suit:"clubs",value:3},{suit:"clubs",value:4},{suit:"clubs",value:5},{suit:"clubs",value:6},{suit:"clubs",value:7},{suit:"clubs",value:8},{suit:"clubs",value:9},{suit:"clubs",value:10},{suit:"clubs",value:11},{suit:"clubs",value:12},{suit:"clubs",value:13},{suit:"clubs",value:1},{suit:"spades",value:2},{suit:"spades",value:3},{suit:"spades",value:4},{suit:"spades",value:5},{suit:"spades",value:6},{suit:"spades",value:7},{suit:"spades",value:8},{suit:"spades",value:9},{suit:"spades",value:10},{suit:"spades",value:11},{suit:"spades",value:12},{suit:"spades",value:13},{suit:"spades",value:1}]
        this.used = new Array()
        this.totalContainer.innerText = 'Total: 0'
        this.cvContainer.innerText = 'CV: 0%'
        this.counting = 0
        this.totalContainer.style.color = '#ffffff'
    }
}