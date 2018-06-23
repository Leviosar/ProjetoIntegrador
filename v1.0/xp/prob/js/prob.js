const xp = new Experience(8, "#b10bcf")
var wavesurfer

const div3 = document.querySelector("div.carousel2")
div3.addEventListener("click", ev=>{
    
    wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        barHeight: "5",
        height: "500",
        barWidht: "6"
    })

    wavesurfer.load('wave2.mp3')

    wavesurfer.on('ready', function () {
        wavesurfer.play();
    })
})