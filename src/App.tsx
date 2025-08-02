import React, { useEffect, useState } from "react";
import "./App.css";
import { useParticleSystem } from "./hooks/useParticleSystem";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { useCanvas } from "./hooks/useCanvas";
import { ControlsPanel } from "./components/ControlsPanel";

function App() {
  const canvasRef = useCanvas();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(true);

  const {
    particlesRef,
    animationRef,
    config,
    updateConfig,
    createParticle,
    createExplosion,
    createSpiral,
    createVortex,
    updateParticles,
    clearParticles,
    colorThemes,
  } = useParticleSystem();

  // Setup keyboard controls
  useKeyboardControls({
    config,
    updateConfig,
    clearParticles,
    setShowControls,
  });

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const animate = () => {
      updateParticles(canvas, mousePos, isMouseDown);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateParticles, mousePos, isMouseDown, animationRef, canvasRef]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Add particles around mouse
    if (isMouseDown && Math.random() < 0.3) {
      particlesRef.current.push(createParticle(x, y, false, config.mode));
    }
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
    if (config.mode === "spiral") {
      createSpiral(mousePos.x, mousePos.y);
    } else if (config.mode === "vortex") {
      createVortex(mousePos.x, mousePos.y);
    } else {
      createExplosion(mousePos.x, mousePos.y);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (config.mode === "spiral") {
      createSpiral(x, y);
    } else if (config.mode === "vortex") {
      createVortex(x, y);
    } else {
      createExplosion(x, y);
    }
  };

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        style={{
          cursor: "crosshair",
          background: "linear-gradient(to bottom, #0f0f23, #1a1a2e, #16213e)",
          display: "block",
        }}
      />

      {showControls && (
        <ControlsPanel
          config={config}
          updateConfig={updateConfig}
          clearParticles={clearParticles}
          setShowControls={setShowControls}
          colorThemes={colorThemes}
        />
      )}

      {!showControls && (
        <button
          className="show-controls-btn"
          onClick={() => setShowControls(true)}
        >
          🎮 Show Controls
        </button>
      )}
    </div>
  );
}

export default App;
