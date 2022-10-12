import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger.js"

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        
        GSAP.registerPlugin(ScrollTrigger);
        this.setScrollTrigger();
    }
    setScrollTrigger() {
        ScrollTrigger.matchMedia({
            //Desktop
            "(min-width: 969px)": () => {
                console.log("fired desktop");
                },
            // Mobile
            "(max-width: 968px)": () => {
                console.log("fired mobile");
            },
            // all
            all: () => {                
            },
        });
    }
    resize() {}

    update() {}
}
