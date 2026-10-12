import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreatGlobe3D({ className = "w-full h-80", activeIncidents = [] }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 400;
    const height = currentMount.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Base Wireframe Globe
    const sphereGeo = new THREE.SphereGeometry(1.9, 28, 28);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // 2. Latitude / Longitude Accent Rings
    const equatorGeo = new THREE.TorusGeometry(1.92, 0.015, 16, 80);
    const equatorMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.7 });
    const equator = new THREE.Mesh(equatorGeo, equatorMat);
    equator.rotation.x = Math.PI / 2;
    globeGroup.add(equator);

    // 3. Threat Beacon Nodes (Real-world incident epicenters)
    const incidentCoords = [
      { lat: 28.6139, lon: 77.2090, label: 'New Delhi - UPI Reverse Charge Hub', level: 'crit' },
      { lat: 19.0760, lon: 72.8777, label: 'Mumbai - Bank Phishing Gateway', level: 'high' },
      { lat: 37.7749, lon: -122.4194, label: 'San Francisco - Cloud OAuth Harvester', level: 'med' },
      { lat: 51.5074, lon: -0.1278, label: 'London - Parcel Smishing Campaign', level: 'high' },
      { lat: 1.3521, lon: 103.8198, label: 'Singapore - Digital Arrest Extortion', level: 'crit' },
      { lat: 55.7558, lon: 37.6173, label: 'Moscow - Bulletproof Host Cluster', level: 'crit' },
      { lat: 14.5995, lon: 120.9842, label: 'Manila - Cold-Call Callcenter Series', level: 'high' },
    ];

    const beaconGroup = new THREE.Group();
    globeGroup.add(beaconGroup);

    incidentCoords.forEach((coord) => {
      const phi = (90 - coord.lat) * (Math.PI / 180);
      const theta = (coord.lon + 180) * (Math.PI / 180);

      const r = 1.92;
      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);

      const dotColor = coord.level === 'crit' ? 0xef4444 : coord.level === 'high' ? 0xf97316 : 0x3b82f6;

      // Small glowing sphere on coordinate
      const dotGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const dotMat = new THREE.MeshBasicMaterial({ color: dotColor });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, y, z);
      beaconGroup.add(dot);

      // Radar pulse ring on coordinate
      const ringGeo = new THREE.RingGeometry(0.08, 0.12, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: dotColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(x * 1.01, y * 1.01, z * 1.01);
      ring.lookAt(0, 0, 0);
      beaconGroup.add(ring);
    });

    // Arc connecting vectors between coordinates (Attack trajectories)
    const curvePoints = [];
    curvePoints.push(new THREE.Vector3(0.8, 1.4, 1.0));
    curvePoints.push(new THREE.Vector3(0.0, 2.2, 0.8));
    curvePoints.push(new THREE.Vector3(-1.2, 1.2, 0.9));
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const tubeGeo = new THREE.TubeGeometry(curve, 30, 0.015, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.7 });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    globeGroup.add(tube);

    // Mouse drag interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.008;
      globeGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isDragging) {
        globeGroup.rotation.y += delta * 0.2;
        globeGroup.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

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
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute top-2 left-3 text-[10px] font-mono text-cyan-400 uppercase tracking-wider bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/20">
        3D Global Threat Radar • Drag to Rotate
      </div>
    </div>
  );
}
