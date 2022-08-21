import * as THREE from "three";
import Experience from "../Experience.js";

export default class Controls {
  constructor() {
    this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
    this.progress = 0
    this.dummyVector = new THREE.Vector3(0,0,0)

    this.setPath();
    this.onWheel()
  }
  
  setPath() {
//Create a closed wavey loop
this.curve = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( -10, 0, 10 ),
	new THREE.Vector3( -5, 5, 5 ),
	new THREE.Vector3( 0, 0, 0 ),
	new THREE.Vector3( 5, -5, 5 ),
	new THREE.Vector3( 10, 0, 10 )
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
            this.progress+=0.1;
        } else {
            this.progress -=0.1
            if(this.progress<0){
                this.progress =1;
            } // al revés
        
        }
    })
  }




  resize() {}
  update() {
    this.curve.getPointAt(this.progress%1, this.dummyVector)
    // this.progress-=0.01

    this.camera.orthographicCamera.position.copy(this.dummyVector)
    
  }
}
