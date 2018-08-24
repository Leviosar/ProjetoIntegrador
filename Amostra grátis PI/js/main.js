var $ = function (select) {
    return document.querySelector(select)
}

c_user = new Usuario()

let fileName= location.href.split("/").slice(-1)

if(fileName != "login.html" && fileName != "cadastro.html")
    c_user.getInfo()

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