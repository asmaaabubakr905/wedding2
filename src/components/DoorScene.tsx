import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Props {
  onComplete: () => void;
}

export default function DoorScene({ onComplete }: Props) {
  const [phase, setPhase] = useState<'idle' | 'walking' | 'opening' | 'done'>('idle');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('walking'), 600);
    const t2 = setTimeout(() => setPhase('opening'), 2800);
    const t3 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 5400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  // Cinematic door creak audio
  useEffect(() => {
    if (phase === 'opening') {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const duration = 2.4;
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
          const t = i / ctx.sampleRate;
          const env = t < 0.1 ? t / 0.1 : t > 1.9 ? (duration - t) / 0.5 : 1;
          const creak = Math.sin(2 * Math.PI * (75 + 35 * Math.sin(t * 2)) * t) * 0.12;
          const noise = (Math.random() * 2 - 1) * 0.03 * env;
          data[i] = (creak + noise) * env * 0.55;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.35, ctx.currentTime);
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start();
      } catch {
        // Audio API not supported
      }
    }
  }, [phase]);

  // Real-Time Three.js WebGL 3D CGI Engine
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x040201);
    // Reduced fog density slightly to let luxury door details shine through clearly
    scene.fog = new THREE.FogExp2(0x090604, 0.075);

    // 2. Camera Setup (Cinematic perspective)
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 1.6, 8.0); // Dollying closer

    // 3. Renderer Setup (ACME tone-mapping & smooth antialiasing)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // 4. Dynamic Lighting System
    // Rich chocolate-bronze ambient light
    const ambientLight = new THREE.AmbientLight(0x5a3e28, 1.6);
    scene.add(ambientLight);

    // Powerful front Key Light to reveal all 3D curves & gold highlights
    const keyFrontLight = new THREE.DirectionalLight(0xffebd2, 3.8);
    keyFrontLight.position.set(1.5, 4.5, 7.5);
    scene.add(keyFrontLight);

    // Dedicated Directional Door Light pointing straight at the doors (ensures perfect closed/opened clarity)
    const doorLight = new THREE.DirectionalLight(0xfff3d5, 4.5);
    doorLight.position.set(0, 4.0, 2.0);
    scene.add(doorLight);

    // Warm golden point light behind portal (ONLY flaring when doors open)
    const portalLight = new THREE.PointLight(0xffaa44, 0.0, 25, 1.2);
    portalLight.position.set(0, 2.0, -3.5);
    scene.add(portalLight);

    // Strong rear Spotlight to cast an intense golden rim halo outline
    const rimSpot = new THREE.SpotLight(0xffd700, 6.0, 15, Math.PI / 4, 0.5, 1);
    rimSpot.position.set(0, 6.5, -1.0);
    rimSpot.target.position.set(0, 1.2, 2);
    scene.add(rimSpot);
    scene.add(rimSpot.target);

    // 5. Ground Floor Geometry
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x070504,
      roughness: 0.65, // Diffused matte reflections
      metalness: 0.2,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Golden grid details
    const floorGrid = new THREE.GridHelper(30, 30, 0xd4b257, 0xd4b257);
    floorGrid.position.y = 0.005;
    (floorGrid.material as THREE.Material).transparent = true;
    (floorGrid.material as THREE.Material).opacity = 0.05;
    scene.add(floorGrid);

    // 6. Volumetric Double Door Portal
    const doorGroup = new THREE.Group();
    doorGroup.position.set(0, 0, -2.5);
    scene.add(doorGroup);
    // Align door directional light target to the door group
    doorLight.target = doorGroup;
    scene.add(doorLight.target);

    // High-end materials for doors
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xe5c158,
      roughness: 0.1,
      metalness: 0.98,
    });

    const luxuryDoorPanelMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a361e, // High-end dark golden bronze wood feel
      roughness: 0.25,
      metalness: 0.8,
    });

    const frameLeft = new THREE.Mesh(new THREE.BoxGeometry(0.12, 4.0, 0.15), goldMaterial);
    frameLeft.position.set(-1.46, 2.0, 0);
    frameLeft.castShadow = true;
    doorGroup.add(frameLeft);

    const frameRight = new THREE.Mesh(new THREE.BoxGeometry(0.12, 4.0, 0.15), goldMaterial);
    frameRight.position.set(1.46, 2.0, 0);
    frameRight.castShadow = true;
    doorGroup.add(frameRight);

    const frameTop = new THREE.Mesh(new THREE.BoxGeometry(3.04, 0.12, 0.15), goldMaterial);
    frameTop.position.set(0, 4.0, 0);
    frameTop.castShadow = true;
    doorGroup.add(frameTop);

    const leftHinge = new THREE.Group();
    leftHinge.position.set(-1.4, 0, 0);
    doorGroup.add(leftHinge);

    const rightHinge = new THREE.Group();
    rightHinge.position.set(1.4, 0, 0);
    doorGroup.add(rightHinge);

    // Left door wood & gold molds
    const leftDoor = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4.0, 0.08), luxuryDoorPanelMaterial);
    leftDoor.position.set(0.7, 2.0, 0);
    leftDoor.castShadow = true;
    leftHinge.add(leftDoor);

    for (let i = 0; i < 3; i++) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.0, 0.02), goldMaterial);
      panel.position.set(0.7, 0.8 + i * 1.2, 0.05);
      panel.castShadow = true;
      leftHinge.add(panel);
    }

    // Right door wood & gold molds
    const rightDoor = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4.0, 0.08), luxuryDoorPanelMaterial);
    rightDoor.position.set(-0.7, 2.0, 0);
    rightDoor.castShadow = true;
    rightHinge.add(rightDoor);

    for (let i = 0; i < 3; i++) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.0, 0.02), goldMaterial);
      panel.position.set(-0.7, 0.8 + i * 1.2, 0.05);
      panel.castShadow = true;
      rightHinge.add(panel);
    }

    // Handles
    const handleL = new THREE.Mesh(new THREE.SphereGeometry(0.05, 32, 32), goldMaterial);
    handleL.position.set(1.25, 1.8, 0.07);
    leftHinge.add(handleL);

    const handleR = new THREE.Mesh(new THREE.SphereGeometry(0.05, 32, 32), goldMaterial);
    handleR.position.set(-1.25, 1.8, 0.07);
    rightHinge.add(handleR);

    // 7. 3D GLOWING DUST PARTICLE SYSTEM
    const particleCount = 180;
    const pGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const ySpeeds = new Float32Array(particleCount);
    const xOffsets = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      ySpeeds[i] = 0.0035 + Math.random() * 0.005;
      xOffsets[i] = Math.random() * 100;
    }

    pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMaterial = new THREE.PointsMaterial({
      color: 0xffdf80,
      size: 0.042,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleSystem = new THREE.Points(pGeometry, pMaterial);
    scene.add(particleSystem);


    // 8. UNIFIED LIGHTING & VOLUMETRIC KEYING SHADER
    // Translates 2.5D flat texture planes into volumetric cylinders that wrap light beautifully
    const volumetricShader = {
      uniforms: {
        map: { value: null as THREE.Texture | null },
        opacity: { value: 1.0 },
        keyLightPos: { value: new THREE.Vector3(1.5, 4.5, 7.5) },
        keyLightColor: { value: new THREE.Color(0xffebd2) },
        rimLightPos: { value: new THREE.Vector3(0, 6.5, -1.0) },
        rimLightColor: { value: new THREE.Color(0xffd700) },
        ambientColor: { value: new THREE.Color(0x5a3e28) },
        ambientIntensity: { value: 1.6 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPos.xyz;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        uniform float opacity;
        uniform vec3 keyLightPos;
        uniform vec3 keyLightColor;
        uniform vec3 rimLightPos;
        uniform vec3 rimLightColor;
        uniform vec3 ambientColor;
        uniform float ambientIntensity;
        
        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying vec3 vNormal;

        void main() {
          vec4 texColor = texture2D(map, vUv);
          
          // Smooth alpha threshold keying of pure black backgrounds
          float maxVal = max(texColor.r, max(texColor.g, texColor.b));
          float alpha = smoothstep(0.02, 0.12, maxVal);
          if (alpha < 0.01) discard;

          // Generate dynamic cylinder normals wrapping around the texture to simulate 3D volume
          float nx = (vUv.x - 0.5) * 2.0;
          float ny = (vUv.y - 0.5) * 0.15;
          float nz = sqrt(max(0.0, 1.0 - nx*nx - ny*ny));
          vec3 curvedNormal = normalize(vec3(nx, ny, nz));

          // Calculate front diffuse key lighting wrapping around their bodies
          vec3 lightDir = normalize(keyLightPos - vWorldPos);
          float diffuse = max(0.0, dot(curvedNormal, lightDir));
          vec3 diffuseLight = diffuse * keyLightColor * 1.6;

          // Project intense golden rim lighting from the door blast/portal behind them
          vec3 rimDir = normalize(rimLightPos - vWorldPos);
          vec3 viewDir = normalize(vec3(0.0, 1.6, 8.5) - vWorldPos);
          float rimIntensity = pow(1.0 - max(0.0, dot(curvedNormal, viewDir)), 3.5);
          float rimDot = max(0.0, dot(curvedNormal, rimDir));
          vec3 rimLight = rimIntensity * rimDot * rimLightColor * 3.8;

          // Combine ambient, key diffuse, and gold rim lights
          vec3 ambient = ambientColor * ambientIntensity;
          vec3 finalColor = texColor.rgb * (ambient + diffuseLight + rimLight);

          gl_FragColor = vec4(finalColor, texColor.a * alpha * opacity);
        }
      `
    };

    // Load High-Fidelity Pre-Rendered Textures
    const textureLoader = new THREE.TextureLoader();
    const groomTexture = textureLoader.load('/groom_cgi.png');
    const brideTexture = textureLoader.load('/bride_cgi.png');

    groomTexture.minFilter = THREE.LinearFilter;
    groomTexture.generateMipmaps = false;
    brideTexture.minFilter = THREE.LinearFilter;
    brideTexture.generateMipmaps = false;


    // 9. UNIFIED SEAMLESS CGI CHARACTER PLANES (No Cuts, No Gaps)
    const charPlaneGeo = new THREE.PlaneGeometry(1.65, 2.5);

    // Groom Unified 3D Plane Mesh
    const groomMat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(volumetricShader.uniforms),
      vertexShader: volumetricShader.vertexShader,
      fragmentShader: volumetricShader.fragmentShader,
      transparent: true,
      depthWrite: false,
    });
    groomMat.uniforms.map.value = groomTexture;

    const groomPlane = new THREE.Mesh(charPlaneGeo, groomMat);
    groomPlane.position.set(-0.55, 1.25, 4.0);
    scene.add(groomPlane);

    // Bride Unified 3D Plane Mesh
    const brideMat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(volumetricShader.uniforms),
      vertexShader: volumetricShader.vertexShader,
      fragmentShader: volumetricShader.fragmentShader,
      transparent: true,
      depthWrite: false,
    });
    brideMat.uniforms.map.value = brideTexture;

    const bridePlane = new THREE.Mesh(charPlaneGeo, brideMat);
    bridePlane.position.set(0.55, 1.25, 4.0);
    scene.add(bridePlane);


    // 10. PROCEDURAL BLUR CONTACT SHADOWS under their feet
    const shadowGeo = new THREE.RingGeometry(0.01, 0.28, 32);
    // Custom shader material creating a beautiful soft radial blur shadow
    const contactShadowMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        opacity: { value: 0.65 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float opacity;
        varying vec2 vUv;
        void main() {
          float dist = distance(vUv, vec2(0.5));
          float alpha = smoothstep(0.5, 0.15, dist);
          gl_FragColor = vec4(0.0, 0.0, 0.0, alpha * opacity);
        }
      `
    });

    const groomShadow = new THREE.Mesh(shadowGeo, contactShadowMat.clone());
    groomShadow.rotation.x = -Math.PI / 2;
    groomShadow.position.set(-0.55, 0.015, 4.0);
    scene.add(groomShadow);

    const brideShadow = new THREE.Mesh(shadowGeo, contactShadowMat.clone());
    brideShadow.rotation.x = -Math.PI / 2;
    brideShadow.position.set(0.55, 0.015, 4.0);
    scene.add(brideShadow);


    // 11. REAL-TIME PERSPECTIVE Dollying & Skeletal Joint Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Handheld camera dolly-in & vertical focal breath
      camera.position.z = 8.5 - time * 0.18;
      camera.position.y = 1.6 + Math.sin(time * 0.55) * 0.025;
      camera.position.x = Math.cos(time * 0.35) * 0.015;

      const speed = 5.2;

      if (phase === 'walking') {
        const walkZ = 4.0 - time * 0.72;
        const boundedZ = Math.max(1.8, walkZ);

        // Ground Rigs in physical 3D coordinate space
        groomPlane.position.z = boundedZ;
        bridePlane.position.z = boundedZ;

        // Bob up and down representing body weight-shifts of foot strides
        const bob = Math.abs(Math.sin(time * speed)) * 0.04;
        groomPlane.position.y = 1.25 + bob;
        bridePlane.position.y = 1.25 + bob;

        // MASTERFUL MULTI-AXIS WALKING ROTATIONS (No gaps, deforming free)
        // 1. Pitch: lean forward matching strides
        const pitchAngle = 0.03 + Math.sin(time * speed * 2) * 0.015;
        // 2. Yaw: shoulder turns
        const yawAngle = Math.sin(time * speed) * 0.055;
        // 3. Roll: lateral hips weight sways
        const rollAngle = Math.cos(time * speed) * 0.035;

        groomPlane.rotation.x = pitchAngle;
        groomPlane.rotation.y = yawAngle;
        groomPlane.rotation.z = rollAngle;

        bridePlane.rotation.x = pitchAngle;
        bridePlane.rotation.y = -yawAngle * 0.8;
        bridePlane.rotation.z = -rollAngle * 0.8;

        // DYNAMIC PROCEDURAL CONTACT SHADOWS
        groomShadow.position.z = boundedZ;
        brideShadow.position.z = boundedZ;

        // Scale and fade shadows depending on step heights (legs swinging up)
        const heightFactor = 1.0 - bob * 3.5;
        (groomShadow.material as any).uniforms.opacity.value = 0.65 * heightFactor;
        groomShadow.scale.set(heightFactor, heightFactor, 1.0);

        (brideShadow.material as any).uniforms.opacity.value = 0.65 * heightFactor;
        brideShadow.scale.set(heightFactor, heightFactor, 1.0);
      }
      else if (phase === 'opening') {
        const openTime = time - 2.2;
        const progressZ = 1.8 - openTime * 0.85;

        groomPlane.position.z = progressZ;
        bridePlane.position.z = progressZ;

        // Eased standing sways
        groomPlane.rotation.set(0, 0, 0);
        bridePlane.rotation.set(0, 0, 0);

        // Move contact shadows with final glide
        groomShadow.position.z = progressZ;
        brideShadow.position.z = progressZ;

        // Hinge double doors swing open
        const doorAngle = Math.min(2.1, openTime * 1.3);
        leftHinge.rotation.y = -doorAngle;
        rightHinge.rotation.y = doorAngle;

        // Portal golden point light flares up
        portalLight.intensity = Math.min(16.0, openTime * 14.0);

        // Dissolve characters (opacity decay)
        const opacity = Math.max(0, 1.0 - openTime * 0.72);
        groomMat.uniforms.opacity.value = opacity;
        brideMat.uniforms.opacity.value = opacity;

        (groomShadow.material as any).uniforms.opacity.value = 0.65 * opacity;
        (brideShadow.material as any).uniforms.opacity.value = 0.65 * opacity;
      }
      else {
        // IDLE standing sways
        const idleZ = 4.0;
        groomPlane.position.z = idleZ;
        bridePlane.position.z = idleZ;

        groomShadow.position.z = idleZ;
        brideShadow.position.z = idleZ;

        const breathe = Math.sin(time * 1.4) * 0.006;
        groomPlane.position.y = 1.25 + breathe;
        bridePlane.position.y = 1.25 + breathe;

        groomPlane.rotation.set(0, 0, 0);
        bridePlane.rotation.set(0, 0, 0);
      }

      // 3D Particles drift
      const positions = pGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += ySpeeds[i];
        positions[i * 3] += Math.sin(time * 0.4 + xOffsets[i]) * 0.0012;

        if (positions[i * 3 + 1] > 4.5) {
          positions[i * 3 + 1] = 0;
          positions[i * 3] = (Math.random() - 0.5) * 8;
        }
      }
      pGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup memory allocations on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((mat) => mat.dispose());
        } else {
          object.material.dispose();
        }
      });
      pGeometry.dispose();
      pMaterial.dispose();
      groomTexture.dispose();
      brideTexture.dispose();
      renderer.dispose();
    };
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden select-none pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          {/* HTML5 Canvas supporting Three.js WebGL rendering context */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
            style={{
              background: 'radial-gradient(ellipse at 50% 30%, #161009 0%, #060402 55%, #000000 100%)',
            }}
          />

          {/* Cinematic Top Title overlay */}
          <motion.div
            className="absolute top-16 left-0 right-0 text-center z-25 pointer-events-none"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2 }}
          >
            <p
              className="font-script text-amber-200 text-5xl md:text-6xl tracking-wide"
              style={{ textShadow: '0 0 35px rgba(201,168,76,0.6)' }}
            >
              Once upon a time...
            </p>
          </motion.div>

          {/* Bottom subtitle when doors open */}
          <AnimatePresence>
            {phase === 'opening' && (
              <motion.div
                className="absolute bottom-16 left-0 right-0 text-center z-25 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-sans-elegant text-amber-100/60 tracking-[0.35em] text-xs md:text-sm uppercase">
                  A love story begins
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
