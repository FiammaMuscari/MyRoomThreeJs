import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from 'gsap';
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
export default class Room {
  constructor() {
    this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
          current: 0,
          target: 0,
          ease: 0.1,
      };
    this.setModel();
    this.setAnimation();
    this.onMouseMove();
  }
  setModel() {
    this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }


      if (child.name === "Aquarium") {
        child.children[0].material = new THREE.MeshPhysicalMaterial();
        child.children[0].material.roughness = 0;
        child.children[0].material.color.set(0xff86aa);
        child.children[0].material.ior = 3;
        child.children[0].material.transmission = 1;
        child.children[0].material.opacity = 1;
      }
      if (child.name === "Computer") {
        child.children[1].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }
    });

    const width = 0.5;
    const height = 0.7;
    const intensity = 2;
    const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
    rectLight.position.set( 7.68244, 7, 1 );
    rectLight.rotation.x= -Math.PI / 2;
    rectLight.rotation.z= Math.PI / 4;
    
    const rectLightpc = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
    rectLightpc.position.set( -4.95192 , 8, 1.04973 );
    rectLightpc.rotation.x= -Math.PI / 2;
    rectLightpc.rotation.y= -Math.PI / 7;
    rectLightpc.rotation.z= Math.PI / 4;
    this.actualRoom.add( rectLight, rectLightpc )
    
    // const rectLightHelper = new RectAreaLightHelper( rectLight );
    // rectLight.add( rectLightHelper );

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.11, 0.11, 0.11);
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[5]);
        this.swim.play();
        console.log(this.room)
  }

  onMouseMove(){
    window.addEventListener('mousemove', (e)=>{
      this.rotation =
      ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.05;
    })
  }

  resize() {}
  
  update() {
      this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
      );
      this.actualRoom.rotation.y = this.lerp.current
    this.mixer.update(this.time.delta * 0.0011);
  }
}
