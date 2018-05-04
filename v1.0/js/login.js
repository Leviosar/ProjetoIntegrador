var matriculaField = document.querySelector('input')

matriculaField.addEventListener('input', ev=>{
	if(matriculaField.value.length >= 8){
		matriculaField.className = 'text mb-10 textCorrect'
	}else{
		matriculaField.className = 'text mb-10 textWrong'
	}
})

var emailField = document.querySelector('input[type="email"]')

emailField.addEventListener('input', ev=>{
	
})