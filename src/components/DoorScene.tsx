import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import MagneticButton from '../experience/MagneticButton';
import { playWeddingMusic } from '../hooks/useWeddingMusic';

interface Props {
  onComplete: () => void;
}

export default function DoorScene({ onComplete }: Props) {
  const [phase, setPhase] = useState<'waiting' | 'opening' | 'done'>('waiting');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const openAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (phase !== 'opening') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const duration = 2.4;
      const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        const t = i / ctx.sampleRate;
        const env = t < 0.1 ? t / 0.1 : t > 1.9 ? (duration - t) / 0.5 : 1;
        data[i] = (Math.sin(2 * Math.PI * (75 + 35 * Math.sin(t * 2)) * t) * 0.12 + (Math.random() * 2 - 1) * 0.03 * env) * env * 0.5;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.value = 0.32;
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start();
    } catch {
      /* audio optional */
    }
  }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c0708);
    scene.fog = new THREE.FogExp2(0x0c0708, 0.06);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 1.7, 7.4);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();

    scene.add(new THREE.AmbientLight(0x4a342c, 1.3));
    const key = new THREE.DirectionalLight(0xf0e6d4, 2.8);
    key.position.set(1.4, 4.2, 6.5);
    scene.add(key);
    const doorLight = new THREE.DirectionalLight(0xfff1dc, 3.2);
    doorLight.position.set(0, 3.8, 2.2);
    scene.add(doorLight);
    const portal = new THREE.PointLight(0xd4c4a0, 0, 22, 1.15);
    portal.position.set(0, 2, -3.2);
    scene.add(portal);
    const rim = new THREE.SpotLight(0xc4a574, 4.2, 16, Math.PI / 4, 0.5, 1);
    rim.position.set(0, 6.2, -1);
    rim.target.position.set(0, 1.2, 2);
    scene.add(rim);
    scene.add(rim.target);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshStandardMaterial({ color: 0x0a0607, roughness: 0.7, metalness: 0.18 }),
    );
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const gold = new THREE.MeshStandardMaterial({ color: 0xc4a574, roughness: 0.18, metalness: 0.92 });
    const wood = new THREE.MeshStandardMaterial({ color: 0x2a1814, roughness: 0.32, metalness: 0.55 });

    const doorGroup = new THREE.Group();
    doorGroup.position.set(0, 0, -2.4);
    scene.add(doorGroup);
    doorLight.target = doorGroup;

    const frameL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 4, 0.15), gold);
    frameL.position.set(-1.46, 2, 0);
    const frameR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 4, 0.15), gold);
    frameR.position.set(1.46, 2, 0);
    const frameT = new THREE.Mesh(new THREE.BoxGeometry(3.04, 0.12, 0.15), gold);
    frameT.position.set(0, 4, 0);
    doorGroup.add(frameL, frameR, frameT);

    const leftHinge = new THREE.Group();
    leftHinge.position.set(-1.4, 0, 0);
    const rightHinge = new THREE.Group();
    rightHinge.position.set(1.4, 0, 0);
    doorGroup.add(leftHinge, rightHinge);

    const leftDoor = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4, 0.08), wood);
    leftDoor.position.set(0.7, 2, 0);
    leftHinge.add(leftDoor);
    const rightDoor = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4, 0.08), wood);
    rightDoor.position.set(-0.7, 2, 0);
    rightHinge.add(rightDoor);

    for (let i = 0; i < 3; i++) {
      const lp = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1, 0.02), gold);
      lp.position.set(0.7, 0.8 + i * 1.2, 0.05);
      leftHinge.add(lp);
      const rp = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1, 0.02), gold);
      rp.position.set(-0.7, 0.8 + i * 1.2, 0.05);
      rightHinge.add(rp);
    }

    const handleL = new THREE.Mesh(new THREE.SphereGeometry(0.05, 24, 24), gold);
    handleL.position.set(1.25, 1.8, 0.07);
    leftHinge.add(handleL);
    const handleR = new THREE.Mesh(new THREE.SphereGeometry(0.05, 24, 24), gold);
    handleR.position.set(-1.25, 1.8, 0.07);
    rightHinge.add(handleR);

    const count = 140;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      speeds[i] = 0.003 + Math.random() * 0.005;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xd4c4a0,
      size: 0.038,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    const clock = new THREE.Clock();
    let frame = 0;

    const animate = () => {
      const t = clock.getElapsedTime();
      const current = phaseRef.current;

      if (current === 'waiting') {
        openAtRef.current = null;
        camera.position.z = 7.4 + Math.sin(t * 0.45) * 0.08;
        camera.position.y = 1.7 + Math.sin(t * 0.6) * 0.02;
        leftHinge.rotation.y = 0;
        rightHinge.rotation.y = 0;
        portal.intensity = 0.35 + Math.sin(t) * 0.12;
      } else if (current === 'opening') {
        if (openAtRef.current === null) openAtRef.current = t;
        const openT = Math.max(0, t - openAtRef.current);
        const doorAngle = Math.min(2.05, openT * 0.36);
        leftHinge.rotation.y = -doorAngle;
        rightHinge.rotation.y = doorAngle;
        portal.intensity = Math.min(9, openT * 1.8);
        const camPush = Math.max(0, openT - 1.4);
        camera.position.z = 7.4 - Math.min(1.8, camPush * 0.32);
        camera.position.y = 1.7 + Math.sin(t * 0.4) * 0.02;
      }

      const arr = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += speeds[i];
        arr[i * 3] += Math.sin(t * 0.4 + i) * 0.001;
        if (arr[i * 3 + 1] > 4.6) {
          arr[i * 3 + 1] = 0;
          arr[i * 3] = (Math.random() - 0.5) * 8;
        }
      }
      pGeo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
      renderer.dispose();
      pGeo.dispose();
      pMat.dispose();
    };
  }, []);

  const openDoor = () => {
    if (phase !== 'waiting') return;
    playWeddingMusic();
    setPhase('opening');
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 6200);
  };

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden select-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8 }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
            style={{ background: 'radial-gradient(ellipse at 50% 30%, #241016 0%, #0c0708 60%, #000 100%)' }}
          />

          <AnimatePresence>
            {phase === 'waiting' && (
              <motion.div
                className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-16 md:pb-24 px-6 text-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <p className="font-accent text-[10px] md:text-xs tracking-[0.48em] text-champagne mb-8 pointer-events-none">
                  THERE'S MORE TO DISCOVER.
                </p>
                <div className="pointer-events-auto">
                  <MagneticButton onClick={openDoor}>Open the door</MagneticButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
