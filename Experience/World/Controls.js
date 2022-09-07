import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from 'gsap';

export default class Controls {
  constructor() {
    this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
    this.progress = 0
    this.dummyVector = new THREE.Vector3(0,0,0)
    //smooth movement
    this.lerp ={
      current: 0,
      target:0,
      ease:0.1,
    }

    this.position = new THREE.Vector3(0,0,0)
    this.lookAtPosition = new THREE.Vector3(0,0,0)

    this.directionalVector = new THREE.Vector3(0,0,0)
    this.staticVector = new THREE.Vector3(0,1,0)
    this.crossVector = new THREE.Vector3(0,0,0)

    this.setPath();
    this.onWheel()
  }
  
  setPath() {
//Create a closed wavey loop
this.curve = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( -5, 0, 0 ),
	new THREE.Vector3( 0, 0, -5 ),
	new THREE.Vector3( 5, 0, 0 ),
	new THREE.Vector3( 25, 10, 0 ),
	new THREE.Vector3( 5, 0, 0 ),
	new THREE.Vector3( 7, 0, 5 ),
	new THREE.Vector3( 0, 1, 5 )
], true);




const points = this.curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// Crear el producto final para agregar escena
const curveObject = new THREE.Line( geometry, material );
this.scene.add(curveObject);
  }
//movimiento de camara al scrollear
  onWheel(){
    window.addEventListener('wheel', (e) =>{
        console.log(e);
        if (e.deltaY>0){
            this.lerp.target+=0.01;
        } else {
          this.lerp.target-=0.01;
             // al revés
        }
    })
  }


  resize() {}
  update() {

    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    this.curve.getPointAt(this.lerp.current % 1, this.position)
    this.camera.orthographicCamera.position.copy(this.position)


    this.directionalVector.subVectors(
      this.curve.getPointAt((this.lerp.current % 1) + 0.000001),
      this.position
    );
    this.directionalVector.normalize();
    this.crossVector.crossVectors(
      this.directionalVector,
      this.staticVector,
    );
    this.crossVector.multiplyScalar(100000)
    this.camera.orthographicCamera.lookAt(0,0,0)
    
  }
}
