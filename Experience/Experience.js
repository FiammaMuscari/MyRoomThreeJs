import * as THREE from "three";

import Sizes from "./Utils/Sizes.js"
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Time from "./Utils/Time.js";

import World from "./Word/Word.js";

export default class Experience{
    static instance ;
    constructor(canvas){
        if(Experience.instance){
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.word = new World();

        this.sizes.on('resize',()=>{
            this.resize();
        });
        this.time.on('update',()=>{
            this.update();
        });
        
    }
    
    resize(){
        this.camera.resize();
        this.renderer.resize();
    }
    
    update(){
        this.camera.update();
        this.renderer.update();
    }
    
}