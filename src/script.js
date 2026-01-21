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
const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
const textTexture = textureLoader.load("/textures/matcaps/7.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;
textTexture.colorSpace = THREE.SRGBColorSpace;
/**
 * Fonts
 */
const fontLoader = new FontLoader();

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


  // textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //   - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //   - (textGeometry.boundingBox.max.z - 0.03) * 0.5,
  // )
  textGeometry.center();

  const doughnutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: textTexture });
  const subTextMaterial = new THREE.MeshMatcapMaterial({ matcap: textTexture });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  const subTextMesh = new THREE.Mesh(subTextGeometry, subTextMaterial);

  scene.add(textMesh);
  scene.add(subTextMesh);
  subTextGeometry.translate(-3.93, -0.5, 0);
  console.time("donuts");
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

  for(let i = 0; i < 300; i++) {
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

  console.timeEnd("donuts");
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
camera.position.z = 5;
scene.add(camera);

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
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
