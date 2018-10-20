let users = ''
async function generateUsers(){
    let nomes = await fetch('http://www.labmatii.ifc-camboriu.edu.br/oob/backend/data_mining/getJson.php?j=nomesIbge')
    nomes = await nomes.json()
    for (let i = 100029; i < 500029; i++) {
        let firstName = Math.floor( Math.random() * ((nomes.length - 1) - 0 + 1)) + 0 
        let lastName = Math.floor( Math.random() * ((nomes.length - 1) - 0 + 1)) + 0 
        x = "INSERT INTO usuario (nome, email, senha) VALUES ('"+nomes[firstName].Nome +" "+ nomes[lastName].Nome+"', '"+nomes[firstName].Nome.toLowerCase()+"@gmail.com', '"+CryptoJS.SHA256(Math.random(20).toString()).toString()+"');"
        users+=x

    }

    console.log(users)
}

function generateXp(){
    let users = "INSERT INTO usuario_experiencia (idusuario, idexperiencia) VALUES "
    for (let i = 0; i < 100000; i++) {
        for (let j = 1; j < 7; j++) {
            if (Math.ceil(Math.random() * 7) == 4) {
                x = "("+i+","+j+"),"
                console.log(x)
                users+=x            
            }
        }
    }
    return users
}