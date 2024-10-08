import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
// import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber';
// import { OrbitControls as ThreeOrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { isMobile } from 'react-device-detect';
import { useLocomotiveScroll } from '../hooks/useLocomotiveScroll';

// Extend Three.js with OrbitControls
// extend({ OrbitControls: ThreeOrbitControls });

const Model = ({ url, canvasRef }: { url: string, canvasRef: React.RefObject<HTMLCanvasElement | null> }) => {
  const modelRef = useRef<THREE.Group>(null);
  const scrollRef = useLocomotiveScroll();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const [isSetup, setIsSetup] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [direction, setDirection] = useState(-1);
  const [positionalVelocity, setPositionalVelocity] = useState(0.25);
  const [rotationalXVelocity, setRotationalXVelocity] = useState(0);
  const [rotationalYVelocity, setRotationalYVelocity] = useState(0);
  const [rotationalZVelocity, setRotationalZVelocity] = useState(0);
  const positionalVelocityDampingFactor = 0.91;
  const rotationalVelocityDampingFactor = 0.97;
  const scrollDampingFactor = 0.96;

  // Load the model and log when it is fully loaded
  const model = useLoader(GLTFLoader, url, (loader) => {
    loader.manager.onLoad = () => {
      if (canvasRef.current) {
        const modelLoaded = new Event("modelLoaded");
        canvasRef.current.dispatchEvent(modelLoaded);
      }
    };
  });

  // Function to apply smooth shading to all objects in the scene
  const applySmoothShading = (scene: THREE.Object3D<THREE.Object3DEventMap> | null) => {
    if (scene) {
      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh;
          if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.flatShading = false; // Enable smooth shading
          }
          
          mesh.geometry.computeVertexNormals();
          
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) => {
              if (material instanceof THREE.MeshStandardMaterial) {
                material.needsUpdate = true; // Ensure the material updates
              }
            });
          } else {
            const material = mesh.material as THREE.MeshStandardMaterial;
            material.needsUpdate = true; // Ensure the material updates
          }
          
          mesh.castShadow = true;
        }
      });
    }
  };

  const adjustModelRotation = () => {
    if (!modelRef.current) return;
    const initRotations = [
      { x: 1.35, y: 0.26, z: -2.48 },
      { x: 1.54, y: 1.14, z: -2.21 },
      { x: 1.33, y: 0.68, z: -0.79 },
      { x: 2.25, y: 0.13, z: -0.43 },
      { x: 2.13, y: 0.99, z: 2.47 },
      { x: 1.41, y: 0.74, z: 1.99 },
      { x: 0.99, y: 0.54, z: 2.84 },
      { x:0.49, y: 0.36, z: 1.46 },
      { x: 0.59, y: 0.83, z: 1.13 },
    ]

    const rotation = initRotations[Math.floor(Math.random() * initRotations.length)];

    modelRef.current.rotation.set(rotation.x, rotation.y, rotation.z);

    // const x = Math.PI * Math.random();
    // const y = Math.PI * Math.random();
    // const z = Math.PI * Math.random();

    // console.log('Adjusting Model Rotation', { x, y, z });

    // modelRef.current.rotation.set(x, y, z);
  }; 

  const adjustModelScale = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Assuming your model's original size is designed to fit in a unit cube or similar proportion.
    // We calculate the scale factor to make the model 1/3rd of the window's dimensions.
    const divisor = isMobile ? 450 : 800;
    const scaleFactorX = windowWidth / divisor;
    const scaleFactorY = windowHeight / divisor;
  
    // Choose the smaller scale factor to maintain aspect ratio
    const scaleFactor = Math.min(scaleFactorX, scaleFactorY, 0.8);
    
    // Set the scale for the model if modelRef.current is defined
    if (modelRef.current) {
      modelRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  };

  const setupCinematicLighting = (scene: THREE.Object3D<THREE.Object3DEventMap> | null) => {
    if (!scene) return;

    // Key Light - The main light source, usually positioned at an angle
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.1);
    keyLight.position.set(50, 100, 50); // Positioned to the upper front-left of the model
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 500;
    scene.add(keyLight);
  
    // Fill Light - Softer light to fill in the shadows created by the key light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.2);
    fillLight.position.set(-50, 50, 50); // Positioned to the upper front-right of the model
    fillLight.castShadow = false; // Usually doesn't cast shadows
    scene.add(fillLight);
  
    // Rim Light - Creates a highlight on the edges of the model, adding depth and separation from the background
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rimLight.position.set(0, 100, -100); // Positioned behind the model
    rimLight.castShadow = false;
    scene.add(rimLight);
  
    // Ambient Light - Soft, overall illumination that affects all objects in the scene
    const ambientLight = new THREE.AmbientLight(0x404040, 0.1); // Soft ambient light
    scene.add(ambientLight);
  
    // Optionally, you can add a spotlight for more dramatic effects
    const spotlight = new THREE.SpotLight(0xffffff, 0.2);
    spotlight.position.set(100, 200, 100);
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;
    spotlight.shadow.camera.near = 0.5;
    spotlight.shadow.camera.far = 500;
    scene.add(spotlight);
  };

  const handleRaycastIntersection = (event: { intersections: THREE.Intersection[]; }) => {
    const intersection = event.intersections[0]; // Get the first intersection
    if (intersection.face) {
      const normal = intersection.face.normal; // The normal of the intersected face

      // Adjust rotational velocities based on the intersection normal
      setRotationalXVelocity(prev => prev + normal.x * 0.5);
      setRotationalYVelocity(prev => prev + normal.y * 0.5);
      setRotationalZVelocity(prev => prev + normal.z * 0.5);
    }
  };

  useEffect(() => {
    if (!scrollRef || !scrollRef.current) return;

    const handleScroll = (args: { scroll: { y: number; }; }) => {
      const currentScrollY = args.scroll.y; // Use Locomotive Scroll's scroll position

      if (currentScrollY === lastScrollY) {
        setDirection(0);
        setLastScrollY(currentScrollY);
        return;
      }

      const scrollDirection = currentScrollY > lastScrollY ? -1 : 1;

      setPositionalVelocity(Math.abs(currentScrollY - lastScrollY) * 0.005);

      setDirection(scrollDirection);

      setLastScrollY(currentScrollY);
    };

    const scrollRefCurrent = scrollRef.current;

    // Listen to Locomotive Scroll's scroll event
    scrollRefCurrent.on('scroll', handleScroll);

    return () => {
      if (scrollRefCurrent) {
        scrollRefCurrent.off('scroll', handleScroll);
      }
    };
  }, [lastScrollY, scrollRef]);

  useEffect(() => {
    if (modelRef.current && !isSetup) {
      adjustModelScale();
      adjustModelRotation();
      applySmoothShading(modelRef.current.parent);
      setupCinematicLighting(modelRef.current.parent);
      setIsSetup(true);
    }
  }, [modelRef, isSetup]);

  useEffect(() => {
    window.addEventListener('resize', adjustModelScale);
    return () => window.removeEventListener('resize', adjustModelScale);
  }, []);

  useFrame((state) => {
    if (!modelRef.current) return;
    raycaster.current.setFromCamera(mouse.current, state.camera);
    const intersects = raycaster.current.intersectObject(modelRef.current, true);

    if (intersects.length > 0) {
      // handleRaycastIntersection({ intersections: intersects });
    }

    if (modelRef.current) {
      modelRef.current.position.y += (positionalVelocity * direction);
      modelRef.current.position.y *= scrollDampingFactor;

      modelRef.current.rotation.x += positionalVelocity * 0.5 * direction;

      setPositionalVelocity(prevState => {
        return prevState * positionalVelocityDampingFactor;
      });

      const dampenDampeningFactor = 0.1;
      modelRef.current.rotation.set(
        modelRef.current.rotation.x + rotationalXVelocity * rotationalVelocityDampingFactor * dampenDampeningFactor, 
        modelRef.current.rotation.y + rotationalYVelocity * rotationalVelocityDampingFactor * dampenDampeningFactor, 
        modelRef.current.rotation.z + rotationalZVelocity * rotationalVelocityDampingFactor * dampenDampeningFactor
      );

      setRotationalXVelocity(prev => prev * rotationalVelocityDampingFactor);
      setRotationalYVelocity(prev => prev * rotationalVelocityDampingFactor);
      setRotationalZVelocity(prev => prev * rotationalVelocityDampingFactor);
    }
  });

  return (
    <primitive
      object={model.scene}
      ref={modelRef}
      onClick={(e: { intersections: THREE.Intersection[]; }) => handleRaycastIntersection(e)}
      // onPointerOver={(e) => handleRaycastIntersection(e)}
      // onPointerOut={(e) => handleRaycastIntersection(e)}
    />
  );
};

// const OrbitControls = () => {
//   const { camera, gl } = useThree();
//   const controls = useRef();

//   useFrame(() => controls.current.update());

//   return (
//   <orbitControls 
//     ref={controls} 
//     args={[camera, gl.domElement]}
//     enableZoom={false}
//     enablePan={false}
//     enableRotate={true}
//   />
//   );
// };

const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div data-scroll data-scroll-speed="0.2" data-scroll-position="top">
      <Canvas ref={canvasRef} style={{ height: "100dvh", width: "100vw", maxWidth: "100%" }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <Model url="/pt-roll/painter_stape.gltf" canvasRef={canvasRef} />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
};

export default ThreeScene;
