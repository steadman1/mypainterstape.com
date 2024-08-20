import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { modelScale } from 'three/webgpu';

// Extend Three.js with OrbitControls
extend({ OrbitControls: ThreeOrbitControls });

const Model = ({ url, canvasRef }) => {
  const modelRef = useRef();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const [isSetup, setIsSetup] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [direction, setDirection] = useState(-1);
  const [positionalVelocity, setPositionalVelocity] = useState(0.2);
  const [rotationalXVelocity, setRotationalXVelocity] = useState(0.2);
  const [rotationalYVelocity, setRotationalYVelocity] = useState(0.2);
  const [rotationalZVelocity, setRotationalZVelocity] = useState(0.2);
  const positionalVelocityDampingFactor = 0.92;
  const rotationalVelocityDampingFactor = 0.92;
  const scrollDampingFactor = 0.97;

  // Load the model and log when it is fully loaded
  const model = useLoader(GLTFLoader, url, (loader) => {
    loader.manager.onLoad = () => {
      const modelLoaded = new Event("modelLoaded");
      canvasRef.current.dispatchEvent(modelLoaded);
    };
  });

  // Function to apply smooth shading to all objects in the scene
  const applySmoothShading = (scene) => {
    scene.traverse((object) => {
      if (object.isMesh) {
        object.material.flatShading = false; // Enable smooth shading
        object.material.shading = THREE.SmoothShading;

        object.geometry.computeVertexNormals(true);

        object.material.needsUpdate = true;  // Ensure the material updates

        object.castShadow = true;
      }
    });
  };

  const adjustModelScale = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Assuming your model's original size is designed to fit in a unit cube or similar proportion.
    // We calculate the scale factor to make the model 1/3rd of the window's dimensions.
    const scaleFactorX = windowWidth / 800;
    const scaleFactorY = windowHeight / 800;

    // Choose the smaller scale factor to maintain aspect ratio
    const scaleFactor = Math.min(scaleFactorX, scaleFactorY, 0.7);
    
    // Set the scale for the model
    modelRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
  };  

  const adjustModelRotation = () => {
    const xRotation = Math.PI / 2;
    const yRotation = Math.PI / 6;
    const zRotation = -Math.PI / 3;

    // Set the scale for the model
    modelRef.current.rotation.set(xRotation, yRotation, zRotation);
  }; 

  const setupCinematicLighting = (scene) => {
    // Key Light - The main light source, usually positioned at an angle
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(50, 100, 50); // Positioned to the upper front-left of the model
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 500;
    scene.add(keyLight);
  
    // Fill Light - Softer light to fill in the shadows created by the key light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-50, 50, 50); // Positioned to the upper front-right of the model
    fillLight.castShadow = false; // Usually doesn't cast shadows
    scene.add(fillLight);
  
    // Rim Light - Creates a highlight on the edges of the model, adding depth and separation from the background
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.0);
    rimLight.position.set(0, 100, -100); // Positioned behind the model
    rimLight.castShadow = false;
    scene.add(rimLight);
  
    // Ambient Light - Soft, overall illumination that affects all objects in the scene
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3); // Soft ambient light
    scene.add(ambientLight);
  
    // Optionally, you can add a spotlight for more dramatic effects
    const spotlight = new THREE.SpotLight(0xffffff, 0.8);
    spotlight.position.set(100, 200, 100);
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;
    spotlight.shadow.camera.near = 0.5;
    spotlight.shadow.camera.far = 500;
    scene.add(spotlight);
  };

  const handleRaycastIntersection = (event) => {
    const intersection = event.intersections[0]; // Get the first intersection
    if (intersection) {
      const normal = intersection.face.normal; // The normal of the intersected face
      const point = intersection.point; // The point of intersection
      const distance = intersection.distance; // Distance from the camera to the intersection

      // Adjust rotational velocities based on the intersection normal
      setRotationalXVelocity(prev => prev + normal.x * 0.5);
      setRotationalYVelocity(prev => prev + normal.y * 0.5);
      setRotationalZVelocity(prev => prev + normal.z * 0.5);

      console.log('Intersection', {
        normal,
        point,
        distance,
        rotationalXVelocity,
        rotationalYVelocity,
        rotationalZVelocity,
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === lastScrollY) {
        setDirection(_ => {
          return 0;
        });
      
        setLastScrollY(_ => {
          return currentScrollY;
        });
        return;
      };

      const scrollDirection = currentScrollY > lastScrollY ? -1 : 1;

      setPositionalVelocity(_ => {
        return Math.abs(currentScrollY - lastScrollY) * 0.005;
      });

      setDirection(_ => {
        return scrollDirection;
      });

      setLastScrollY(_ => {
        return currentScrollY;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (modelRef.current && !isSetup) {
      adjustModelScale();
      adjustModelRotation();
      applySmoothShading(modelRef.current.parent);
      setupCinematicLighting(modelRef.current.parent);
      setIsSetup(true);
    }
  }, [modelRef.current]);

  useEffect(() => {
    window.addEventListener('resize', adjustModelScale);
    return () => window.removeEventListener('resize', adjustModelScale);
  }, []);

  useFrame((state) => {
    raycaster.current.setFromCamera(mouse.current, state.camera);
    const intersects = raycaster.current.intersectObject(modelRef.current, true);

    if (intersects.length > 0) {
      // console.log('Intersection:', intersects);
    }

    if (modelRef.current) {
      modelRef.current.position.y += (positionalVelocity * direction);

      modelRef.current.position.y *= scrollDampingFactor;

      setPositionalVelocity(prevState => {
        return prevState * positionalVelocityDampingFactor;
      });
    }
  });

  return (
    <primitive
      object={model.scene}
      ref={modelRef}
      onClick={(e) => console.log('Click', e)}
      // onPointerOver={(e) => console.log('Pointer Over', e)}
      // onPointerOut={(e) => console.log('Pointer Out', e)}
    />
  );
};

const OrbitControls = () => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useFrame(() => controls.current.update());

  return <orbitControls ref={controls} args={[camera, gl.domElement]} />;
};

const ThreeScene = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const modelLoadedHandler = () => {
      console.log('Model Loaded Event');
    };

    canvas.addEventListener('modelLoaded', modelLoadedHandler);

    return () => {
      canvas.removeEventListener('modelLoaded', modelLoadedHandler);
    };
  }, []);

  return (
    <Canvas ref={canvasRef} style={{ height: '100dvh', width: '100dvw' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Model url="/pt-roll/painter_stape.gltf" canvasRef={canvasRef} />
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

export default ThreeScene;
