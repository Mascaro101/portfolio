import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import profilePicture from '../assets/profilePicture.jpg';

const Starfield = () => {
  const mountRef = useRef(null);
  const mouse = { x: 0, y: 0 };

  useEffect(() => {
    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = -10;

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    // Stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

    const starVertices = [];
    for (let i = 0; i < 20000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Load Profile Picture Texture
    const textureLoader = new THREE.TextureLoader();
    const profileTexture = textureLoader.load(profilePicture);
    const profileMaterial = new THREE.SpriteMaterial({ map: profileTexture });
    const profileSprite = new THREE.Sprite(profileMaterial);
    const initialScale = calculateScale(window.innerWidth, window.innerHeight);
    profileSprite.scale.set(initialScale.width, initialScale.height, 1);
    profileSprite.position.set(-window.innerWidth / 4, 0, -500); 
    scene.add(profileSprite);

    // Create Name Text
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry("Miguel Mascaro", {
        font: font,
        size: 30,
        height: 1,
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(window.innerWidth / 5, window.innerHeight / 4, -500); 
      scene.add(textMesh);

      // Animation loop with text facing the camera
      const animate = () => {
        requestAnimationFrame(animate);

        stars.rotation.x += 0.0005;
        stars.rotation.y += 0.0005;

        camera.position.x = mouse.x * 5;
        camera.position.y = mouse.y * 5;

        renderer.render(scene, camera);
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        // Update positions and scale on resize
        profileSprite.scale.set(newScale.width, newScale.height, 1);
        profileSprite.position.set(-window.innerWidth / 4, 0, -500); 
        textMesh.position.set(window.innerWidth / 3, window.innerHeight / 3, -500); 
      };

      window.addEventListener('resize', handleResize);

      // Clean up on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });

    // Mouse move event
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Clean up on component unmount
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  const calculateScale = (width, height) => {
    const scale = Math.min(width, height) / 2;
    return {
      width: scale,
      height: scale * 1.3, 
    };
  };

  return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }} />;
};

export default Starfield;
