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
    let users = "INSERT INTO rate (idusuario, idexperiencia, time, rate) VALUES "
    for (let i = 40; i < 300000; i++) {
        for (let j = 1; j <= 7; j++) {
            let data = {
                month: Math.ceil(Math.random() * 11),
                day: Math.ceil(Math.random() * 28),
                hour: Math.ceil(Math.random() * 23),
                minute: Math.ceil(Math.random() * 59),
                second: Math.ceil(Math.random() * 59),
            }

            if (data.month < 10) data.month = '0'+data.month
            if (data.day < 10) data.day = '0'+data.day
            if (data.hour < 10) data.hour = '0'+data.hour
            if (data.minute < 10) data.minute = '0'+data.minute
            if (data.second < 10) data.second = '0'+data.second

            let timestamp = '2018-'+data.month+'-'+data.day+' '+data.hour+':'+data.minute+':'+data.second+''
            let rate = Math.ceil(Math.random()*5)
            if (Math.ceil(Math.random() * 10) >= 5) {
                x = "("+i+","+j+", '"+timestamp+"',"+rate+"),"
                users+=x            
            }
        }
    }
    return users
}