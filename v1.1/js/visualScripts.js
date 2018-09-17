function menuCheck() {
    if (!menuStatus) {
        side.style.transform = 'translateX(0%)'
        shadowMenu.style.opacity = '1'
        shadowMenu.style.zIndex = '1'
    }else {
        side.style.transform = 'translateX(-100%)'
        shadowMenu.style.opacity = '0'
        shadowMenu.style.zIndex = '-1'
    }
    menuStatus = !menuStatus
}