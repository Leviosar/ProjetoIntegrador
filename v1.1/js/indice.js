let trigger = document.querySelector('div.menu-trigger')
let triggerClose = document.querySelector('div.menu-trigger-close')
let side = document.querySelector('div.side-menu')
let container = document.querySelector('div.limits')
let todo = document.querySelector('div.todo')
let header = document.querySelector('header')
let shadowMenu = document.querySelector('div.shadow-menu')
let backButton = document.querySelector('div.logout')
let menuStatus = false;

trigger.addEventListener('click', ev=>{
    triggerClose.className = 'menu-trigger-close rotate-90'
    menuCheck()
})

triggerClose.addEventListener('click', ev=>{
    triggerClose.className = 'menu-trigger-close rotate-180'
    menuCheck()
})

shadowMenu.addEventListener('click', ev=>{
    triggerClose.className = 'menu-trigger-close rotate-180'
    menuCheck();
})

backButton.addEventListener('click', ()=>{
    logOut()
})

function menuCheck() {
    if (!menuStatus) {
        side.classList += ' side-menu-open'
        side.style.transform = 'translateX(0%)'
        shadowMenu.style.opacity = '1'
        shadowMenu.style.zIndex = '1'
    }else {
        side.style.transform = 'translateX(-100%)'
        shadowMenu.style.opacity = '0'
        shadowMenu.style.zIndex = '-1'
        side.className = 'side-menu'
    }
    menuStatus = !menuStatus
}