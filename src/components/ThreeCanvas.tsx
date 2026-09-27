import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ambient and directional lighting for paper-like matte finish
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(10, 15, 12);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0xb4d4b8, 0.8);
    backLight.position.set(-10, -10, -5);
    scene.add(backLight);

    // Paper Plane / Origami Geometry
    const paperPlaneGroup = new THREE.Group();

    // Create realistic paper plane geometry
    const planeGeo = new THREE.BufferGeometry();
    // Vertices for origami paper plane: nose, left wingtip, right wingtip, center fold bottom, center top
    const vertices = new Float32Array([
      // Left Wing top
      0, 0, 4.0,   // Nose (0)
      -3.2, 0.6, -2.5, // Left wing tip (1)
      0, 0.3, -2.0, // Center ridge (2)

      // Right Wing top
      0, 0, 4.0,   // Nose (0)
      0, 0.3, -2.0, // Center ridge (2)
      3.2, 0.6, -2.5,  // Right wing tip (3)

      // Left Bottom Fold
      0, 0, 4.0,   // Nose
      0, -1.2, -1.8, // Keel bottom
      -3.2, 0.6, -2.5, // Left wing tip

      // Right Bottom Fold
      0, 0, 4.0,   // Nose
      3.2, 0.6, -2.5,  // Right wing tip
      0, -1.2, -1.8, // Keel bottom

      // Keel fin
      0, 0, 4.0,
      0, 0.3, -2.0,
      0, -1.2, -1.8,
    ]);

    planeGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    planeGeo.computeVertexNormals();

    const paperMaterial = new THREE.MeshStandardMaterial({
      color: 0xfbf9f1,
      roughness: 0.65,
      metalness: 0.05,
      side: THREE.DoubleSide,
      flatShading: true,
    });

    const paperPlane = new THREE.Mesh(planeGeo, paperMaterial);
    paperPlaneGroup.add(paperPlane);

    // Accent folded strip (representing green cutting ruler tape)
    const tapeGeo = new THREE.BoxGeometry(0.8, 0.04, 2.2);
    const tapeMat = new THREE.MeshStandardMaterial({
      color: 0x133827,
      roughness: 0.8,
      metalness: 0.1,
    });
    const tapeMesh = new THREE.Mesh(tapeGeo, tapeMat);
    tapeMesh.position.set(-0.8, 0.4, -0.5);
    tapeMesh.rotation.y = 0.2;
    paperPlaneGroup.add(tapeMesh);

    // Additional floating paper origami cubes / shards in background
    const shards: THREE.Mesh[] = [];
    const shardColors = [0xe2d9c2, 0x133827, 0xb43b22, 0xf6f5ee, 0xd4a373];

    for (let i = 0; i < 7; i++) {
      const size = 0.4 + Math.random() * 0.7;
      const geo = Math.random() > 0.5 
        ? new THREE.TetrahedronGeometry(size) 
        : new THREE.BoxGeometry(size, size * 0.2, size * 1.5);
      
      const mat = new THREE.MeshStandardMaterial({
        color: shardColors[i % shardColors.length],
        roughness: 0.7,
        flatShading: true,
      });
      const shard = new THREE.Mesh(geo, mat);
      shard.position.set(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8 - 2
      );
      shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(shard);
      shards.push(shard);
    }

    paperPlaneGroup.position.set(4.5, 0.5, 2);
    paperPlaneGroup.rotation.set(0.3, -0.6, 0.15);
    scene.add(paperPlaneGroup);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x;
      targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Gentle floating hover motion for paper plane
      paperPlaneGroup.position.y = 0.5 + Math.sin(elapsedTime * 1.2) * 0.4 + mouseY * 1.2;
      paperPlaneGroup.position.x = 4.5 + Math.cos(elapsedTime * 0.9) * 0.3 + mouseX * 1.5;
      paperPlaneGroup.rotation.z = 0.15 + Math.sin(elapsedTime * 1.0) * 0.08 - mouseX * 0.4;
      paperPlaneGroup.rotation.x = 0.3 + Math.cos(elapsedTime * 1.1) * 0.06 - mouseY * 0.3;
      paperPlaneGroup.rotation.y = -0.6 + Math.sin(elapsedTime * 0.7) * 0.1 + mouseX * 0.5;

      // Animate background shards
      shards.forEach((shard, idx) => {
        shard.rotation.x += 0.004 * (idx % 2 === 0 ? 1 : -1);
        shard.rotation.y += 0.006 * (idx % 3 === 0 ? 1 : -1);
        shard.position.y += Math.sin(elapsedTime * 0.8 + idx) * 0.005;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90"
      aria-hidden="true"
    />
  );
};
