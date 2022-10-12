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
      //different animations scroll for each screen size
        ScrollTrigger.matchMedia({
            //Desktop
            "(min-width: 969px)": () => {
                console.log("fired desktop");
              //First section -----------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                  scrollTrigger:{
                    trigger: ".first-move",
                    start:"top top",
                    end:"bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh:true,
                  },
                })
                this.firstMoveTimeline.to(this.room.position, {
                  x: ()=>{
                    return this.sizes.width * 0.0014
                  }
                })

              //Second section -----------------------------------
              this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                  trigger: ".second-move",
                  start:"top top",
                  end:"bottom bottom",
                  scrub: 0.6,
                  invalidateOnRefresh:true,
                },
              })
              this.secondMoveTimeline.to(this.room.position, {
                x: ()=>{
                  return 1
                },
                z: ()=>{
                  return this.sizes.height * 0.0032
                }
              })
              this.secondMoveTimeline.to(this.room.scale, {
                x:0.4,
                y:0.4,
                z:0.4,
              })

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
