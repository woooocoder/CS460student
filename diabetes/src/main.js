import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

import { toObject } from './data.js';
import { initPane } from './gui.js'
import { getHUD } from './nav.js'

import csv from '/diabetes.csv?url&raw'
console.log('THREE init: ', THREE)
console.log('GLTF init: ', GLTFLoader)


localStorage.setItem('data', csv)
// Scene
const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
 
// let cachedFont = null
// async function loadCSV(path) {
//     const data = await readCSV(path).then(console.log('Imported', path))
//     if (!cachedFont) {
//         const loader = new FontLoader()
//         cachedFont = await new Promise((resolve, reject) => {
//             loader.load(
//                 'imports/fonts/helvetiker_bold.typeface.json', 
//                 (font) => resolve(font),
//                 undefined,
//                 (err) => reject(err)
//             )   
//         })
//     } 
    
//     data.forEach((sample, index) => {
//         const text = `${sample}`
        
//         const textGeo = new TextGeometry(text, {
//             font: cachedFont,
//             size: 0.2,
//             height: 0.05
//         }); 
//         const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//         const textMesh = new THREE.Mesh(textGeo, textMaterial);
         
//         textMesh.position.set(-2, 2 - index * 0.5, 0);
//         scene.add(textMesh);
//     }) 
// }
// 
// loadCSV('/diabetes.csv').then(() => console.log('Loaded /diabetes.csv'))

async function load() {

    const loader = new FontLoader()
    const font = await new Promise((resolve, reject) => {
        loader.load(
            'imports/fonts/helvetiker_bold.typeface.json',
            font => resolve(font),
            undefined,
            err => reject(err)
        )
    })

    const data = toObject(csv)
    console.log(data)
    data.forEach((sample, index) => {
        const text = `${sample.Outcome}`

        const textGeo = new TextGeometry(text, {
            font: font,
            size: 0.2,
            height: 0.05
        })

        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        const textMesh = new THREE.Mesh(textGeo, textMaterial) 
        textMesh.position.set(-2, 2 - index * 0.5, 0)
        scene.add(textMesh)
    })
}

load()
function animate() {
    requestAnimationFrame(animate); 
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});



const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2() 
window.addEventListener('click', (event) => { 
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
     
    raycaster.setFromCamera(mouse, camera)
     
    const intersects = raycaster.intersectObjects(scene.children)
    
    if (intersects.length > 0) { 
        const targetPosition = intersects[0].point
        camera.position.set(targetPosition.x, targetPosition.y, targetPosition.z + 5)
    }
    const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    )
    scene.add(marker)
     
    if (intersects.length > 0) {
        marker.position.copy(intersects[0].point)
    }
})

getHUD()
initPane()
animate()
