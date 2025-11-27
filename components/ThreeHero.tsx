import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ThreeHero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    // Darker fog to hide the "end" of the world
    scene.fog = new THREE.FogExp2(0x0f172a, 0.015); 

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // --- Geometries ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. The Gate (Torus) - Orientated to fly THROUGH
    // We increase tube radius to make the "tunnel" thicker
    const torusGeo = new THREE.TorusGeometry(8, 2, 16, 100); 
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x6366f1, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.3 
    });
    const torus = new THREE.Mesh(torusGeo, material);
    mainGroup.add(torus);

    // 2. Secondary Ring (Inner)
    const torusGeo2 = new THREE.TorusGeometry(12, 0.5, 16, 100);
    const material2 = new THREE.MeshBasicMaterial({ color: 0xec4899, wireframe: true, transparent: true, opacity: 0.1 });
    const torus2 = new THREE.Mesh(torusGeo2, material2);
    // Rotate slightly for visual interest
    torus2.rotation.x = Math.PI / 4; 
    mainGroup.add(torus2);

    // 3. Infinite Starfield - MORE PARTICLES for longer journey
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    
    // Spread particles deep into the Z axis (tunnel effect)
    for(let i = 0; i < particlesCount * 3; i+=3) {
        posArray[i] = (Math.random() - 0.5) * 150; // x wide
        posArray[i+1] = (Math.random() - 0.5) * 150; // y high
        posArray[i+2] = (Math.random() - 0.5) * 600 - 100; // z deep (negative to positive) - Extended depth
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Initial Camera Position
    // Z = 20 allows us to see the Torus (at 0,0,0) comfortably
    camera.position.z = 20;

    // --- Interaction (Subtle Parallax) ---
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', handleMouseMove);

    // --- Animation Loop ---
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the tunnel slightly for dynamic feel
      torus.rotation.z -= 0.002;
      torus2.rotation.z += 0.001;
      
      // Mouse Parallax (only rotates the group slightly, doesn't move camera position)
      mainGroup.rotation.x = THREE.MathUtils.lerp(mainGroup.rotation.x, mouseY * 0.1, 0.05);
      mainGroup.rotation.y = THREE.MathUtils.lerp(mainGroup.rotation.y, mouseX * 0.1, 0.05);

      renderer.render(scene, camera);
    };
    animate();

    // --- SCROLL LOGIC: THE FLY THROUGH ---
    // We bind the 3D Camera Z-Position to the HTML scroll
    
    // Total scroll distance (must match the height in App.tsx)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body", // We trigger based on the whole page scroll
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // Quick response
      }
    });

    // 1. FLY THROUGH PHASE - EXTENDED
    // Move camera from Z=20 (start) to Z=-250 (deep past everything)
    // This allows for many more sections to "fly by"
    tl.to(camera.position, {
        z: -250,
        ease: "none",
        duration: 10 // Relative duration unit
    }, 0);

    // 2. OBJECT ENVELOPING (Hero Moment)
    // As we get closer (scroll progress), scale the Torus up so it feels like it surrounds us
    // before we pass through it.
    tl.to(torus.scale, { x: 4, y: 4, z: 4, duration: 0.5, ease: "power1.in" }, 0);
    tl.to(torus.material, { opacity: 0, duration: 0.2 }, 0.4); // Fade out quickly
    
    tl.to(torus2.scale, { x: 3, y: 3, z: 3, duration: 0.5 }, 0);
    tl.to(torus2.material, { opacity: 0, duration: 0.2 }, 0.45);

    // 3. WARP SPEED
    // Stretch particles as we move
    tl.to(particlesMesh.scale, { z: 2, duration: 10 }, 0);


    // --- Cleanup ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      torusGeo.dispose();
      torusGeo2.dispose();
      particlesGeometry.dispose();
      material.dispose();
      material2.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default ThreeHero;