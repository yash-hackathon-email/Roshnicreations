import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Float, MeshDistortMaterial } from '@react-three/drei';

function Model({ url }) {
  // Try to load the GLTF model. If not provided or fails, we won't crash if we handle it smoothly below.
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

function PlaceholderGem() {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <octahedronGeometry args={[1.5, 0]} />
        <MeshDistortMaterial
          color="#facc15"
          envMapIntensity={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.8}
          roughness={0.2}
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

const Jewelry3DViewer = ({ modelUrl }) => {
  // If modelUrl is not provided or explicitly 'placeholder.glb' but not verified, show placeholder
  const usePlaceholder = !modelUrl || modelUrl === 'placeholder.glb';

  return (
    <div className="w-full h-[400px] bg-gradient-to-tr from-gray-900 to-black rounded-2xl overflow-hidden relative shadow-2xl border border-gray-800">
      <div className="absolute top-4 left-4 z-10">
         <span className="bg-black/50 backdrop-blur-md text-gold-400 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-gold-500/30">
            3D Interactive Viewer
         </span>
      </div>
      
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5}>
            {usePlaceholder ? <PlaceholderGem /> : <Model url={modelUrl} />}
          </Stage>
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={true} />
      </Canvas>
      
      {usePlaceholder && (
         <div className="absolute bottom-4 right-4 z-10 opacity-50">
            <p className="text-[10px] text-gray-400">Placeholder (No GLB found)</p>
         </div>
      )}
    </div>
  );
};

export default Jewelry3DViewer;
