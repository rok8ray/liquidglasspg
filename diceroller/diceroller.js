// starting stuff
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// renderer init
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// cube
const geometry = new THREE.BoxGeometry();

const loader = new THREE.TextureLoader();
const texture = [
  loader.load('dice/diceface1.png'),
  loader.load('dice/diceface2.png'),
  loader.load('dice/diceface3.png'),
  loader.load('dice/diceface4.png'),
  loader.load('dice/diceface5.png'),
  loader.load('dice/diceface6.png')
];
const material = texture.map(tex => new THREE.MeshStandardMaterial({ map: tex }));
const cube = new THREE.Mesh(geometry, material)
scene.add(cube);

// lighting
const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambLight);

const light = new THREE.PointLight(0xffffff, 100);
light.position.set(5, 5, 5);
scene.add(light);

let isPaused = false;

window.addEventListener('keydown', (event) => {
  if (event.code ==='Space') {
    isPaused = !isPaused;
  }
});

  let rotationSpeed = 0.01;
  const slider = document.getElementById('speedSlider');

  slider.addEventListener('input', () => {
    rotationSpeed = Number(slider.value);
  });

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += rotationSpeed;
    cube.rotation.y += rotationSpeed;
    renderer.render(scene, camera);
  }
  animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
