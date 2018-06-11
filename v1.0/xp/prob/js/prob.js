const xp = new Experience(8, "#185e82")

const pswdInput = document.querySelector("input.pass")
const shaInput = document.querySelector("div.sha")

pswdInput.addEventListener("input", ev=>{
    let hash = CryptoJS.SHA256(pswdInput.value)
    shaInput.firstElementChild.innerText = hash
})