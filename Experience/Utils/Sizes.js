import { EventEmitter } from "events";

export default class Sizes extends EventEmitter{
    constructor(){
        super();
        this.frustrum = 5;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width/this.height;
        this.pixelRation = Math.min(window.devicePixelRatio, 2)

        window.addEventListener ("resize", () =>{
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.aspect = this.width/this.height;
            this.pixelRation = Math.min(window.devicePixelRatio, 2)
            this.emit("resize"); 

        })
    }
    
}