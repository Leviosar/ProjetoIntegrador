var buttons = document.querySelectorAll('button');

buttons[0].addEventListener('click', ev =>{
	window.location = 'alunoifc.html'
})

buttons[1].addEventListener('click', ev =>{
	window.location = 'alunoexterno.html'
})
var userData;

window.onload = function cacete(e) {
	loadUserData();
	if (userData.useremail == '' || userData.userpass == '') {
		
	}
}

function loadUserData(params) {
	xhr = new XMLHttpRequest();
	xhr.open('GET', 'storage/user.json')
	xhr.addEventListener('load', ev => {
		userData = JSON.parse(xhr.responseText)
	})
	xhr.send();	
}