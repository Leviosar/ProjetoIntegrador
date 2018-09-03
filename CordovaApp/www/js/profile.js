let badgeList = c_user.loadBadges()
let badgeContainer = document.querySelector("div.badge-container")

for (let i = 0; i < badgeList.length; i++) {
    let badge = document.createElement('DIV')

    badge.addEventListener("click", ev=>{
        swal({
            title: badgeList[i].nome,
            text: badgeList[i].description,
            imagemUrl: badgeList[i].url,
            footer: badgeList[i].data
        })
    })

    badgeContainer.appendChild(badge)
}