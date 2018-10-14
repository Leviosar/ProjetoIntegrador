class Extra{
    constructor(id, status, name, value, container, swal){
        this.id = id
        this.status = status
        this.container = container
        this.value = value
        this.name = name
        this.button
        this.footer
        this.swalInfo = swal
        this.build()
    }

    unlock(){
        this.button.remove()
        this.button = document.createElement('button')
        this.button.innerHTML = '<i class="fas fa-play"></i>'
        this.footer.appendChild(this.button)
        this.button.addEventListener('click', ()=>{
            window.location = this.id+'/'+this.id+'.html'
        })
    }

    build(){
        let divExtra = document.createElement('div')
        divExtra.classList.add('extra')

        let divHeader = document.createElement('div')
        divHeader.classList.add('extra-header')
        divHeader.innerText = this.name

        let divDisplay = document.createElement('div')
        divDisplay.classList.add('extra-display')
        let imgDisplay = document.createElement('img')
        imgDisplay.src = '../img/extras/' + this.id + '.jpg'
        divDisplay.appendChild(imgDisplay)

        this.footer = document.createElement('div')
        this.footer.classList.add('extra-footer')

        let info = document.createElement('button')
        info.innerHTML = '<i class="fas fa-medal"></i>'


        info.addEventListener('click', ()=>{
            
            let loading = document.createElement('img')
            loading.src = '../img/loading5.gif'
            swal({
                title: 'Fazendo requisições super pesadas',
                content: loading
            })

            c_user.getRanking(this.id, async (response)=>{

                response = await JSON.parse(response)
                let container = document.createElement('div')
                for (let i = 0; i < response.length; i++) {
                    let item = document.createElement('div')
                    let id = document.createElement('div')
                    id.innerText = i+1
                    let nome = document.createElement('div')
                    nome.innerText = response[i].nome
                    let pontuacao = document.createElement('div')
                    pontuacao.innerText = response[i].pontuacao

                    item.appendChild(id)
                    item.appendChild(nome)
                    item.appendChild(pontuacao)
                    container.appendChild(item)
                }

                swal({
                    title: 'Maiores pontuações',
                    content: container
                })
            })
        })


        this.footer.appendChild(info)
        divExtra.appendChild(divHeader)
        divExtra.appendChild(divDisplay)
        divExtra.appendChild(this.footer)

        if (this.status) {
            let play = document.createElement('button')
            play.addEventListener('click', ()=>{
                window.location = this.id+'/'+this.id+'.html'
            })
            this.footer.appendChild(play)
        }else{
            this.button = document.createElement('button')
            this.button.innerHTML = '<i class="fas fa-lock"></i>'
            this.button.addEventListener('click', ()=>{
                swal({
                    title: 'Deseja gastar '+ this.value +' moedas para desbloquear esse extra?',
                    cancel: {
                        text: "Não",
                        value: null,
                        closeModal: true,
                    },
                    confirm: {
                        text: "Claro!",
                        value: true,
                        closeModal: true
                    }
                }).then(
                    (result)=>{
                        if (result) {
                            c_user.buyGame(this.id, ()=>{
                                this.button.remove()
                                this.button = document.createElement('button')
                                this.button.innerHTML = '<i class="fas fa-play"></i>'
                                this.footer.appendChild(this.button)
                                this.button.addEventListener('click', ()=>{
                                    window.location = this.id+'/'+this.id+'.html'
                                })
                            })
                        }
                    }
                )
            })
            this.footer.appendChild(this.button)
        }
        this.container.appendChild(divExtra)
    }
}