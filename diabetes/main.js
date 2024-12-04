import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

import { readCSV } from './data.js';
import { initPane } from './gui.js'
import { getHUD } from './nav.js'



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
 

async function loadCSV(path) {
    const data = await readCSV(path).then(console.log('Imported', path))
    const loader = new FontLoader()
    loader.load('imports/fonts/helvetiker_bold.typeface.json', (font) => {
        data.forEach((sample, index) => {
            const text = `Sample ${index + 1}: Pregnancies=${sample.Pregnancies}, Glucose=${sample.Glucose}, BloodPressure=${sample.BloodPressure}, SkinThickness=${sample.SkinThickness}, BMI=${sample.BMI}, DiabetesPedigreeFunction=${sample.DiabetesPedigreeFunction}, Age=${sample.Age}, Outcome=${sample.Outcome}`;
            const textGeo = new TextGeometry(text, {
                font: font,
                size: 0.2,
                height: 0.05
            });
            
            const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const textMesh = new THREE.Mesh(textGeo, textMaterial);
            
            // Position the text
            textMesh.position.set(-2, 2 - index * 0.5, 0);
            scene.add(textMesh);
        })
    })
}

loadCSV('/diabetes.csv')

function animate() {
    requestAnimationFrame(animate); 
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY
    camera.position.z = 5 + scrollY * .05
})

getHUD()
initPane()
animate()
