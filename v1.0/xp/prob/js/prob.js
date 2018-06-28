const xp = new Experience(10, "#daa5e2")
var wavesurfer

const div3 = document.querySelector("div.carousel2")
div3.addEventListener("input", ev=>{
    
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