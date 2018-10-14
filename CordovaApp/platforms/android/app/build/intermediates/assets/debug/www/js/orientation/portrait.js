
document.addEventListener("deviceready", ()=>{
    screen.orientation.lock('portrait')
}, false);

document.addEventListener("resume", ()=>{
    screen.orientation.lock('portrait')
})
