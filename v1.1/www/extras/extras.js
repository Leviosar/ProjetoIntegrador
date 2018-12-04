
window.addEventListener('load', ()=>{
    var result
    c_user.getAllGames(
        async (data)=>{
            result = await JSON.parse(data)
            buildExtra(result)
            c_user.getGames(
                async (data)=>{
                    result = await JSON.parse(data)
                    showEarned(result)
                }
            )
        }
    )

})

let joguinhos = []

function buildExtra(result){    
    document.querySelector('section').innerHTML = ''
    let swalInfos = []
    
    swalInfos[0] = ()=>{
        swal({
            title: 'Snake Game',
            text: 'Use o joystick digital para controlar a cobra'
        })    
    }

    let container =  document.querySelector('body > div > div > section')
    for (let i = 0; i < result.length; i++) {
        joguinhos[i] = new Extra(result[i].idgame, false, result[i].nome, result[i].valor, container, swalInfos[i])
    }
}

function showEarned(result){
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < joguinhos.length; j++) {
            if (joguinhos[j].id == result[i].idgame) {
                joguinhos[j].unlock()
            }
        }
    }
}
