var $ = function (select) {
    return document.querySelector(select)
}
let userData

if(window.location.pathname != "/oob/login.html" && window.location.pathname != "/oob/cadastro.html")
    window.onload = getUserData()

/* Start of CRUD requests */

// InsertNewUser/Create, receives 3 strings, name, login and a MD5 hash password, if returns true, call to tryLogin()
async function insertNewUser(nome, login, password){
    let response = await fetch("php/insert.php?login="+login+"&nome="+nome+"&pass="+password);
    let data = await response.text()
    if(data == "true")
        tryLogin(login, password)
}

/* tryLogin/Read, receives 2 strings, login and a MD5 hash password to make a fetch request of login
if returns something, sets the localStorage key to a stringfied json containing user data.*/
async function tryLogin(login, password){
    let response = await fetch("php/login.php?login="+login+"&pass="+password);
    let data = await response.text()
    if(data != null){
        localStorage.setItem("userData", data)
        getUserData()
        if(window.location.pathname == "/oob/login.html")
            window.location = "getstarted.html"
    }
}

/* updateUser/Update receives 4 arguments to make a fetch request to update.php, changing all the user data on the db to the new/old arguments
after the response, call to read method to update the display */
async function updateUser(nome, login, password, id){
    let response = await fetch("php/update.php?login="+login+"&nome="+nome+"&pass="+password+"&id="+id)
    let data = await response.text()
    if(data == "true"){
        alert("Dados atualizados")
    }else{
        alert("Houve um problema durante a atualização do seus dados")
    }
    tryLogin(login, password)
}

/* deleteUser/Delete, receives only the user id to make a fetch request to delete.php and erases the user on db, after the response leads to index */
async function deleteUser(id){
    let response = await fetch("php/delete.php?id="+id)
    let data = await response.text()
    if(data == "true"){
        localStorage.clear()
        alert("Usuário excluido, você será redirecionado para a tela inicial")
        window.location = "index.html"
    }
}

function getUserData(){
    if(localStorage.getItem("userData") != null){
        user = new Usuario(JSON.parse(localStorage.getItem("userData")))
    }else{
        window.location = "index.html"
    }
}

function checkFields(inputArray){
    for (let i = 0; i < inputArray.length; i++) {
        if(inputArray[i].value.trim() == "")
            return false
    }
    return true
}