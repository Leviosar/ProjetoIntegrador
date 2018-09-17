function menuCheck() {
    if (!menuStatus) {
        blurOn(todo)
        menuStatus = true
        side.style.transform = 'translateX(0%)'
        shadow()
    } else {
        blurOff(todo)
        menuStatus = false
        side.style.transform = 'translateX(-100%)'
        shadow()
    }
}

function shadow() {
    if (menuStatus) {
        shadowMenu.style.transform = 'translateX(233.5%)'
    } else {
        shadowMenu.style.transform = 'translateX(-100%)'
    }
}

function blurOn(element) {
    element.style.filter = 'brightness(100%)'
    setTimeout(function () {
        shadowMenu.style.background = 'rgba(0,0,0,40%)'
    }, 500)
}

function blurOff(element) {
    if (!element.style.filter.includes('brightness')) {
        return false
    }else{
        shadowMenu.style.background = 'rgba(0,0,0,0%)'  
        element.style.filter = '';
    }
}

function randomColor() {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    let a = Math.floor(Math.random() * 256)

    return "rgba(" + r + ',' + g + ',' + b + ',' + a + ')'
}