
// Sizes
const sizes = {
  width: 800,
  height: 600
}

// scene
const scene = new THREE.Scene()

//Red cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: '#ff0000' } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
console.log(mesh)

//Camera
const camera = new THREE.PerspectiveCamera( 45, sizes.width / sizes.height, 1, 1000 );
scene.add(camera)
camera.position.z = 3
console.log(camera)

//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)