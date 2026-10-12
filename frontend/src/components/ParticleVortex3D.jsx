import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * ParticleVortex3D
 * Generative 3D Hourglass / Hyperbolic Gravitational Vortex Particle Field
 * Matches visual reference: pure black, fine silver/white curves, flowing particle streamlines,
 * narrow waist behind hero headline, expansive lower spiral wave disk.
 */
export default function ParticleVortex3D() {
  const containerRef = useRef(null);
  const [hasWebGL] = useState(() => {
    try {
      const testCanvas = document.createElement('canvas');
      return !!(testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !hasWebGL) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.045);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 0.85, 7.6);
    camera.lookAt(0, -0.1, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // ==========================================
    // 1. STREAMLINE CURVES (Hyperboloid Wireframe)
    // ==========================================
    const numCurves = 170;
    const pointsPerCurve = 70;
    const linePositions = [];
    const lineColors = [];

    // Mathematical profile of the hourglass
    // t ranges from +1.0 (top outer funnel) down to -1.0 (bottom expansive wave disk)
    // The waist forms a sleek, narrow vertical corridor between t = -0.25 and t = +0.2
    function getVortexPoint(t, baseAngle, timeOffset = 0, dispersion = 0) {
      let r, y, angle;

      if (t > 0.15) {
        // Upper funnel: sweeps upward and outward to top corners
        const s = (t - 0.15) / 0.85; // 0 to 1
        y = 0.35 + s * 4.2;
        r = 1.05 + 5.2 * Math.pow(s, 1.45) + dispersion * 0.15;
        angle = baseAngle + 2.2 * s + timeOffset * 0.25;
      } else if (t < -0.35) {
        // Lower disc: expands outward horizontally below the hero copy and buttons
        const s = (-t - 0.35) / 0.65; // 0 to 1
        y = -1.35 - 0.25 * Math.pow(s, 0.6) - 1.15 * Math.pow(s, 1.6);
        r = 1.1 + 8.6 * Math.pow(s, 0.86) + dispersion * 0.2;
        // Subtle wave perturbation in the disk
        y += 0.07 * Math.sin(baseAngle * 4.0 + s * 6.0);
        angle = baseAngle - 3.4 * s - timeOffset * 0.2;
      } else {
        // Narrow waist corridor: centered right behind headline and actions
        // Smoothly spans y between -1.35 and +0.35 while keeping radius minimal and clean
        const norm = (t - (-0.35)) / (0.15 - (-0.35)); // 0 to 1
        y = -1.35 + norm * 1.7;
        const centerOffset = Math.abs(norm - 0.5) * 2; // 0 at center, 1 at edges
        r = 0.95 + 0.16 * Math.pow(centerOffset, 2) + dispersion * 0.08;
        angle = baseAngle + (norm - 0.5) * 0.8 + timeOffset * 0.15;
      }

      const x = r * Math.cos(angle);
      const z = r * Math.sin(angle);
      return { x, y, z, r, yVal: y };
    }

    // Build static curve tracks for line segments
    for (let c = 0; c < numCurves; c++) {
      const baseAngle = (c / numCurves) * Math.PI * 2;
      for (let p = 0; p < pointsPerCurve - 1; p++) {
        const t1 = 1.0 - (p / (pointsPerCurve - 1)) * 2.0;
        const t2 = 1.0 - ((p + 1) / (pointsPerCurve - 1)) * 2.0;

        const pt1 = getVortexPoint(t1, baseAngle, 0, 0);
        const pt2 = getVortexPoint(t2, baseAngle, 0, 0);

        linePositions.push(pt1.x, pt1.y, pt1.z);
        linePositions.push(pt2.x, pt2.y, pt2.z);

        // Alpha / brightness: brightest near the neck and inner disc, fading softly at outer edges
        const lum1 = Math.max(0.04, 0.38 - Math.abs(t1) * 0.26);
        const lum2 = Math.max(0.04, 0.38 - Math.abs(t2) * 0.26);

        lineColors.push(lum1, lum1, lum1);
        lineColors.push(lum2, lum2, lum2);
      }
    }

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    rootGroup.add(linesMesh);

    // ==========================================
    // 2. FLOWING LUMINOUS PARTICLES (Custom Points)
    // ==========================================
    const particleCount = 22000;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleAttributes = new Float32Array(particleCount * 4); // [tProgress, baseAngle, speed, dispersion]
    const particleColors = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const tProgress = Math.random(); // 0 to 1
      const baseAngle = Math.random() * Math.PI * 2;
      const speed = 0.08 + Math.random() * 0.16;
      const dispersion = (Math.random() - 0.5) * 1.5;

      particleAttributes[i * 4 + 0] = tProgress;
      particleAttributes[i * 4 + 1] = baseAngle;
      particleAttributes[i * 4 + 2] = speed;
      particleAttributes[i * 4 + 3] = dispersion;

      // Color: pure white to subtle silver luminescence
      const b = 0.55 + Math.random() * 0.45;
      particleColors[i * 3 + 0] = b;
      particleColors[i * 3 + 1] = b;
      particleColors[i * 3 + 2] = b;

      // Size: fine points
      particleSizes[i] = 0.8 + Math.random() * 1.8;
    }

    // Circular particle texture generator
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.85)');
      gradient.addColorStop(0.5, 'rgba(230, 240, 255, 0.25)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const particleTexture = createParticleTexture();

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.045,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    rootGroup.add(particlesMesh);

    // ==========================================
    // 3. AMBIENT DRIFT PARTICLES (Cosmic Dust)
    // ==========================================
    const ambientCount = 3500;
    const ambientPos = new Float32Array(ambientCount * 3);
    const ambientCol = new Float32Array(ambientCount * 3);

    for (let i = 0; i < ambientCount; i++) {
      const rad = 2.0 + Math.random() * 7.5;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 8.0;

      ambientPos[i * 3 + 0] = rad * Math.cos(theta);
      ambientPos[i * 3 + 1] = y;
      ambientPos[i * 3 + 2] = rad * Math.sin(theta);

      const br = 0.25 + Math.random() * 0.45;
      ambientCol[i * 3 + 0] = br;
      ambientCol[i * 3 + 1] = br;
      ambientCol[i * 3 + 2] = br;
    }

    const ambientGeo = new THREE.BufferGeometry();
    ambientGeo.setAttribute('position', new THREE.BufferAttribute(ambientPos, 3));
    ambientGeo.setAttribute('color', new THREE.BufferAttribute(ambientCol, 3));

    const ambientMat = new THREE.PointsMaterial({
      size: 0.032,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const ambientMesh = new THREE.Points(ambientGeo, ambientMat);
    rootGroup.add(ambientMesh);

    // ==========================================
    // 4. INTERACTION & ANIMATION STATE
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let scrollOffset = 0;
    let isVisible = true;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = mouseX * 0.28;
      targetRotX = mouseY * 0.16;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      scrollOffset = Math.min(1.0, scrollY / (window.innerHeight || 800));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // IntersectionObserver to pause rendering when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // ==========================================
    // 5. ANIMATION LOOP
    // ==========================================
    let animationFrameId;
    let lastTime = performance.now();
    let elapsedTime = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const now = performance.now();
      const delta = prefersReducedMotion ? 0 : Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!prefersReducedMotion) elapsedTime += delta;

      // Smooth inertia rotation with mouse parallax
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.04;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.04;

      // Base slow rotational drift
      rootGroup.rotation.y += delta * 0.08;

      // Lines subtle twist rotation
      linesMesh.rotation.y = elapsedTime * 0.045;

      // Dynamic scroll compression and camera parallax
      camera.position.y = 0.35 + scrollOffset * 1.2;
      camera.position.z = 7.6 + scrollOffset * 2.0;

      // Update flowing particles
      const posArray = particlesGeo.attributes.position.array;
      const timeSec = elapsedTime * 0.35;

      for (let i = 0; i < particleCount; i++) {
        const idx4 = i * 4;
        let progress = particleAttributes[idx4 + 0];
        const baseAngle = particleAttributes[idx4 + 1];
        const speed = particleAttributes[idx4 + 2];
        const dispersion = particleAttributes[idx4 + 3];

        if (!prefersReducedMotion) {
          progress = (progress + speed * delta * 0.4) % 1.0;
          particleAttributes[idx4 + 0] = progress;
        }

        // Map progress [0, 1] to parameter t [-1.0, 1.0]
        // 0.0 = top outer funnel, 0.5 = waist, 1.0 = bottom outer wave disk
        const t = 1.0 - progress * 2.0;
        const pt = getVortexPoint(t, baseAngle, timeSec, dispersion);

        const idx3 = i * 3;
        posArray[idx3 + 0] = pt.x;
        posArray[idx3 + 1] = pt.y;
        posArray[idx3 + 2] = pt.z;
      }
      particlesGeo.attributes.position.needsUpdate = true;

      // Ambient dust rotation
      ambientMesh.rotation.y = -elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // ==========================================
    // 6. RESIZE HANDLER
    // ==========================================
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      ambientGeo.dispose();
      ambientMat.dispose();
      particleTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-black"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {!hasWebGL && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(0,0,0,1)_70%)]" />
      )}
    </div>
  );
}
