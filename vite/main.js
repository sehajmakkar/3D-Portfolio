import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.getElementById('canvas');

const scene = new THREE.Scene();
scene.background = new THREE.Color('#f0f0f0');

// window.innerWidth / window.innerHeight -> whole screen
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#111111' });
const dode = new THREE.Mesh(geometry, material);
scene.add(dode);

const newgeo = new THREE.BoxGeometry(2,0.1,2);
const newmat = new THREE.MeshLambertMaterial({ color: '#468585', emissive: '#111111' });
const box = new THREE.Mesh(newgeo, newmat);
scene.add(box);
box.position.y = -1.5;


const light = new THREE.DirectionalLight(0x006769, 100);
light.position.set(1, 1, 1);
scene.add(light);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.pixelRatio = window.devicePixelRatio;
// renderer.render(scene, camera);

// add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
// controls.enableRotate = true;
controls.enableZoom = true;
controls.enablePan = true;

///animate 
function animate() {
  requestAnimationFrame(animate);
  dode.rotation.x += 0.01;
  dode.rotation.y += 0.01;
  // dode.rotation.z += 0.01;
  // box.rotation.x += 0.01;
  box.rotation.y += 0.005;
  // box.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

//handle window resizing (handle in mobile screen)
window.addEventListener('resize', () => { 
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();





