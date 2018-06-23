class Usuario{
    constructor(userData){
        this.timetableId = localStorage.getItem("timetableId")
        this.nome = localStorage.getItem("nomeUsuario")
        this.email = localStorage.getItem("emailUsuario")
    }
}