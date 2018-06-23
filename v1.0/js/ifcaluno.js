var matricula = document.querySelector('input[name=matricula]')
var senha = document.querySelector('input[name=senha]')
var button = document.querySelector('button[type=button]')

button.addEventListener('click', ev => {
    sendData()
    window.location = 'getstarted.html'
})

function checkLogin(){
	xhr = new XMLHttpRequest()
	xhr.open("POST", "http://labmatii.online/PI/php/login.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.addEventListener('load', ev=>{
		console.log(xhr.responseText)
	})
	xhr.send('matricula='+matricula.value+'&senha='+matricula.value)	
}
