"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface SelectedWork {
  title: string;
  problem: string;
  role: string;
  approach: string;
  outcome: string;
  tags: string[];
  videoSrc?: string;
}

const selectedWorks: SelectedWork[] = [
  {
    title: 'SPACES — Dorm Discovery & Management',
    problem:
      'Finding and managing dorm accommodations around campus is often fragmented and stressful. Students jump between Facebook groups, outdated listings, spreadsheets, and word-of-mouth just to find reliable options, while dorm managers and housing administrators lack a centralized system to handle inquiries, applications, occupancy, and billing efficiently.',
    role:
      'As part of the backend team, I owned the definition of API endpoints and coordinated their implementation within our subteam. I translated system requirements into SSR-ready endpoints for paginated dorm listings and other core features, enabling consistent server-side data rendering. I identified and resolved UI–database inconsistencies to ensure data integrity across the stack. When necessary, I supported frontend development for occupancy management pages to help unblock delivery. I also contributed to early UI/UX works for faster development.',
    approach:
      'I helped design and build SPACES as a centralized, role-based platform supporting distinct workflows for students, guests, dorm managers, and administrators. We prioritized clarity over feature bloat—implementing SSR-powered listings, real-time availability, and structured flows for applications, occupancy, and billing. This allowed us to unify complex housing processes into a consistent system while keeping each interface intuitive for its respective user type.',
    outcome:
      'SPACES consolidates the end-to-end dormitory workflow into a unified, role-based platform supporting students, guests, dorm managers, and housing administrators. Users can browse accommodations, manage applications, handle occupancy, and track billing within a single system. By centralizing previously fragmented processes, the platform reduces operational overhead and improves visibility across the entire accommodation lifecycle.',
    tags: ['Full-stack', 'UX', 'Platform'],
    videoSrc: '/spaces.mp4',
  },
];

const SECTIONS = ['problem', 'role', 'approach', 'outcome'] as const;
type Section = (typeof SECTIONS)[number];

const SECTION_LABELS: Record<Section, string> = {
  problem: 'Problem',
  role: 'Role',
  approach: 'Approach',
  outcome: 'Outcome',
};

// ─── BBC Micro-style retro computer: separate CRT monitor + flat keyboard base ───
function RetroComputerModel() {
  // ── Screen texture ─────────────────────────────────────────────────────────
  const makeScreenTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Deep dark background
    ctx.fillStyle = '#060a06';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Scanline overlay
    for (let y = 0; y < canvas.height; y += 4) {
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.fillRect(0, y, canvas.width, 2);
    }

    // Subtle green phosphor glow gradient
    const grad = ctx.createRadialGradient(512, 400, 60, 512, 400, 520);
    grad.addColorStop(0, 'rgba(80,200,100,0.08)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ── SELECTED WORKS — centred, large, phosphor green ──
    ctx.fillStyle = '#b8ffbe';
    ctx.font = 'bold 72px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SELECTED', canvas.width / 2, 340);
    ctx.fillText('WORKS', canvas.width / 2, 440);

    // Blinking cursor block below
    ctx.fillStyle = '#68ff80';
    ctx.fillRect(canvas.width / 2 - 14, 462, 28, 10);

    // Subtle underline
    ctx.strokeStyle = 'rgba(150, 230, 160, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 220, 480);
    ctx.lineTo(canvas.width / 2 + 220, 480);
    ctx.stroke();



    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  };

  const group = new THREE.Group();

  // ── Materials ─────────────────────────────────────────────────────────────
  const creamMat = new THREE.MeshStandardMaterial({ color: '#c8c0a4', roughness: 0.88, metalness: 0.04 });
  const darkBezelMat = new THREE.MeshStandardMaterial({ color: '#111318', roughness: 0.55, metalness: 0.22 });
  const monitorBodyMat = new THREE.MeshStandardMaterial({ color: '#9a9480', roughness: 0.78, metalness: 0.06 });
  const blackKeyMat = new THREE.MeshStandardMaterial({ color: '#1a1c20', roughness: 0.65, metalness: 0.18 });
  const orangeKeyMat = new THREE.MeshStandardMaterial({ color: '#c85a18', roughness: 0.55, metalness: 0.12 });
  const screenTexture = makeScreenTexture();
  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTexture ?? undefined,
    color: screenTexture ? '#ffffff' : '#0a140a',
    emissive: new THREE.Color('#40ff60'),
    emissiveIntensity: 0.18,
    roughness: 0.28,
    metalness: 0.01,
  });

  // ══════════════════════════════════════════════════════════════════
  // KEYBOARD BASE (flat, cream, like BBC Micro base unit)
  // ══════════════════════════════════════════════════════════════════
  const base = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.38, 3.8), creamMat);
  base.castShadow = true;
  base.receiveShadow = true;
  base.position.set(0, 0, 0);
  group.add(base);

  // Dark keyboard deck — sunk INTO base so no face is coplanar with base top (y=0.19)
  // height=0.42 at y=0.10 → bottom=−0.11 (inside base), top=0.31 (above base) ✓
  const deckInset = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.42, 2.8), darkBezelMat);
  deckInset.position.set(0.1, 0.10, -0.1);
  group.add(deckInset);

  // deckInset top surface is at y = 0.10 + 0.21 = 0.31 — keys sit above this

  // ── Keys ──────────────────────────────────────────────────────────────────
  // Function/top-row keys (orange, wider)
  const fnKeys = 10;
  for (let i = 0; i < fnKeys; i++) {
    const key = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.10, 0.26), orangeKeyMat);
    key.castShadow = true;
    // deckInset top = 0.31; key half-height = 0.05 → centre at 0.36
    key.position.set(-2.16 + i * 0.44, 0.36, -0.96);
    group.add(key);
  }

  // QWERTY rows — 4 rows of black keys
  const rowLayout = [
    { count: 13, z: -0.58, offset: -2.58 },
    { count: 12, z: -0.24, offset: -2.38 },
    { count: 11, z: 0.11, offset: -2.18 },
    { count: 10, z: 0.46, offset: -1.98 },
  ];
  rowLayout.forEach(({ count, z, offset }) => {
    for (let i = 0; i < count; i++) {
      const key = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.09, 0.22), blackKeyMat);
      key.castShadow = true;
      // deckInset top = 0.31; key half-height = 0.045 → centre at 0.355
      key.position.set(offset + i * 0.4, 0.355, z);
      group.add(key);
    }
  });

  // Space bar
  const spaceBar = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.09, 0.22), blackKeyMat);
  spaceBar.position.set(-0.1, 0.355, 0.81);
  group.add(spaceBar);

  // Side accent strips — depth 3.6 (not 3.8) so ends don't align with base front/back at z=±1.9
  const leftStrip = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.28, 3.6), darkBezelMat);
  leftStrip.position.set(-2.9, 0.15, 0);
  group.add(leftStrip);

  const rightStrip = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.28, 3.6), darkBezelMat);
  rightStrip.position.set(2.9, 0.15, 0);
  group.add(rightStrip);

  // ── Small indicator lights ─────────────────────────────────────────────────
  const redLight = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.06, 0.14),
    new THREE.MeshStandardMaterial({ color: '#dd3311', emissive: new THREE.Color('#ff2200'), emissiveIntensity: 1.2, roughness: 0.3 })
  );
  redLight.position.set(-2.58, 0.22, 1.5);
  group.add(redLight);

  const greenLight = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.06, 0.14),
    new THREE.MeshStandardMaterial({ color: '#22aa44', emissive: new THREE.Color('#00ff66'), emissiveIntensity: 1.4, roughness: 0.3 })
  );
  greenLight.position.set(-2.3, 0.22, 1.5);
  group.add(greenLight);

  // ══════════════════════════════════════════════════════════════════
  // CRT MONITOR — sits behind/above the keyboard base
  // ══════════════════════════════════════════════════════════════════
  // Monitor outer body (olive/grey, boxy)
  const monBody = new THREE.Mesh(new THREE.BoxGeometry(4.8, 3.8, 0.9), monitorBodyMat);
  monBody.castShadow = true;
  monBody.receiveShadow = true;
  monBody.position.set(0, 2.55, -1.45);
  group.add(monBody);

  // Monitor bottom lip / stand connector
  const monBase = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.28, 0.42), monitorBodyMat);
  monBase.position.set(0, 0.65, -1.42);
  group.add(monBase);

  // Dark front bezel
  const bezel = new THREE.Mesh(new THREE.BoxGeometry(3.88, 3.12, 0.22), darkBezelMat);
  bezel.position.set(0, 2.58, -1.01);
  group.add(bezel);

  // Screen inset
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.44, 2.72), screenMat);
  screen.position.set(0, 2.58, -0.89);
  group.add(screen);

  // Glass reflection layer
  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(3.44, 2.72),
    new THREE.MeshPhysicalMaterial({
      color: '#88aacc',
      transparent: true,
      opacity: 0.06,
      roughness: 0.04,
      transmission: 0.18,
    })
  );
  glass.position.set(0, 2.58, -0.87);
  group.add(glass);

  // Screen glow (emissive plane slightly in front)
  const glowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 2.86),
    new THREE.MeshBasicMaterial({
      color: '#22ff44',
      transparent: true,
      opacity: 0.025,
    })
  );
  glowMesh.position.set(0, 2.58, -0.86);
  group.add(glowMesh);

  // ── Vent slots on top of monitor ──────────────────────────────────
  for (let i = 0; i < 5; i++) {
    const vent = new THREE.Mesh(
      new THREE.BoxGeometry(0.62, 0.06, 0.32),
      new THREE.MeshStandardMaterial({ color: '#080a0c', roughness: 0.9 })
    );
    vent.position.set(-1.2 + i * 0.62, 4.5, -1.45);
    group.add(vent);
  }

  // ── Vent slots on back/side ────────────────────────────────────────
  for (let i = 0; i < 3; i++) {
    const vent = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.07, 0.28),
      new THREE.MeshStandardMaterial({ color: '#080a0c', roughness: 0.9 })
    );
    vent.position.set(0, 3.2 + i * 0.36, -1.88);
    vent.rotation.x = 0.1;
    group.add(vent);
  }

  // ── Monitor knob / volume dial ─────────────────────────────────────
  const knob = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.14, 12),
    new THREE.MeshStandardMaterial({ color: '#080a0c', roughness: 0.6 })
  );
  knob.rotation.z = Math.PI / 2;
  knob.position.set(2.18, 1.52, -0.96);
  group.add(knob);

  // ── Legs / feet on base ────────────────────────────────────────────
  const footMat = new THREE.MeshStandardMaterial({ color: '#333', roughness: 0.9 });
  const footPositions = [
    { x: -2.5, z: 1.6 },
    { x: 2.5, z: 1.6 },
    { x: -2.5, z: -1.6 },
    { x: 2.5, z: -1.6 },
  ];
  footPositions.forEach(({ x, z }) => {
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.14, 8), footMat);
    foot.position.set(x, -0.25, z);
    group.add(foot);
  });

  // ── Point light for screen glow ────────────────────────────────────
  const screenGlow = new THREE.PointLight('#44ff66', 0.55, 5);
  screenGlow.position.set(0, 2.58, -0.4);
  group.add(screenGlow);

  // Slight tilt: lean the whole monitor group back a touch
  // Scale down so whole model fits in the viewport
  group.scale.setScalar(0.88);
  group.rotation.x = -0.04;
  group.position.set(0, -1.2, 0.6);

  return group;
}

function SectionHeader() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountEl = mountRef.current;
    if (!mountEl) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    // No fog — we want stars visible across the full scene
    scene.fog = new THREE.FogExp2('#000000', 0.012);

    const camera = new THREE.PerspectiveCamera(42, mountEl.clientWidth / mountEl.clientHeight, 0.1, 300);
    // Centred front-on view so the screen reads cleanly
    camera.position.set(0, 1.4, 10.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mountEl.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minAzimuthAngle = -1.0;
    controls.maxAzimuthAngle = 1.0;
    controls.minPolarAngle = Math.PI / 2.6;
    controls.maxPolarAngle = Math.PI / 1.75;
    controls.dampingFactor = 0.06;
    controls.enableDamping = true;
    controls.autoRotate = false;

    // ── Lights ─────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight('#d4e8ff', 0.32));

    const keyLight = new THREE.DirectionalLight('#ffffff', 1.4);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight('#a0c4ff', 0.45);
    fillLight.position.set(-5, 2, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight('#ffd4aa', 0.5);
    rimLight.position.set(6, 1, -6);
    scene.add(rimLight);

    // Screen glow point light (external, to illuminate the front of the model)
    const frontGlow = new THREE.PointLight('#55ff88', 0.7, 8);
    frontGlow.position.set(0, 2.5, 2);
    scene.add(frontGlow);

    // ── Stars — large count, multiple sizes for depth ───────────────────────
    const addStarField = (count: number, minR: number, maxR: number, size: number, opacity: number) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = minR + Math.random() * (maxR - minR);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.cos(phi);
        positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
        // Slight color variation: cold white / blue-white / warm white
        const t = Math.random();
        colors[i * 3] = 0.82 + t * 0.18;
        colors[i * 3 + 1] = 0.86 + (1 - t) * 0.12;
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const mat = new THREE.PointsMaterial({
        size,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);
      return { points, geo, mat };
    };

    // Layer 1 — distant background stars (small dots)
    const layer1 = addStarField(1200, 40, 160, 0.06, 0.85);
    // Layer 2 — mid-range stars
    const layer2 = addStarField(600, 18, 55, 0.10, 0.9);
    // Layer 3 — a handful of brighter nearby sparkles
    const layer3 = addStarField(120, 10, 25, 0.16, 1.0);

    // ── Retro Computer model ────────────────────────────────────────────────
    const model = RetroComputerModel();
    scene.add(model);


    // ── Auto-return to center after drag ───────────────────────────────────
    const HOME_CAM = new THREE.Vector3(0, 1.4, 10.8);
    const HOME_TARGET = new THREE.Vector3(0, 0, 0);
    let isReturning = false;

    const onPointerUp = () => { isReturning = true; };
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointerdown', () => { isReturning = false; });

    // ── Animation loop ──────────────────────────────────────────────────────
    let rafId = 0;
    let time = 0;
    const animate = () => {
      time += 0.008;
      layer1.points.rotation.y += 0.0003;
      layer2.points.rotation.y += 0.00015;
      layer3.points.rotation.y -= 0.0001;
      frontGlow.intensity = 0.55 + Math.sin(time * 2.2) * 0.18;

      // Smoothly lerp back to the default front-on view after user releases
      if (isReturning) {
        camera.position.lerp(HOME_CAM, 0.04);
        controls.target.lerp(HOME_TARGET, 0.04);
        // Stop once close enough
        if (camera.position.distanceTo(HOME_CAM) < 0.01) {
          camera.position.copy(HOME_CAM);
          controls.target.copy(HOME_TARGET);
          isReturning = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!mountEl) return;
      camera.aspect = mountEl.clientWidth / mountEl.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      controls.dispose();
      layer1.geo.dispose(); layer1.mat.dispose();
      layer2.geo.dispose(); layer2.mat.dispose();
      layer3.geo.dispose(); layer3.mat.dispose();
      renderer.dispose();
      if (mountEl.contains(renderer.domElement)) mountEl.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={{ height: '100vh', position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
      {/* Full-screen Three.js canvas */}
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />

      {/* Drag hint */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 28,
          transform: 'translateX(-50%)',
          fontFamily: '"Courier New", monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(120,255,150,0.5)',
          pointerEvents: 'none',
        }}
      >
        Drag to orbit · Scroll to explore
      </div>
    </div>
  );
}

function SelectedWorkCard({ study, index }: { study: SelectedWork; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<Section>('problem');

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.min(1, Math.max(0, scrolled / totalScroll));
      setProgress(p);

      const sectionIndex = Math.min(3, Math.floor(p * 4));
      setActiveSection(SECTIONS[sectionIndex]);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        {/* ── LEFT PANEL ── */}
        <div
          style={{
            position: 'relative',
            width: '38%',
            height: '100%',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <video
            key={study.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              backgroundColor: 'white',
            }}
          >
            <source src={study.videoSrc} type="video/mp4" />
          </video>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.65) 100%)',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '48px 40px',
            }}
          >
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: 16,
              }}
            >
              {String(index + 1).padStart(2, '0')} / {String(selectedWorks.length).padStart(2, '0')}
            </span>

            <h3
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                fontWeight: 400,
                color: '#ffffff',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                marginBottom: 24,
              }}
            >
              {study.title}
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
              {study.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    padding: '4px 12px',
                    fontSize: '0.75rem',
                    letterSpacing: '0.06em',
                    border: '1px solid rgba(255,255,255,0.35)',
                    color: 'rgba(255,255,255,0.8)',
                    borderRadius: 2,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                {SECTIONS.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: activeSection === s ? '#ffffff' : 'rgba(255,255,255,0.35)',
                      transition: 'color 0.3s ease',
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    {SECTION_LABELS[s]}
                  </span>
                ))}
              </div>

              <div
                style={{
                  height: 2,
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress * 100}%`,
                    background: '#ffffff',
                    borderRadius: 1,
                    transition: 'width 0.05s linear',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          style={{
            flex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '64px 72px 64px 64px',
            background: '#f5f3ef',
            overflowY: 'hidden',
          }}
        >
          {SECTIONS.map((section) => {
            const isActive = activeSection === section;
            return (
              <div
                key={section}
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(18px)',
                  transition: 'opacity 0.5s cubic-bezier(.22,1,.36,1), transform 0.5s cubic-bezier(.22,1,.36,1)',
                  position: isActive ? 'relative' : 'absolute',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <h4
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: '#9ca3af',
                    marginBottom: 20,
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  {SECTION_LABELS[section]}
                </h4>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                    color: '#374151',
                    lineHeight: 1.8,
                    maxWidth: 580,
                  }}
                >
                  {study[section]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" style={{ background: '#000' }}>
      <SectionHeader />

      {selectedWorks.map((study, index) => (
        <SelectedWorkCard key={index} study={study} index={index} />
      ))}
    </section>
  );
}