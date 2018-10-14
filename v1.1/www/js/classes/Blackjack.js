Array.prototype.remove = function(index){
    this.splice(index, 1)
}

class Blackjack{
    
    constructor(container){
        this.closeButton = document.querySelector('button.closeButton')
        this.bet = 1
        this.betButtons = {
            raise: document.querySelector('main > section > div#blackjack > div:last-child > div:first-child > span:first-child > button:first-child'),
            lower: document.querySelector('main > section > div#blackjack > div:last-child > div:first-child > span:first-child > button:last-child')
        }
        this.betContainer = document.querySelector('main > section > div#blackjack > div:last-child > div:first-child > span:last-child > span.bet > p')
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
            this.used.push(this.randomCard())
            this.counting += this.deck[this.used[this.used.length-1]].value
            this.remaining.remove(this.used[this.used.length-1])
            this.showCard(this.handContainer)

            if (this.counting >= 21) this.fold = true

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
            if (this.fold && this.aiFold) this.calcFinal()
            this.aiChoice()
        })

        this.betButtons.raise.addEventListener('click', ()=>{
            this.bet++
            this.betContainer.innerText = this.bet
        })

        this.betButtons.lower.addEventListener('click', ()=>{
            if (this.bet > 1) {
                this.bet--
                this.betContainer.innerText = this.bet
            }
        })

        this.closeButton.addEventListener('click', ()=>{
            window.location = '../extras.html'
        })
    }   

    aiChoice(){

        // Caso a IA não tenha estourado ainda, ela irá verificar suas chances de vitória

        if (!this.aiFold && !(this.aiCounting >= 21)) {   

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

            // Caso a chance de derrota seja maior do que 2/3 e a gambiarra não 'funcione', escolhe uma carta randômica do baralho

            if (loss/this.remaining.length < 0.66 || r == 10) {
                this.used.push(this.randomCard())
                this.aiCounting += this.deck[this.used[this.used.length-1]].value
                this.remaining.remove(this.used[this.used.length-1])
                this.showCard(this.aiHandContainer)

                if (this.aiCounting >= 21) this.aiFold = true

                if (this.fold && this.aiCounting < 21) {
                    this.aiChoice()       
                }
            }else{
                this.aiFold = true
            }
            
            if (this.fold && this.aiFold) {
                this.calcFinal()
            }
        }
    }

    randomCard(){
        let picked

        do picked = Math.floor( Math.random() * ((this.deck.length - 1) - 0 + 1)) + 0 
        while(this.used.includes(picked)) 

        return picked
    }

    showCard(hand){
        let div = document.createElement('div')

        let cardHeader = document.createElement('div')
        cardHeader.innerText = this.deck[this.used[this.used.length-1]].value
        let cardCenter = document.createElement('img')
        cardCenter.src = '../../img/cards/'+this.deck[this.used[this.used.length-1]].suit+'.png'

        div.appendChild(cardHeader)
        div.appendChild(cardCenter)
        
        hand.appendChild(div)
    }

    calcFinal(){
        // 0 - Draw
        // 1 - Win
        // 2 - Loose
        let result

        if (this.counting == 21 && this.aiCounting != 21) result = 1
        if (this.counting != 21 && this.aiCounting == 21) result = 2

        if (this.counting > 21 && this.aiCounting > 21) {
            if (this.counting - 21 > this.aiCounting - 21) result = 2
            if (this.counting - 21 < this.aiCounting - 21) result = 1
        }

        if (this.counting < 21 && this.aiCounting < 21) {
            if (21 - this.counting > 21 - this.aiCounting) result = 2
            if (21 - this.counting < 21 - this.aiCounting) result = 1
        }

        if (this.counting > 21 && this.aiCounting < 21) result = 2
        if (this.counting < 21 && this.aiCounting > 21) result = 1

        if (this.counting == this.aiCounting) result = 0

        if (result == 1) {
            c_user.addCoin(this.bet*2)
            let c = swal({
                title: 'Você ganhou!',
                text: '+ '+this.bet*2  +' moedinhas',
                buttons: false,
                timer:600
            })
        }else if(result == 2){
            c_user.addCoin(this.bet*-1)
            let c = swal({
                title: 'Você perdeu :(',
                text: '- '+this.bet  +' moedinhas',
                buttons: false,
                timer:600
            })
        }

        this.resetGame()
    }

    resetGame(){
        this.handContainer.innerHTML = ''
        this.aiHandContainer.innerHTML = ''
        if (this.used.length > 30) {
            this.used = new Array()
        }
        this.counting = 0
        this.aiCounting = 0
        this.aiFold = false
        this.fold = false
    }
}