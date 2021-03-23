import * as THREE from 'three';
import './style.css'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import gsap from 'gsap';
import * as dat from 'dat.gui';
import imageSource from '../static/door.jpg';

// Texture
const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
  console.log('onStart')
}
loadingManager.onLoad = () => {
  console.log('onLoad')
}
loadingManager.onProgress = () => {
  console.log('onProgress')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const texture = textureLoader.load(imageSource)

// Add Debug
const gui = new dat.GUI({ closed: true })
const parameters = {
  color: 0x86699b,
  spin: () => {
    gsap.to(cube1.rotation, { duration: 1, y: cube1.rotation.y + 10 })
  }
}

gui
    .addColor(parameters, 'color')
    .onChange(() => {
      cube1.material.color.set(parameters.color)
    })

gui
    .add(parameters, 'spin')

const canvas = document.querySelector('.webgl')

// Cursor
const cursor = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / sizes.width
  cursor.y = -(e.clientY / sizes.height)
})

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  //update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})

// scene
const scene = new THREE.Scene()

//Object
const group = new THREE.Group()
scene.add(group)

// const geometry = new THREE.Geometry();
// const geometry = new THREE.BufferGeometry();
//
// const count = 50;
//
// const positionsArray = new Float32Array(count * 3 * 3)
//
// for (let i = 0; i < positionsArray.length; i++) {
//   positionsArray[i] = Math.random()
// }
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
//
// geometry.setAttribute('position', positionsAttribute)

const cube1 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2),
    new THREE.MeshBasicMaterial({map: texture, wireframe: false})
)
group.add(cube1)

// Debug settings
gui.add(group.position, 'y', -3, 3, 0.01) // min,max,step,name
gui.add(group.position, 'x', -3, 3, 0.01)
gui.add(group.position, 'z', -3, 3, 0.01)

gui.add(group, 'visible')
gui.add(cube1.material, 'wireframe')

gui.add(cube1.scale, 'x', 0, 10, 0.01)
gui.add(cube1.scale, 'y', 0, 10, 0.01)
gui.add(cube1.scale, 'z', 0, 10, 0.01)
console.log(cube1)


// cube1.position.set(0, 0, 0)

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({color: '#3dccd9'})
// )
// group.add(cube2)
// cube2.position.x = 2;
//
// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({color: '#d9b23d'})
// )
// group.add(cube3)
// cube3.position.x = -2

//AxesHelper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1000)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1*aspectRatio,1*aspectRatio,1,-1, 0.1,100)
// console.log(aspectRatio)
scene.add(camera)
// camera.position.z =
camera.position.set(1, 2, -3)
// camera.lookAt(group.position)
console.log(camera)

// console.log(mesh.position.distanceTo(camera.position)) // длина вектора

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//Renderer

const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.render(scene, camera)

//Animate
// gsap.to(group.position, {duration: 1, delay: 1, y: Math.sin(8)})
// gsap.to(group.position, {duration: 1, delay: 2, x: Math.cos(4)})

const clock = new THREE.Clock();
//
const tick = () => {
  // gsap.to(group.position, {duration: 1, delay: 1, y: Math.sin(8)})
  // gsap.to(group.position, {duration: 1, delay: 2, x: Math.cos(4)})
  // const elapsedTime = clock.getElapsedTime()
//   //time
//   camera.position.y = Math.sin(elapsedTime);
//   camera.rotation.y = Math.sin(elapsedTime);
//   group.rotation.y = Math.cos(elapsedTime);
// camera.position.x = Math.sin(cursor.x * Math.PI * 2) *3
// camera.position.z = Math.cos(cursor.x * Math.PI * 2)*3
// camera.position.y = cursor.y * 10
  controls.update()
  // camera.lookAt(group.position)
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick();