let badgeContainer = document.querySelector("div.badge-container")
let moneyContainer = document.querySelector('div.saldo-container')
let callback = ()=>{    
    let badgeList = c_user.getBadges(
        (badgeList)=>{
            for (let i = 0; i < badgeList.length; i++) {
                let badge = document.createElement('div')
                let img = document.createElement('img')
                
                img.src = 'img/badges/'+badgeList[i].idbadge+'.png'
                
                badge.appendChild(img)
                badgeContainer.appendChild(badge)
                badge.addEventListener("click", ()=>{
                    swal({
                        title: badgeList[i].nome,
                        text: '"'+badgeList[i].descricao+'"',
                        icon: 'img/badges/'+badgeList[i].idbadge+'.png'
                    })
                })    
            }
        }
    )

    let saldo = c_user.getMoney(
        async (data)=>{
            data = await JSON.parse(data)
            let p = document.createElement('p')
            p.innerText = data.saldo
            moneyContainer.appendChild(p)
        }
    )
}
