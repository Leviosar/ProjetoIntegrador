var $ = function (select) {
    return document.querySelector(select)
}

class Usuario{
    constructor(userData){
        this.nome = userData[0][0]
        this.email = userData[0][1]
    }
}

let userData

window.onload = getUserData()


async function insertNewUser(nome, login, password){
    let response = await fetch("php/insert.php?login="+login+"&nome="+nome+"&pass="+password);
    let data = await response.text();
    if(data == "true")
        tryLogin(login, password)
    
}
let data
async function tryLogin(login, password){
    let response = await fetch("php/login.php?login="+login+"&pass="+password);
    data = await response.text();
    if(data != null){
        localStorage.setItem("userData", data)
        getUserData()
        window.location = "getstarted.html"
    }
}

function getUserData(){
    if(typeof localStorage.getItem("userData") != "undefined"){
        user = new Usuario(JSON.parse(localStorage.getItem("userData")))
    }else{
        window.location = "index.html"
    }
}

