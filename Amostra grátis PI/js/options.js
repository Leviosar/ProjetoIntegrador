
let inputs = document.querySelectorAll("input")
let labels = document.querySelectorAll("label")


inputs[0].value = c_user.nomeUsuario
inputs[1].value = c_user.emailUsuario

for (let i = 0; i < inputs.length-1; i++) {
    inputs[i].readOnly = true
    labels[i].addEventListener("click", ev=>{
        inputs[i].readOnly = false
        inputs[i].addEventListener("blur", ev=>{
            if(checkFields(inputs))
                updateUser(inputs[0].value, inputs[1].value, CryptoJS.SHA256(inputs[2].value).toString(), user.id)
            else
                swal("Reveja os dados", "Nem todos os dados estão preenchidos", "warning")    
        })
    })
}

inputs[2].addEventListener("click", ()=>{
    c_user.deleteUser()
})