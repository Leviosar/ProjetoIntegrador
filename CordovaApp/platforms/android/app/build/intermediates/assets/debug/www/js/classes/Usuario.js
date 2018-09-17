class Usuario{

    constructor(){
        this.idUsuario;
        this.nomeUsuario;
        this.emailUsuario;    
    }

    async getInfo(){
        this.request('getInfo', null,
        async (response)=>{
            response = await JSON.parse(response)
            this.idUsuario = response.idusuario;
            this.nomeUsuario = response.nome;
            this.emailUsuario = response.email;
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
                    location.href = 'index.html'
                }
            )
        })
    }

    async getBadges(){
        let keys = {
            idusuario: this.idUsuario
        }

        this.request(
            'getBadges', 
            keys,
            async (response) => {
                let data = await JSON.parse(response)
                return data;
            },
            async (errorCode) =>{
                let data = await JSON.parse(errorCode)  
                return data;
            } 
        )
    }

    async signUp(nome,email,senha){
        let keys = {
            nome: nome,
            email: email,
            senha: senha,
        }


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

        this.request('loginUser', keys, 
            async (response)=>{
                response = await JSON.parse(response)
                window.sessionStorage.setItem('token', response.token)
                swal({
                    title: "Sucesso",
                    text: "Login realizado, redirecionando",
                    icon: "success"
                })
                setTimeout(()=>location.href = "xplist.html",1500);
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
