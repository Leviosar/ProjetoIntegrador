var $ = function (select) {
    return document.querySelector(select)
}

let userData

window.onload = ()=>{
    getUserData()
}

async function insertNewUser(nome, login, password){
    let response = await fetch("php/insert.php?login="+login+"&nome="+nome+"&pass="+password);
    let data = await response.text();
    (data) => {
        if(data == "Usuário criado")
            tryLogin(login, password)
    }
}

async function tryLogin(login, password){
    let response = await fetch("php/login.php?login="+login+"&pass="+password);
    let data = await response.text();
    (data) => {
        if(data != null){
            localStorage.setItem("userData", data)
            getUserData()
            window.location = "getstarted.html"
        }
    }
}

function getUserData(){
    if(typeof localStorage.getItem("userData") != "undefined"){
        user = new Usuario(JSON.parse(localStorage.getItem("userData")))
    }else{
        window.location = "index.html"
    }
}

class Usuario{
    constructor(userData){
        this.timetableId = localStorage.getItem("timetableId")
        this.nome = localStorage.getItem("nomeUsuario")
        this.email = localStorage.getItem("emailUsuario")
    }
}