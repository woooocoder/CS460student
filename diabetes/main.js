import { initPane } from './gui.js'
import { getHUD } from './hud.js'
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js'; 
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

console.log('THREE init: ', THREE)
console.log('GLTF init: ', GLTFLoader)

// Scene
const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

// load mesh
const loader = new GLTFLoader()
loader.load('./animations/test.glb',
    function (gltf) {
        gltf.scene.position.set(0,-0.15,3)
        scene.add(gltf.scene)
    }, undefined,
    
    function (error) {
        console.log(error)
    }
)

scene.add(cube);
// Animation loop
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// const loader = new GLTFLoader().setPath('./public')
// loader.load('test.gltf', (gltf) => {
//     const mesh = gltf.scene
//     mesh.position.set(0,15,-1)
//     scene.add(mesh)
// })

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
getHUD()
initPane()
animate()
