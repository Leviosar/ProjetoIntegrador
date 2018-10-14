var fields = document.querySelectorAll('form input')
var button = document.querySelector('button[type=button]')

button.addEventListener('click', ()=>{
	c_user.signUp(fields[0].value.trim(), fields[1].value.trim(), fields[2].value.trim())
})

button.addEventListener('keypress', ()=>{
	if(ev.code == "Enter")
		c_user.signUp(fields[0].value.trim(), fields[1].value.trim(), fields[2].value.trim())
})
