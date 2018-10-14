Array.prototype.remove = function(index){
    this.splice(index, 1)
}

class Blackjack{
    
    constructor(container){
        this.deck = [{suit:"hearts",value:2},{suit:"hearts",value:3},{suit:"hearts",value:4},{suit:"hearts",value:5},{suit:"hearts",value:6},{suit:"hearts",value:7},{suit:"hearts",value:8},{suit:"hearts",value:9},{suit:"hearts",value:10},{suit:"hearts",value:11},{suit:"hearts",value:12},{suit:"hearts",value:13},{suit:"hearts",value:1},{suit:"diamonds",value:2},{suit:"diamonds",value:3},{suit:"diamonds",value:4},{suit:"diamonds",value:5},{suit:"diamonds",value:6},{suit:"diamonds",value:7},{suit:"diamonds",value:8},{suit:"diamonds",value:9},{suit:"diamonds",value:10},{suit:"diamonds",value:11},{suit:"diamonds",value:12},{suit:"diamonds",value:13},{suit:"diamonds",value:1},{suit:"clubs",value:2},{suit:"clubs",value:3},{suit:"clubs",value:4},{suit:"clubs",value:5},{suit:"clubs",value:6},{suit:"clubs",value:7},{suit:"clubs",value:8},{suit:"clubs",value:9},{suit:"clubs",value:10},{suit:"clubs",value:11},{suit:"clubs",value:12},{suit:"clubs",value:13},{suit:"clubs",value:1},{suit:"spades",value:2},{suit:"spades",value:3},{suit:"spades",value:4},{suit:"spades",value:5},{suit:"spades",value:6},{suit:"spades",value:7},{suit:"spades",value:8},{suit:"spades",value:9},{suit:"spades",value:10},{suit:"spades",value:11},{suit:"spades",value:12},{suit:"spades",value:13},{suit:"spades",value:1}]
        this.remaining = [{suit:"hearts",value:2},{suit:"hearts",value:3},{suit:"hearts",value:4},{suit:"hearts",value:5},{suit:"hearts",value:6},{suit:"hearts",value:7},{suit:"hearts",value:8},{suit:"hearts",value:9},{suit:"hearts",value:10},{suit:"hearts",value:11},{suit:"hearts",value:12},{suit:"hearts",value:13},{suit:"hearts",value:1},{suit:"diamonds",value:2},{suit:"diamonds",value:3},{suit:"diamonds",value:4},{suit:"diamonds",value:5},{suit:"diamonds",value:6},{suit:"diamonds",value:7},{suit:"diamonds",value:8},{suit:"diamonds",value:9},{suit:"diamonds",value:10},{suit:"diamonds",value:11},{suit:"diamonds",value:12},{suit:"diamonds",value:13},{suit:"diamonds",value:1},{suit:"clubs",value:2},{suit:"clubs",value:3},{suit:"clubs",value:4},{suit:"clubs",value:5},{suit:"clubs",value:6},{suit:"clubs",value:7},{suit:"clubs",value:8},{suit:"clubs",value:9},{suit:"clubs",value:10},{suit:"clubs",value:11},{suit:"clubs",value:12},{suit:"clubs",value:13},{suit:"clubs",value:1},{suit:"spades",value:2},{suit:"spades",value:3},{suit:"spades",value:4},{suit:"spades",value:5},{suit:"spades",value:6},{suit:"spades",value:7},{suit:"spades",value:8},{suit:"spades",value:9},{suit:"spades",value:10},{suit:"spades",value:11},{suit:"spades",value:12},{suit:"spades",value:13},{suit:"spades",value:1}]
        this.used = new Array()
        this.deckContainer = container.querySelector('div:last-child > div:last-child > button:last-child')
        this.resetContainer = container.querySelector('div:last-child > div:last-child > button:first-child')
        this.totalContainer = container.querySelector('div:first-child > div:first-child > span')
        this.cvContainer = container.querySelector('div:first-child > div:first-child > span:last-child')
        this.handContainer = container.querySelector('.hand > div:last-child')
        this.counting = 0
        this.fold = false
        this.aiHandContainer = container.querySelector('.hand > div:first-child')
        this.aiCounting = 0
        this.aiFold = false
        this.attachEvents()
    }

    attachEvents(){

        // Inicia um novo turno com um "draw" do usuário
        
        this.deckContainer.addEventListener('click', ()=>{

            // Caso o usuário esteja apto a puxar cartas, escolhe uma randomicamente do monte e a mostra na mão do jogador

            if(this.pickRandomCard()){

                this.showCard(this.handContainer)
            }

            // Após meio segundo, a IA faz sua escolha de comprar ou não a carta

            setTimeout(
                ()=>{
                    this.aiChoice()
                }, 
            500)
        })

        // Faz com que o jogador "fuja" da partida, deixando apenas a IA no jogo até que a mesma fuja

        this.resetContainer.addEventListener('click', ()=>{
            this.fold = true
            this.aiChoice()
        })
    }

    calcFinal(){
        let winner = 0
        if (this.counting == 21 && this.aiCounting != 21) winner = 'tu'
        if (this.counting != 21 && this.aiCounting == 21) winner = 'ele'

        if (this.counting > 21 && this.aiCounting > 21) {
            if (this.counting - 21 > this.aiCounting - 21) winner = 'ele'
            if (this.counting - 21 < this.aiCounting - 21) winner = 'tu'
        }

        if (this.counting < 21 && this.aiCounting < 21) {
            if (21 - this.counting > 21 - this.aiCounting) winner = 'ele'
            if (21 - this.counting < 21 - this.aiCounting) winner = 'tu'
        }

        if (this.counting > 21 && this.aiCounting < 21) winner = 'ele'
        if (this.counting < 21 && this.aiCounting > 21) winner = 'tu'

        alert(winner)
        this.resetGame()
    }

    aiChoice(){

        // Caso a IA
        if (!this.aiFold && !(this.aiFold >= 21)) {   

            // Calcula quantos pontos faltam para chegar a 21
            let delta = 21 - this.aiCounting

            // Instancia dois contadores para possibilidades de derrotas diretas e vitórias diretas
            let loss = 0, win = 0

            // Percorre as cartas restantes para ver quais as chances de derrotas e vitórias diretas
            for (let i = 0; i < this.remaining.length; i++) {
                if (this.remaining[i].value > delta) loss ++
                if (this.remaining[i].value == delta) win ++
            }

            // Um random ligeiramente gambiarra para gerar uma margem de erro
            let r = Math.floor(Math.random() * 15)

            // Caso a change de derrota seja maior do que 2/3 e a gambiarra não 'funcione', escolhe uma carta randômica do baralho

            if (loss/this.remaining.length < 0.66 || r == 10) {
                let picked = Math.floor(Math.random() * ((this.deck.length - 1) - 0 + 1)) + 0
                
                if (this.used.includes(picked)) this.pickRandomCard()

                else{
                    this.used.push(picked)
                    this.aiCounting += this.deck[this.used[this.used.length-1]].value
                    this.showCard(this.aiHandContainer)

                    
                    if (this.counting == 21 || this.fold && this.aiCounting < 21) {
                        this.aiChoice()       
                    }
                }
            }else{
                this.aiFold = true
            }
        }else{
            console.log(this.counting > 21)
            if (this.counting > 21) {
                console.log('cabou')
                this.calcFinal()
            }
        }
    }

    showCard(hand){
        let div = document.createElement('div')

        let cardHeader = document.createElement('div')
        cardHeader.innerText = this.deck[this.used[this.used.length-1]].value
        let cardCenter = document.createElement('img')
        cardCenter.src = 'img/'+this.deck[this.used[this.used.length-1]].suit+'.png'

        div.appendChild(cardHeader)
        div.appendChild(cardCenter)
        
        hand.appendChild(div)
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
        if (this.counting >= 21){
            this.fold = true
            return false
        } 

        if (this.used.length == 52) return false
        
        let picked = Math.floor(Math.random() * ((this.deck.length - 1) - 0 + 1)) + 0
        
        if (this.used.includes(picked)) this.pickRandomCard()
        
        else{
            this.used.push(picked)
            this.counting += this.deck[this.used[this.used.length-1]].value
            this.remaining.remove(this.used[this.used.length-1])
            return picked
        }
    }

    resetGame(){
        this.handContainer.innerHTML = ''
        this.aiHandContainer.innerHTML = ''
        this.remaining = [{suit:"hearts",value:2},{suit:"hearts",value:3},{suit:"hearts",value:4},{suit:"hearts",value:5},{suit:"hearts",value:6},{suit:"hearts",value:7},{suit:"hearts",value:8},{suit:"hearts",value:9},{suit:"hearts",value:10},{suit:"hearts",value:11},{suit:"hearts",value:12},{suit:"hearts",value:13},{suit:"hearts",value:1},{suit:"diamonds",value:2},{suit:"diamonds",value:3},{suit:"diamonds",value:4},{suit:"diamonds",value:5},{suit:"diamonds",value:6},{suit:"diamonds",value:7},{suit:"diamonds",value:8},{suit:"diamonds",value:9},{suit:"diamonds",value:10},{suit:"diamonds",value:11},{suit:"diamonds",value:12},{suit:"diamonds",value:13},{suit:"diamonds",value:1},{suit:"clubs",value:2},{suit:"clubs",value:3},{suit:"clubs",value:4},{suit:"clubs",value:5},{suit:"clubs",value:6},{suit:"clubs",value:7},{suit:"clubs",value:8},{suit:"clubs",value:9},{suit:"clubs",value:10},{suit:"clubs",value:11},{suit:"clubs",value:12},{suit:"clubs",value:13},{suit:"clubs",value:1},{suit:"spades",value:2},{suit:"spades",value:3},{suit:"spades",value:4},{suit:"spades",value:5},{suit:"spades",value:6},{suit:"spades",value:7},{suit:"spades",value:8},{suit:"spades",value:9},{suit:"spades",value:10},{suit:"spades",value:11},{suit:"spades",value:12},{suit:"spades",value:13},{suit:"spades",value:1}]
        if (this.used.length > 40) {
            this.used = new Array()
        }
        this.counting = 0
        this.aiCounting = 0
        this.aiFold = false
        this.fold = false
    }
}