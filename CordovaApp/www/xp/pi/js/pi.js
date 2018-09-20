let container = document.querySelector('div.canvas')

let buttons = {
    play : document.querySelector('main > section > div > div.hud > div.play'),
    pause : document.querySelector('main > section > div > div.hud > div.pause'),
    undo : document.querySelector('main > section > div > div.hud > div.undo'),
    final: document.querySelector('main > section > div > button.button')
}

let xp = new Experience(1, 9, "f4c242")

function setup() {

    w = displayHeight * 0.5;
    x = createCanvas(w,w)
    x.elt.style.background = 'transparent'
    container.appendChild(x.elt)
    
    // Draws ellipse
    stroke("#f4c242")
    translate(width/2, height/2)
    noFill()
    strokeWeight(2)
    ellipse(0,0,w,w)

    //Lock framerate
    frameRate(0)

    //Digitos de pi em String
    pi = returnPi();
    piDigits = pi.split('');
    for (let i = 0; i < piDigits.length ; i++) {
        piDigits[i] = parseInt(piDigits[i])
    }
    
    // indice atual
    index = 0;
}

// Final button event
// buttons.final.addEventListener('click', ev=> {
//     window.location = '../../xplist.html'
// })

//Play button event
buttons.play.addEventListener('click', function playSketch(){
    buttons.play.style.border = '2px solid #f4c242'
    buttons.pause.style.border = '2px solid white'
    frameRate(15)
})

//Pause button event
buttons.pause.addEventListener('click', function pauseSketch(){
    buttons.pause.style.border = '2px solid #f4c242'
    buttons.play.style.border = '2px solid white'
    frameRate(0)
})

//Reset button event
buttons.undo.addEventListener('click', resetSketch)

//Resets the sketch and redefines all values
function resetSketch(){
    translate(-width/2, -height/2)
    clear();
    translate(width/2, height/2)
    index = 0;
    stroke("#f4c242")
    noFill()
    strokeWeight(2)
    ellipse(0,0,w,w, 5)
}


function draw() {
    background('rgba(100%, 100%, 100%, 0)')

    index++;
    translate(width/2, height/2)
    digit = piDigits[index]
    nextDigit = piDigits[index+1]

    switch(digit){
        case 0: stroke("#f4c242")
        break;
        case 1: stroke("#edc04e")
        break;
        case 2: stroke("#efc55b")
        break;
        case 3: stroke("#edc665")
        break;
        case 4: stroke("#efcc75")
        break;
        case 5: stroke("#eacc81")
        break;
        case 6: stroke("#edd495")
        break;
        case 7: stroke("#edd7a1")
        break;
        case 8: stroke("#efdeb3")
        break;
        case 9: stroke("#ede0c0")
        break;
    }
    
    a1 = map(digit, 0, 10, 0, TWO_PI)
    a2 = map(nextDigit, 0, 10, 0, TWO_PI)
    
    x1 = w/2 * cos(a1)
    y1 = w/2 * sin(a1)

    x2 = w/2 * cos(a2)
    y2 = w/2 * sin(a2)

    strokeWeight(1)
    bezier(x1, y1, random(0, cos(a1) * 50), random(0, sin(a1) * 50), random(0, cos(a2) *2), random(0, sin(a2) * 50), x2, y2)
    // line(x1, y1, x2, y2)

    if(index > 350){
        resetSketch();
    }
}
