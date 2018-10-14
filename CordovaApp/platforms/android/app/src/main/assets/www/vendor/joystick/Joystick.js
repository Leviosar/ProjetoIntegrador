class Joystick{
    constructor(container){
        this.container = container
        this.joystick = document.createElement('div')
        this.stick = document.createElement('div')
        this.body = document.querySelector('body')

        this.base = {
            position: {
                x:0,
                y:0
            }
        }

        this.controls = {
            position: {
                x:0,
                y:0
            }
        }

        this.setup()
    }

    setup(){
        
        this.joystick.classList.add('joystick')
        this.stick.classList.add('stick')


        this.container.addEventListener('touchmove', (ev)=>{

            let position = {
                top: ev.touches[0].pageY - (innerHeight * 0.04),
                left: ev.touches[0].pageX - (innerHeight * 0.04)
            }

            this.container.appendChild(this.stick)
            this.stick.style.display = 'block'

            this.controls.position.x = ev.touches[0].pageX
            this.controls.position.y = ev.touches[0].pageY

            
            this.stick.style.top = position.top + 'px'
            this.stick.style.left = position.left + 'px'

        })

        this.container.addEventListener('touchstart', (ev)=>{
            if (!ev.path.toString().includes('Button')) {
                navigator.vibrate(50)

                this.container.appendChild(this.joystick)
                this.joystick.style.display = 'block'
                this.joystick.style.background = `rgba(0,0,0,.25)`
                
                let position = {
                    top: ev.touches[0].pageY - (innerHeight * 0.1),
                    left: ev.touches[0].pageX - (innerHeight * 0.1)
                }


                this.base.position.x = ev.touches[0].pageX
                this.base.position.y = ev.touches[0].pageY

                this.joystick.style.top = position.top + 'px'
                this.joystick.style.left = position.left + 'px'    
            }
        })

        this.container.addEventListener('touchend', (ev)=>{
            this.stick.style.display = 'none'
            this.joystick.style.background = `transparent`
        })
    }

    up(){
        if (this.controls.position.y < this.base.position.y && (this.base.position.y - this.controls.position.y > this.base.position.x - this.controls.position.x) && (this.base.position.y - this.controls.position.y > this.controls.position.x - this.base.position.x))
            return true
        else
            return false
    }

    down(){
        if (this.controls.position.y > this.base.position.y && (this.controls.position.y - this.base.position.y > this.base.position.x - this.controls.position.x) && (this.controls.position.y - this.base.position.y > this.controls.position.x - this.base.position.x))
            return true
        else
            return false
    }

    left(){
        if (this.controls.position.x < this.base.position.x && (this.base.position.x - this.controls.position.x > this.base.position.y - this.controls.position.y) && (this.base.position.x - this.controls.position.x > this.controls.position.y - this.base.position.y))
            return true
        else
            return false
    }

    right(){
        if (this.controls.position.x > this.base.position.x && (this.controls.position.x - this.base.position.x > this.base.position.y - this.controls.position.y) && (this.controls.position.x - this.base.position.x > this.controls.position.y - this.base.position.y))
            return true
        else
            return false
    }
}