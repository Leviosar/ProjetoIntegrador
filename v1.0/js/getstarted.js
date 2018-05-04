var button = document.querySelector('button')

button.addEventListener('click', ev=>{
    window.location = 'xp/pi/pi.html'
})

function sendData() {
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/userData.php')
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.send('matricula=' + matricula.value)
    xhr.addEventListener('load', ev => {
        console.log(xhr.responseText)
    })
}