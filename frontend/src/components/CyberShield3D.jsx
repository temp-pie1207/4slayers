import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CyberShield3D({ riskScore = 85, isInteractive = true, className = "w-full h-64" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 320;
    const height = currentMount.clientHeight || 260;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Determine color based on risk score
    let mainColor = 0x3b82f6; // blue
    let glowColor = 0x06b6d4; // cyan
    if (riskScore >= 80) {
      mainColor = 0xef4444; // rose red
      glowColor = 0xf97316; // orange
    } else if (riskScore >= 60) {
      mainColor = 0xf97316; // orange
      glowColor = 0xfbbf24; // amber
    } else if (riskScore >= 30) {
      mainColor = 0xf59e0b; // amber
      glowColor = 0x3b82f6;
    } else {
      mainColor = 0x10b981; // emerald
      glowColor = 0x06b6d4;
    }

    const group = new THREE.Group();
    scene.add(group);

    // 1. Outer Wireframe Shield / Icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: mainColor,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // 2. Inner Defense Core (Solid faceted core with subtle glow)
    const innerGeo = new THREE.OctahedronGeometry(1.1, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: glowColor,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
      emissive: mainColor,
      emissiveIntensity: 0.4,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // 3. Orbital Defense Rings
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    group.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(2.1, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: mainColor,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    group.add(ringMesh2);

    // 4. Floating Telemetry Particles (Data Nodes)
    const particlesCount = 90;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 2.6 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.06,
      color: glowColor,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(glowColor, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Mouse interactivity
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      if (!isInteractive) return;
      const rect = currentMount.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / width) * 2 - 1;
      mouseY = -(y / height) * 2 + 1;
    };

    if (isInteractive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX * 0.8 - targetX) * 0.05;
      targetY += (mouseY * 0.8 - targetY) * 0.05;

      group.rotation.y = time * 0.35 + targetX;
      group.rotation.x = Math.sin(time * 0.25) * 0.15 + targetY;

      // Pulse inner core
      const pulse = 1 + Math.sin(time * 3) * 0.05;
      innerMesh.scale.set(pulse, pulse, pulse);

      // Rotate orbital rings
      ringMesh1.rotation.z += delta * 0.5;
      ringMesh2.rotation.x -= delta * 0.4;
      particles.rotation.y -= delta * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (isInteractive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [riskScore, isInteractive]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-500 uppercase tracking-wider pointer-events-none bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800/80">
        3D Holographic Core • WebGL Active
      </div>
    </div>
  );
}
