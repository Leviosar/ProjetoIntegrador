let badgeContainer = document.querySelector("div.badge-container")
let moneyContainer = document.querySelector('div.saldo-container')
let avatarContainer = document.querySelector('div.avatar')
let avatarValue

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

    let avatar = c_user.getAvatar(
        async (data)=>{
            data = JSON.parse(data)
            let path = data.avatar
            avatarValue = data.avatar
            avatarContainer.querySelector('img').src = 'img/avatars/'+path+'.png'
        }
    )
}

avatarContainer.addEventListener('click', ()=>{

    let container = document.createElement('div')
    container.classList.add('swal-avatar')
    for (let i = 0; i < 13; i++) {
        let img = document.createElement('img')
        img.src = 'img/avatars/'+(i+1)+'.png'
        img.addEventListener('click', ()=>{
            avatarValue = i+1
            img.style.border = '4px solid #3390c9'
        })
        container.appendChild(img)
    }

    swal({
        title: 'Qual sua cara?',
        content: container
    }).then(
        ()=>{
            c_user.setAvatar(avatarValue,
                ()=>{
                    avatarContainer.querySelector('img').src = 'img/avatars/'+avatarValue+'.png'
                }
            )
        }
    )
})