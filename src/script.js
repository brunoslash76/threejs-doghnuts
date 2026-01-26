import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Axes Helper

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
const textTexture = textureLoader.load("/textures/matcaps/7.png");

const logoTexture = textureLoader.load("/logo.png");

matcapTexture.colorSpace = THREE.SRGBColorSpace;
textTexture.colorSpace = THREE.SRGBColorSpace;
logoTexture.colorSpace = THREE.SRGBColorSpace;
/**
 * Fonts
 */
const fontLoader = new FontLoader();
let logoMesh;

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Bruno Tavares de Moraes Russo", {
    font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 40,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegment: 2,
  });

  const subTextGeometry = new TextGeometry("Software Engineer", {
    font,
    size: 0.2,
    depth: 0.2,
    curveSegments: 40,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegment: 2,
  });
  subTextGeometry.center();

  const logoGeometry = new THREE.CircleGeometry(1.2, 32);
  const logoMaterial = new THREE.MeshBasicMaterial({
    map: logoTexture,
    side: THREE.DoubleSide,
    transparent: true,
  });
  logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
  logoMesh.position.set(0, 1, 0);
  scene.add(logoMesh);

  textGeometry.center();

  const doughnutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: textTexture });
  const subTextMaterial = new THREE.MeshMatcapMaterial({ matcap: textTexture });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  const subTextMesh = new THREE.Mesh(subTextGeometry, subTextMaterial);


  scene.add(textMesh);
  scene.add(subTextMesh);
  subTextGeometry.translate(-3.93, -0.5, 0);

  const donutGeometry = new THREE.SphereGeometry(0.3, 20, 20);

  for(let i = 0; i < 200; i++) {
    const donutMesh = new THREE.Mesh(donutGeometry, doughnutMaterial);

    donutMesh.position.x = (Math.random() - 0.5) * 10;
    donutMesh.position.y = (Math.random() - 0.5) * 10;
    donutMesh.position.z = (Math.random() - 0.5) * 10;

    donutMesh.rotation.x = Math.random() * Math.PI;
    donutMesh.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    donutMesh.scale.set(scale, scale, scale);

    scene.add(donutMesh);
  }

});

/**
 * Object
 */


/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 7;
scene.add(camera);

gui.add(camera.position, 'x').min(-3).max(3).step(0.001).name('Camera X');
gui.add(camera.position, 'y').min(-3).max(3).step(0.001).name('Camera Y');
gui.add(camera.position, 'z').min(-3).max(3).step(0.001).name('Camera Z');

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  
  // logoMesh.position.x = Math.sin(elapsedTime) * 1.5;
  // logoMesh.position.y = Math.cos(elapsedTime) * 1.5;
  // logoMesh.position.z = 10 + Math.cos(elapsedTime) * 0.5;
  // logoMesh.lookAt(scene.position);
  // logoMesh.position.x = Math.sin(elapsedTime) * 1.5;
  if (logoMesh) {
    logoMesh.rotation.y += Math.PI * 2 * 0.001;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

