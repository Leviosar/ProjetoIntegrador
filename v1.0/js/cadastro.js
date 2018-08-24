var fields = document.querySelectorAll('form input')
var button = document.querySelector('button[type=button]')

button.addEventListener('click', ev=>{
	c_user.signUp(fields[0].value, fields[1].value, fields[2].value)
})

button.addEventListener('keypress', ev=>{
	if(ev.code == "Enter")
		c_user.signUp(fields[0].value, fields[1].value, fields[2].value)
})
