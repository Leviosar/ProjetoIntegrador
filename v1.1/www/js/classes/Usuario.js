class Usuario{

    constructor(){
        this.idUsuario;
        this.nomeUsuario;
        this.emailUsuario;    
        this.avatar
    }

    async getInfo(callback = ()=>{}){
        this.request('getInfo', null,
        async (response)=>{
            response = await JSON.parse(response)
            this.idUsuario = response.idusuario
            this.nomeUsuario = response.nome
            this.emailUsuario = response.email
            this.avatar = response.avatar
            this.setMenu(document.querySelector('div.menu-header'))
            callback()
        },
        async (errorCode)=>{
            errorCode = await JSON.parse(errorCode)
            swal({
                title: errorCode.error,
                text: errorCode.msg,
                icon: "error"
            }).then(
                ()=>{
                    sessionStorage.clear()
                    location.href = location.origin + location.pathname.substring(0, location.pathname.indexOf('www')) + 'www/index.html'
                }
            )
        })
    }

    setMenu(container) {
        let fileName= location.href.split("/").slice(-1)
        if (fileName == 'extras.html' || fileName == 'extras.html#') container.querySelector('img').src = '../img/avatars/'+this.avatar+'.png'
        else{
            try{
                container.querySelector('img').src = 'img/avatars/'+this.avatar+'.png'
                container.querySelector('span').innerText = 'Olá '+ this.nomeUsuario
            }catch(E){
                console.log(E)
            }
        } 
    }

    async addCoin(total, callback){
        let keys = {
            idusuario: this.idUsuario,
            value: total
        }

        this.request('addCoin', keys, callback)
    }

    async addView(value, id ,callback){
        let keys = {
            idusuario: this.idUsuario,
            value: value,
            idexperiencia: id
        }

        this.request('addView', keys, callback)
    }

    async getMoney(callback){
        let keys = {
            idusuario: this.idUsuario
        }

        this.request('getMoney', keys, callback)
    }

    async getBadges(callback){
        let keys = {
            idusuario: this.idUsuario
        }
        this.request(
            'getBadges', 
            keys,
            async (response) => {
                let data = await JSON.parse(response)
                callback(data);
            },
            async (errorCode) =>{
                let data = await JSON.parse(errorCode)  
                return data;
            } 
        )
    }

    async getAvatar(callback){
        let keys = {
            idusuario: this.idUsuario
        }

        this.request('getAvatar', keys, callback)
    }

    async getRanking(id, callback){
        let keys = {
            idgame: id,
            idusuario: this.idUsuario
        }

        this.request('getRanking', keys, callback)
    }

    async getGames(callback){
        let keys = {
            idusuario : this.idUsuario
        }
        this.request('getGames', keys, callback, ()=>{return false})
    }

    async getAllGames(callback){
        let keys = {}
        this.request('getAllGames', keys, callback, ()=>{return false})
    }

    async buyGame(id, callback){
        let keys = {
            idgame : id,
            idusuario : this.idUsuario
        }

        this.request('buyGame', keys, callback)
    }

    async addScore(idgame, score){
        let keys = {
            idgame: idgame,
            value: score,
            idusuario: this.idUsuario
        }

        this.request('insertScore', keys)
    }

    async setAvatar(avatarValue, callback = ()=>{return true}){
        let keys = {
            idusuario: this.idUsuario,
            avatar: avatarValue
        }

        this.request('setAvatar', keys, callback)
    }

    async insertBadge(id){
        let keys = {
            idusuario: this.idUsuario,
            idbadge: id
        }

        this.request(
            'insertBadge',
            keys,
            ()=>{console.log(true)},
            ()=>{console.log(false)}
        )
    }

    async signUp(inputs){
        
        let keys = {
            nome: inputs.nome,
            email: inputs.email,
            senha: inputs.senha,
            question1: inputs.question1,
            question2: inputs.question2
        }

        let loading = document.createElement('img')
        loading.src = 'img/loading5.gif'

        swal({
            title: 'Fazendo requisições super pesadas',
            content: loading
        })

        this.request('signUp', keys, 
            ()=>{
                swal({
                    title: "Sucesso",
                    text: "Usuário criado",
                    icon: "success"
                })
                setTimeout(function(){ window.location.href = "./login.html"; }, 1000);     
            }, 
            async (errorCode)=>{
                errorCode = await JSON.parse(errorCode)
                swal({
                    title: errorCode.error,
                    text: errorCode.msg,
                    icon: "error"
                })        
                return true;
            }
        )
    }

    async login(email, senha){
        let keys = {
            email : email,
            senha : senha
        }

        let container = document.createElement('div')
        container.classList.add('sk-wave')

        for (let i = 0; i < 5; i++) {
            let divi = document.createElement('div')
            divi.classList.add('sk-rect')
            divi.classList.add('sk-rect'+(i+1))
            container.appendChild(divi)
        }

        swal({
            content: container,
            button: "Carregando!"
        })

        this.request('loginUser', keys, 
            async (response)=>{
                response = await JSON.parse(response)
                window.sessionStorage.setItem('token', response.token)
                swal({
                    title: "Sucesso",
                    text: "Login realizado, redirecionando",
                    icon: "success",
                    button: false
                })
                setTimeout(()=>location.href = "xplist.html",1000);
            },
            (errorCode)=>{
                let data = JSON.parse(errorCode)
                swal({
                    title: data.error,
                    text: data.msg,
                    icon: "error"
                })
            }
        )
    }

    async updateUser(nome, email){
        let keys = {
            nome: nome, 
            email: email,
            idusuario: this.idUsuario
        }

        this.request('updateUser', keys,
            async (response)=>{
                response = await JSON.parse(response)
                if(response.value == true){
                    swal({
                        title: "Sucesso ao atualizar",
                        icon: "success",
                        text: "Seus dados foram atualizados"
                    })
                }
            },
            async (errorCode)=>{
                errorCode = await JSON.parse(errorCode)
                if(errorCode.code){
                    swal({
                        title: "Erro do excluir",
                        text: "Código do erro:" + errorCode.code,
                        icon: "error"
                    })
                }
            }
        )
    } 
    
    async deleteUser(){
        let keys = {
            idusuario: this.idUsuario
        }

        this.request("deleteUser", keys,
            async (response)=>{
                response = await JSON.parse(response)
                if(response.condition){
                    window.sessionStorage.clear()
                    swal({
                        title: "Sucesso",
                        text: "Usuário excluido, você será redirecionado",
                        icon: "success"
                    })
                    setTimeout(()=>location.href = "index.html",1500);
                }else{
                    swal({
                        title: "Erro",
                        text: "Erro ao excluir o usuário, entre em contato conosco",
                        icon: "error"
                    })
                }
            },
            (errorCode)=>{
                swal({
                    title: "Erro",
                    text: "Erro" + errorCode.status,
                    icon: "error"
                })
            }
        )
    }

    async request(opt, payload, callback = ()=>{return true}, errorCallback = ()=>{return false}){
        let resposta = false;
        let url = "http://www.labmatii.ifc-camboriu.edu.br/oob/backend/router.php?"
        let token = "&token=" + window.sessionStorage.getItem('token')
        let option = "option=" + opt;
        let req = await fetch(url + option + token, 
        {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        if(await req.status === 200){
            resposta = true
            callback(await req.text())
        }else{
            errorCallback(await req.text())
        }
        return resposta
    }
}
