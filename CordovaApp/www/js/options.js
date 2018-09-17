
let inputs = document.querySelectorAll("input")
let labels = document.querySelectorAll("label")
inputs[0].value = "Editar nome"
inputs[1].value = "Editar e-mail"

for (let i = 0; i < inputs.length-1; i++) {
    inputs[i].addEventListener("click", ()=>{    
        console.log(c_user)
        inputs[0].value = c_user.nomeUsuario
        inputs[1].value = c_user.emailUsuario

        inputs[i].addEventListener("blur", ev=>{
            if(checkFields(inputs))
                c_user.updateUser(inputs[0].value, inputs[1].value)
            else
                swal("Reveja os dados", "Nem todos os dados estão preenchidos", "warning")    
        })
    })
    
}

inputs[2].addEventListener("click", ()=>{
    c_user.deleteUser()
})