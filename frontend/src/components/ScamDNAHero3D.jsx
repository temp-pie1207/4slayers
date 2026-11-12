import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ScamDNAHero3D({ className = "w-full h-[420px] sm:h-[480px] lg:h-[540px]" }) {
  const mountRef = useRef(null);
  const [activeSignal, setActiveSignal] = useState(null);
  const [webGLFailed, setWebGLFailed] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer, scene, camera, animationFrameId;
    let mainGroup, coreMesh, innerCoreMesh, ring1, ring2, ring3, arcMesh, nodesGroup, linksGroup, streamParticles;

    try {
      const width = container.clientWidth || 400;
      const height = container.clientHeight || 450;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
      camera.position.set(0, 0, 7.2);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Lighting: Warm golden intelligence spectrum
      const ambientLight = new THREE.AmbientLight(0xFFF6E5, 0.9);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0xC69A42, 2.2);
      dirLight1.position.set(5, 8, 6);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0x4A151A, 1.2);
      dirLight2.position.set(-6, -4, -4);
      scene.add(dirLight2);

      const pointLight = new THREE.PointLight(0xEAD6A0, 1.8, 20);
      pointLight.position.set(0, 0, 0);
      scene.add(pointLight);

      mainGroup = new THREE.Group();
      scene.add(mainGroup);

      // 1. Central Golden Core (Octahedron / Diamond facet)
      const coreGeo = new THREE.OctahedronGeometry(1.05, 0);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xC69A42,
        roughness: 0.25,
        metalness: 0.85,
        emissive: 0x906727,
        emissiveIntensity: 0.35,
        wireframe: false,
      });
      coreMesh = new THREE.Mesh(coreGeo, coreMat);
      mainGroup.add(coreMesh);

      // Core Wireframe Cage
      const coreWireGeo = new THREE.OctahedronGeometry(1.15, 1);
      const coreWireMat = new THREE.MeshBasicMaterial({
        color: 0xEAD6A0,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      innerCoreMesh = new THREE.Mesh(coreWireGeo, coreWireMat);
      mainGroup.add(innerCoreMesh);

      // 2. Geometric Connected White & Gold Rings
      // Ring 1: Primary Gold Torus
      const ringGeo1 = new THREE.TorusGeometry(2.35, 0.022, 16, 120);
      const ringMat1 = new THREE.MeshStandardMaterial({
        color: 0xC69A42,
        roughness: 0.2,
        metalness: 0.9,
      });
      ring1 = new THREE.Mesh(ringGeo1, ringMat1);
      ring1.rotation.x = Math.PI / 3.2;
      mainGroup.add(ring1);

      // Ring 2: Polished Ivory/White Secondary Ring
      const ringGeo2 = new THREE.TorusGeometry(2.15, 0.016, 16, 120);
      const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0xF2EADB,
        transparent: true,
        opacity: 0.75,
      });
      ring2 = new THREE.Mesh(ringGeo2, ringMat2);
      ring2.rotation.y = Math.PI / 2.6;
      ring2.rotation.x = -Math.PI / 5;
      mainGroup.add(ring2);

      // Ring 3: Delicate outer equator ring
      const ringGeo3 = new THREE.TorusGeometry(2.7, 0.012, 16, 140);
      const ringMat3 = new THREE.MeshBasicMaterial({
        color: 0xEAD6A0,
        transparent: true,
        opacity: 0.45,
      });
      ring3 = new THREE.Mesh(ringGeo3, ringMat3);
      ring3.rotation.z = Math.PI / 4;
      mainGroup.add(ring3);

      // 3. Scanning Arc (Pulsing radar/sensor arc)
      const arcGeo = new THREE.RingGeometry(2.28, 2.42, 64, 1, 0, Math.PI / 2.2);
      const arcMat = new THREE.MeshBasicMaterial({
        color: 0xEAD6A0,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      arcMesh = new THREE.Mesh(arcGeo, arcMat);
      arcMesh.rotation.x = Math.PI / 3.2;
      mainGroup.add(arcMesh);

      // 4. Five Floating Signal Nodes representing Multimodal Fraud Signals
      const nodeSignals = [
        { label: "SMS Vector", type: "message", pos: [2.1, 0.8, 0.5], color: 0xC69A42, desc: "Manipulative urgency text" },
        { label: "Typosquat Domain", type: "url", pos: [-1.8, 1.4, -0.6], color: 0xB42332, desc: "Phishing endpoint: hdfc-verify-kyc.xyz" },
        { label: "VoIP CLI Caller", type: "phone", pos: [1.2, -1.9, 0.9], color: 0xA86C13, desc: "Spoofed telecom CID gateway" },
        { label: "Quishing Code", type: "qr", pos: [-2.0, -1.1, 1.1], color: 0xEAD6A0, desc: "Embedded UPI debit URI payload" },
        { label: "Mule Account", type: "payment", pos: [0.2, 2.3, -1.0], color: 0x906727, desc: "Layer-1 cash siphoning destination" },
      ];

      nodesGroup = new THREE.Group();
      linksGroup = new THREE.Group();
      mainGroup.add(nodesGroup);
      mainGroup.add(linksGroup);

      const nodeMeshes = [];
      nodeSignals.forEach((sig) => {
        // Node bead
        const nodeGeo = new THREE.SphereGeometry(0.16, 24, 24);
        const nodeMat = new THREE.MeshStandardMaterial({
          color: sig.color,
          roughness: 0.2,
          metalness: 0.8,
          emissive: sig.color,
          emissiveIntensity: 0.4,
        });
        const nMesh = new THREE.Mesh(nodeGeo, nodeMat);
        nMesh.position.set(sig.pos[0], sig.pos[1], sig.pos[2]);
        nMesh.userData = sig;
        nodesGroup.add(nMesh);
        nodeMeshes.push(nMesh);

        // Thin connecting line to center core
        const lineMat = new THREE.LineBasicMaterial({
          color: 0xC69A42,
          transparent: true,
          opacity: 0.35,
        });
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(sig.pos[0], sig.pos[1], sig.pos[2]),
        ]);
        const line = new THREE.Line(lineGeo, lineMat);
        linksGroup.add(line);
      });

      // Connect nodes to each other to demonstrate "scam DNA connection"
      for (let i = 0; i < nodeSignals.length; i++) {
        const nextIdx = (i + 1) % nodeSignals.length;
        const crossLineMat = new THREE.LineBasicMaterial({
          color: 0xEAD6A0,
          transparent: true,
          opacity: 0.25,
        });
        const crossGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...nodeSignals[i].pos),
          new THREE.Vector3(...nodeSignals[nextIdx].pos),
        ]);
        const crossLine = new THREE.Line(crossGeo, crossLineMat);
        linksGroup.add(crossLine);
      }

      // 5. Flowing Particle Streams between nodes
      const streamCount = 45;
      const streamGeo = new THREE.BufferGeometry();
      const streamPos = new Float32Array(streamCount * 3);
      for (let i = 0; i < streamCount; i++) {
        const r = 2.0 + Math.random() * 0.8;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.7;
        streamPos[i * 3] = r * Math.cos(theta) * Math.cos(phi);
        streamPos[i * 3 + 1] = r * Math.sin(phi);
        streamPos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);
      }
      streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPos, 3));
      const streamMat = new THREE.PointsMaterial({
        color: 0xEAD6A0,
        size: 0.05,
        transparent: true,
        opacity: 0.7,
      });
      streamParticles = new THREE.Points(streamGeo, streamMat);
      mainGroup.add(streamParticles);

      // Mouse & touch interaction handling
      let targetRotX = 0;
      let targetRotY = 0;
      let isDragging = false;
      let prevMouseX = 0;
      let prevMouseY = 0;

      const onPointerDown = (e) => {
        isDragging = true;
        prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      };

      const onPointerMove = (e) => {
        const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

        if (isDragging) {
          const deltaX = clientX - prevMouseX;
          const deltaY = clientY - prevMouseY;
          targetRotY += deltaX * 0.008;
          targetRotX += deltaY * 0.008;
          prevMouseX = clientX;
          prevMouseY = clientY;
        } else {
          // Subtle mouse parallax
          const rect = container.getBoundingClientRect();
          const normX = ((clientX - rect.left) / width - 0.5) * 2;
          const normY = ((clientY - rect.top) / height - 0.5) * 2;
          targetRotY = normX * 0.45;
          targetRotX = normY * 0.35;
        }
      };

      const onPointerUp = () => {
        isDragging = false;
      };

      container.addEventListener('mousedown', onPointerDown);
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);
      container.addEventListener('touchstart', onPointerDown, { passive: true });
      window.addEventListener('touchmove', onPointerMove, { passive: true });
      window.addEventListener('touchend', onPointerUp);

      // Resize handler
      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const w = container.clientWidth || 400;
        const h = container.clientHeight || 450;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      // Render loop
      let clock = new THREE.Clock();

      const animate = () => {
        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();

        // Smooth damping for interactive rotation
        mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.06;
        mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.06;

        // Continuous delicate spin
        coreMesh.rotation.y += 0.8 * delta;
        coreMesh.rotation.x += 0.4 * delta;
        innerCoreMesh.rotation.y -= 0.5 * delta;
        innerCoreMesh.rotation.z += 0.3 * delta;

        ring1.rotation.z += 0.35 * delta;
        ring2.rotation.z -= 0.45 * delta;
        ring3.rotation.y += 0.25 * delta;

        // Sweeping radar arc
        arcMesh.rotation.z += 1.4 * delta;

        // Breathing pulse for signal nodes
        const pulseScale = 1.0 + Math.sin(elapsed * 2.5) * 0.08;
        nodesGroup.scale.set(pulseScale, pulseScale, pulseScale);

        // Stream particle flow
        if (streamParticles) {
          streamParticles.rotation.y += 0.3 * delta;
          streamParticles.rotation.x += 0.15 * delta;
        }

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', handleResize);
        container.removeEventListener('mousedown', onPointerDown);
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('mouseup', onPointerUp);
        container.removeEventListener('touchstart', onPointerDown);
        window.removeEventListener('touchmove', onPointerMove);
        window.removeEventListener('touchend', onPointerUp);
        cancelAnimationFrame(animationFrameId);

        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    } catch (e) {
      console.warn("WebGL initialization failed, falling back to SVG Scam DNA visual:", e);
      setWebGLFailed(true);
    }
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 3D Canvas Mount */}
      {!webGLFailed ? (
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      ) : (
        /* Performant SVG/CSS Fallback */
        <div className="relative w-72 h-72 sm:w-84 sm:h-84 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#C69A42]/30 animate-spin [animation-duration:18s]" />
          <div className="absolute inset-6 rounded-full border border-dashed border-[#EAD6A0]/40 animate-spin [animation-duration:12s] [animation-direction:reverse]" />
          <div className="absolute inset-16 rounded-full border border-[#C69A42]/50 animate-pulse" />
          <div className="w-16 h-16 bg-gradient-to-tr from-[#906727] via-[#C69A42] to-[#EAD6A0] rotate-45 shadow-lg shadow-[#C69A42]/30 animate-pulse" />
        </div>
      )}

      {/* Technical HUD Floating Labels */}
      <div className="absolute top-4 right-4 pointer-events-none hidden sm:flex flex-col items-end gap-1 font-mono text-[10px] text-[#777064] dark:text-[#A8A095]">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#E5DCCB] dark:border-[#3D3528] bg-white/70 dark:bg-[#1C1813]/70 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#277653] animate-ping" />
          <span className="text-[#242019] dark:text-[#FBF8F0] font-semibold">SYNAPSE // ACTIVE</span>
        </div>
        <span>TOPOLOGY: MULTIMODAL CONVERGENCE</span>
        <span>SIGNALS CORRELATED: 5 ACTIVE NODES</span>
      </div>

      <div className="absolute bottom-4 left-4 pointer-events-none hidden sm:flex flex-col gap-1 font-mono text-[10px] text-[#777064] dark:text-[#A8A095]">
        <div className="px-2 py-0.5 rounded border border-[#E5DCCB] dark:border-[#3D3528] bg-white/70 dark:bg-[#1C1813]/70 backdrop-blur-sm">
          <span className="text-[#906727] dark:text-[#EAD6A0]">ORBIT: ROTATION DRIVEN BY RISK SCORE</span>
        </div>
        <span>INTERACTION: DRAG TO INSPECT SCAM DNA</span>
      </div>
    </div>
  );
}
