import { EventEmitter } from "events";
import Experience from "../Experience";

export default class Resources extends EventEmitter{
    constructor(assets){
        super();
        this.experience = new Experience();
        this.render = this.experience.renderer;
        this.assets = assets;
        console.log(this.assets);
    }
    
}