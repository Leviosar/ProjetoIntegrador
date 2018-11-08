let scroller = new Scroller('main', 3, null)

let nextButtons = document.querySelectorAll('main > section > div:nth-child(3) > button:last-child')
let prevButtons = document.querySelectorAll('main > section > div:nth-child(3) > button:first-child')
let checkLabels = document.querySelectorAll('body > main > section > div:nth-child(2) > form > div > label')
let sendButton = document.querySelector('body > main > section:nth-child(3) > div:nth-child(3) > button:nth-child(2)')

for (const button of nextButtons) {
	button.addEventListener('click', ()=>{
		if (button.dataset.check == 'true') {
			let checkControl = checkEqual(button.parentElement.parentElement.querySelectorAll('input.check'))
			if (!checkControl.error) {
				scroller.slide(scroller.current+2)
			}else{
				for (const input of checkControl.fields) {
					input.style.border = '2px solid rgb(244,116,116)'
				}
				swal({
					title: checkControl.msg,
					icon: "error"
				})
			}	
		}
	})
}

for (const button of prevButtons) {
	button.addEventListener('click', ()=>{
		scroller.slide(scroller.current)
	})
}

for (const label of checkLabels) {
	label.style.fontSize = '0em'

	label.addEventListener('click', ()=>{
		if (label.style.fontSize == '0em') {
			label.style.fontSize = '1em'
			label.style.borderRadius = '100%'
		}else{
			label.style.fontSize = '0em'
			label.style.borderRadius = '8px'
		}
	})
}

function checkEqual(arr){
	
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].dataset.info == "nome" && arr[i].value.trim() == '') return {error:true, msg: 'Insira o campo nome', fields:[arr[i]]}
		if (arr[i].dataset.info == "email" && arr[i].value.trim() == '') return {error:true, msg: 'Insira o campo email', fields:[arr[i]]}
		if (arr[i].dataset.info == "senha" && arr[i].value.trim() == '') return {error:true, msg: 'Insira o campo senha', fields:[arr[i]]}
		if (arr[i].dataset.info == "email" && !arr[i].checkValidity()) return {error:true, msg: 'Insira um email válido', fields:[arr[i]]}
		if (arr[i].dataset.info == "senha" && arr[i].value.length < 8) return {error:true, msg: 'A senha deve conter ao menos 8 caracteres', fields:[arr[i]]}
	}

	let eq = []

	for (let i = 0; i < arr.length; i++) {
		if (arr[i].classList.contains('equal')) eq.push(arr[i])
	}

	if (eq.length > 1 && eq[0].value.trim() != eq[1].value.trim()) return {error:true, msg: 'Os campos não correspondem', fields: eq}

	return {error:false, msg: 'Insira o campo nome'}
}

sendButton.addEventListener('click', ()=>{
	let checkControl = checkEqual(document.querySelectorAll('input.check'))

	let inputs = {
		nome: document.querySelector('body > main > section:nth-child(1) > div:nth-child(2) > form > input:nth-child(1)').value,
		email: document.querySelector('body > main > section:nth-child(1) > div:nth-child(2) > form > input:nth-child(2)').value,
		senha: document.querySelector('body > main > section:nth-child(2) > div:nth-child(2) > form > input:nth-child(1)').value,
		question1: document.querySelector('#q1').checked,
		question2: document.querySelector('#q2').checked
	}

	if (!checkControl.error) c_user.signUp(inputs)
})

// button.addEventListener('click', ()=>{
// 	c_user.signUp(fields[0].value.trim(), fields[1].value.trim(), fields[2].value.trim())
// })

// button.addEventListener('keypress', ()=>{
// 	if(ev.code == "Enter")
// 		c_user.signUp(fields[0].value.trim(), fields[1].value.trim(), fields[2].value.trim())
// })
