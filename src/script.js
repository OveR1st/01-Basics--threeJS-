import * as THREE from 'three';
import './style.css'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import gsap from 'gsap';
import * as dat from 'dat.gui';
import image1 from '../static/textures/minecraft.png';
import image2 from '../static/textures/checkerboard-1024x1024.png';
import image3 from '../static/textures/door/color.jpg';
import imageDoorAmbient from '../static/textures/door/ambientOcclusion.jpg'
import imageMatcap from '../static/textures/matcaps/3.png';
import imageDoorHeight from '../static/textures/door/height.jpg';
import imageDoorMetal from '../static/textures/door/metalness.jpg'
import imageDoorRough from '../static/textures/door/roughness.jpg'
import imageDoorNormal from '../static/textures/door/normal.jpg'
import imageDoorAlpha from '../static/textures/door/alpha.jpg'
import gradient from '../static/textures/gradients/3.jpg';
import typeface from '../static/fonts/helvetiker_regular.typeface.json'


const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.CubeTextureLoader()
    .setPath('textures/environmentMaps/0/')
    .load([
      'px.jpg',
      'nx.jpg',
      'py.jpg',
      'ny.jpg',
      'pz.jpg',
      'nz.jpg'
    ]);


// Add Debug
const gui = new dat.GUI({closed: true})

/*
// Texture
 */

const loadingManager = new THREE.LoadingManager()
const cubeTextureLoader = new THREE.CubeTextureLoader().setPath('textures/environmentMaps/0/')

loadingManager.onStart = () => {
  console.log('onStart')
}
loadingManager.onLoad = () => {
  console.log('onLoad')
}
loadingManager.onProgress = () => {
  console.log('onProgress')
}
loadingManager.onError = () => {
  console.log('onError')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
// const texture1 = textureLoader.load(image1)
// const texture2 = textureLoader.load(image2)
// const imageDoor = textureLoader.load(image3)
// const textureDoorAmbient = textureLoader.load(imageDoorAmbient)
// const doorHeightTexture = textureLoader.load(imageDoorHeight)
// const doorMetalnessTexture = textureLoader.load(imageDoorMetal)
// const doorRoughnessTexture = textureLoader.load(imageDoorRough)
// const doorNormalTexture = textureLoader.load(imageDoorNormal)
// const doorAlphaTexture = textureLoader.load(imageDoorAlpha)
const textureMatcap = textureLoader.load(imageMatcap)

const environmentMapTexture = cubeTextureLoader.load([
  'px.jpg',
  'nx.jpg',
  'py.jpg',
  'ny.jpg',
  'pz.jpg',
  'nz.jpg',
])
/*
* Fonts
*/
const fontLoader = new THREE.FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
      const textGeometry = new THREE.TextBufferGeometry(
          'Hello Three.js',
          {
            font,
            size: 0.5,
            height: 0.2,
            curveSegments: 5,
            bavelEnabled: true,
            bavelThickness: 0.03,
            bevelSizeL: 0.02,
            bavelOffset: 0,
            bevelSegments: 4
          }
      )

      // textGeometry.computeBoundingBox()
      textGeometry.center()

      // textGeometry.translate(
      //     -textGeometry.boundingBox.max.x * 0.5,
      //     -textGeometry.boundingBox.max.y * 0.5,
      //     -textGeometry.boundingBox.max.z * 0.5,
      // )

      const material = new THREE.MeshStandardMaterial()
      material.metalness = 0.6
      material.roughness = 0
      material.matcap = textureMatcap
      material.envMap = environmentMapTexture

      gui.add(material, 'metalness', 0, 1, 0.0001)
      gui.add(material, 'roughness', 0, 1, 0.0001)
      // gui.add(material, 'aoMapIntensity', 0, 10, 0.0001)
      // gui.add(material, 'displacementScale', 0, 10, 0.0001)

      // textMaterial.wireframe = true
      const text = new THREE.Mesh(textGeometry, material)
      scene.add(text)

      console.time('donuts')


      const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
      // const donutMaterial = new THREE.MeshMatcapMaterial({matcap: textureMatcap})


      for (let i = 0; i < 100; i++) {
        console.log(i)
        const donut = new THREE.Mesh(donutGeometry, material);

        donut.position.x = (Math.random() - 0.5) * 10
        donut.position.y = (Math.random() - 0.5) * 10
        donut.position.z = (Math.random() - 0.5) * 10

        donut.rotation.x = Math.random() * Math.PI
        donut.rotation.y = Math.random() * Math.PI

        const scale = Math.random()
        donut.scale.set(scale, scale, scale)

        scene.add(donut);

        // console.log(donut);
      }
      console.timeEnd('donuts')

      const parameters = {
        color: 0x86699b,
        spin: () => {
          // gsap.to(donut.rotation, {duration: 1, y: donut.rotation.y + 10})
          console.log('spin')
        }
      }

      gui
          .addColor(parameters, 'color')
          .onChange(() => {
            material.color.set(parameters.color)
            console.log('color change')
          })

    }
)

// // Add Debug
// const gui = new dat.GUI({closed: true})
// const parameters = {
//   color: 0x86699b,
//   spin: () => {
//     gsap.to(cube1.rotation, {duration: 1, y: cube1.rotation.y + 10})
//   }
// }
//
// gui
//     .addColor(parameters, 'color')
//     .onChange(() => {
//       cube1.material.color.set(parameters.color)
//     })
//
// gui
//     .add(parameters, 'spin')


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
// const scene = new THREE.Scene()
// scene.background = new THREE.CubeTextureLoader()
//     .setPath('textures/environmentMaps/0/')
//     .load([
//       'px.jpg',
//       'nx.jpg',
//       'py.jpg',
//       'ny.jpg',
//       'pz.jpg',
//       'nz.jpg'
//     ]);

//Group
// const group = new THREE.Group()
// scene.add(group)

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


// Objects
// const cube1 = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2),
//     new THREE.MeshBasicMaterial({map: texture, wireframe: false})
// )
// group.add(cube1)
// const material = new THREE.MeshNormalMaterial({map: texture1})

// const material = new THREE.MeshLambertMaterial()
// const material = new THREE.MeshStandardMaterial()
// const material = new THREE.MeshToonMaterial()
// material.metalness = 0.45
// material.roughness = 0.65
// material.envMap = environmentMapTexture
// material.shininess = 1000
// material.map = imageDoor
// material.aoMap = textureDoorAmbient
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.transparent = true
// material.alphaMap = doorAlphaTexture


// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshMatcapMaterial()

// material.matcap = textureMatcap


// material.transparent = true

// material.flatShading = true


// const sphere = new THREE.Mesh(
//     new THREE.SphereBufferGeometry(0.5, 16, 16),
// )

// sphere.geometry.setAttribute(
//     'uv2',
//     new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
// )

// const plane = new THREE.Mesh(
//     new THREE.PlaneBufferGeometry(1, 1,),
// )
// plane.geometry.setAttribute(
//     'uv2',
//     new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
// )

// const torus = new THREE.Mesh(
//     new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
// )
// torus.geometry.setAttribute(
//     'uv2',
//     new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
// )

// sphere.position.set(-1.5, 0, 0)
// plane.position.set(0, 0, 0)
// torus.position.set(1.5, 0, 0)

// group.add(sphere, plane, torus)

/*
 * Lights
*/
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// texture.repeat.x = 2;
// texture.repeat.y = 3;
// texture.wrapS = THREE.RepeatWrapping
// texture.wrapT = THREE.RepeatWrapping
//
// texture.offset.x = 0.5
// texture.offset.y = 0.5

// texture.rotation = Math.PI / 4
//
// texture.center.x = 0.5
// texture.center.y = 0.5

// imageDoor.generateMipmaps = false
// imageDoor.minFilter = THREE.NearestFilter
// imageDoor.magFilter = THREE.NearestFilter

// console.log(cube1.geometry.attributes.uv)


// Debug settings
// gui.add(group.position, 'y', -3, 3, 0.01) // min,max,step,name
// gui.add(group.position, 'x', -3, 3, 0.01)
// gui.add(group.position, 'z', -3, 3, 0.01)

// gui.add(group, 'visible')
// gui.add(sphere.material, 'wireframe')

// gui.add(sphere.scale, 'x', 0, 10, 0.01)
// gui.add(sphere.scale, 'y', 0, 10, 0.01)
// gui.add(sphere.scale, 'z', 0, 10, 0.01)

// gui.add(material, 'metalness', 0, 1, 0.0001)
// gui.add(material, 'roughness', 0, 1, 0.0001)
// gui.add(material, 'aoMapIntensity', 0, 10, 0.0001)
// gui.add(material, 'displacementScale', 0, 10, 0.0001)


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
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1000)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1*aspectRatio,1*aspectRatio,1,-1, 0.1,100)
// console.log(aspectRatio)
scene.add(camera)

// camera.position.z =
camera.position.set(1, 2, -3)
// camera.lookAt(group.position)

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

// const clock = new THREE.Clock();

//
const tick = () => {
  // const elapsedTime = clock.getElapsedTime()
  //Objects
  // sphere.rotation.y = 0.1 * elapsedTime
  // plane.rotation.y = 0.1 * elapsedTime
  // torus.rotation.y = 0.1 * elapsedTime
  //
  // sphere.rotation.x = 0.15 * elapsedTime
  // plane.rotation.x = 0.15 * elapsedTime
  // torus.rotation.x = 0.15 * elapsedTime

  // gsap.to(group.position, {duration: 1, delay: 1, y: Math.sin(8)})
  // gsap.to(group.position, {duration: 1, delay: 2, x: Math.cos(4)})

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