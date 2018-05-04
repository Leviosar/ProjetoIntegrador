var matricula = document.querySelector('input[name=matricula]')
var button = document.querySelector('button[type=button]')

button.addEventListener('click', ev=>{
	if (matricula.value.length >= 8) {
		document.cookie += matricula.value
	}
})