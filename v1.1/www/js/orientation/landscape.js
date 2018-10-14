
document.addEventListener("deviceready", ()=>{
    screen.orientation.lock('landscape')
}, false);

document.addEventListener("resume", ()=>{
    screen.orientation.lock('landscape')
})
