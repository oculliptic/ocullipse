

import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js' 


// to watch: https://youtu.be/DPl34H2ISsk?si=vmXbAkDyettKzorA 
// https://r3f.docs.pmnd.rs/getting-started/introduction 
function Box(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta;
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : '#2f74c0'} />
    </mesh>
  );
}

function Scene() {
  const gltf = useLoader(GLTFLoader, './public/CB-test3.gltf')
  return <primitive object={gltf.scene} />
}

export default function ThreeDViewer() {
	// const THREE.Camera{70, 0.1, 1000, []}

	return (
		<div style={{ width: '100vw', height: '100vh' }}>
		<Canvas>
			<ambientLight intensity={Math.PI / 2} />
			<spotLight
			position={[10, 10, 10]}
			angle={0.15}
			penumbra={1}
			decay={0}
			intensity={Math.PI}
			/>
			<pointLight
			position={[-10, -10, -10]}
			decay={0}
			intensity={Math.PI}
			/>
			<Scene/>
			{/* <Box position={[-1.2, 0, 0]} />
			<Box position={[1.2, 0, 0]} /> */}
		</Canvas>
		</div>
	);
}




// https://youtu.be/Q7AOvWpIVHU?si=NVuSvddKYKFdR8Iv 
//// https://r3f.docs.pmnd.rs/getting-started/examples
// https://codesandbox.io/p/sandbox/nvk9pf?file=%2Fsrc%2FApp.js 
// https://docs.pmnd.rs/ 
// https://r3f.docs.pmnd.rs/getting-started/introduction 
















// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';




// function ThreeDViewer() {
//   	const mountRef = useRef<HTMLDivElement | null>(null);

// 	let fov = 50 // mm? 

// 	useEffect(() => {
// 		const mount = mountRef.current;
// 		if (!mount) return;

// 		const width = mount.clientWidth || window.innerWidth;
// 		const height = mount.clientHeight || window.innerHeight;


// 		const camera = new THREE.PerspectiveCamera(fov, width / height, 0.01, 10);
// 		// fov , aspect ratio , near , far (FUSTRUM PAREM)
// 		camera.position.z = 1;


// 		const scene = new THREE.Scene();


// 		const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
// 		const material = new THREE.MeshNormalMaterial();
// 		const mesh = new THREE.Mesh(geometry, material);

// 		scene.add(mesh);

// 		const renderer = new THREE.WebGLRenderer({ antialias: true });




// 		renderer.setSize(width, height);
// 		mount.appendChild(renderer.domElement);

// 		renderer.render(scene, camera);

// 		return () => {
// 		geometry.dispose();
// 		material.dispose();
// 		renderer.dispose();

// 		if (mount.contains(renderer.domElement)) {
// 			mount.removeChild(renderer.domElement);
// 		}
// 		};
// 	}, []);

//   return 
// }

// export default ThreeDViewer;