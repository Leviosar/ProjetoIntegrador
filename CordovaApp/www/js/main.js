var $ = function (select) {
    return document.querySelector(select)
}

c_user = new Usuario()

let fileName= location.href.split("/").slice(-1)
switch(fileName[0]){
    case "login.html":
        
    break;
    
    case "cadastro.html":
    
    break;

    case "profile.html":
        c_user.getInfo(callback)
    break;

    default:
        c_user.getInfo()
    break;
}

let auto = document.querySelector('a.self')
if (auto != undefined) {
    auto.addEventListener('click', (ev)=>{
        ev.preventDefault()
        menuCheck()
    })    
}
/* Start of CRUD requests */

function getUserData(){
    if(localStorage.getItem("userData") != null){
        user = new Usuario(JSON.parse(localStorage.getItem("userData")))
    }else{
        window.location.href = "index.html"
    }
}

function checkFields(inputArray){
    for (let i = 0; i < inputArray.length; i++) {
        if(inputArray[i].value.trim() == "")
            return false
    }
    return true
}

function logOut() {
    localStorage.clear()
    window.location.href = "index.html"
}