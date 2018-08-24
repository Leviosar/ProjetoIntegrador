let fields = document.querySelectorAll('input')
let button = document.querySelector("button")


button.addEventListener("click", ()=>{
	c_user.login(fields[0].value, fields[1].value)
})

button.addEventListener('keypress', ev=>{
	if(ev.code == "Enter")
		c_user.login(fields[0].value, fields[1].value)
})
