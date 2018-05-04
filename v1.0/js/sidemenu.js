var trigger = document.querySelector('div.menu-trigger')
var triggerClose = document.querySelector('div.menu-trigger-close')
var side = document.querySelector('div.side-menu')
var container = document.querySelector('div.limits')
var todo = document.querySelector('div.todo')
var header = document.querySelector('header')
var shadowMenu = document.querySelector('div.shadow-menu')
var menuStatus = false;

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



var $ = function (select) {
    return document.querySelector(select)
}
