import React from "react";
import { ParticleSystemConfig, ColorTheme } from "../hooks/useParticleSystem";

interface ControlsPanelProps {
  config: ParticleSystemConfig;
  updateConfig: (updates: Partial<ParticleSystemConfig>) => void;
  clearParticles: () => void;
  setShowControls: (show: boolean) => void;
  colorThemes: Record<ColorTheme, string[]>;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  config,
  updateConfig,
  clearParticles,
  setShowControls,
  colorThemes,
}) => {
  const modes = [
    { key: "rain", label: "🌧️ Rain", emoji: "🌧️" },
    { key: "firework", label: "🎆 Firework", emoji: "🎆" },
    { key: "spiral", label: "🌀 Spiral", emoji: "🌀" },
    { key: "bounce", label: "⚡ Bounce", emoji: "⚡" },
    { key: "magnetic", label: "🧲 Magnetic", emoji: "🧲" },
    { key: "vortex", label: "🌪️ Vortex", emoji: "🌪️" },
  ] as const;

  const themes = Object.keys(colorThemes) as ColorTheme[];

  return (
    <div className="controls">
      <h2>🎮 Interactive Controls</h2>
      <div className="control-grid">
        <div className="control-group">
          <h3>Modes (1-6)</h3>
          <div className="mode-buttons">
            {modes.map((mode) => (
              <button
                key={mode.key}
                className={config.mode === mode.key ? "active" : ""}
                onClick={() => updateConfig({ mode: mode.key })}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <h3>Speed: {config.speed.toFixed(1)} (↑↓)</h3>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={config.speed}
            onChange={(e) =>
              updateConfig({ speed: parseFloat(e.target.value) })
            }
          />
        </div>

        <div className="control-group">
          <h3>Particle Size: {config.particleSize} (S/A)</h3>
          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={config.particleSize}
            onChange={(e) =>
              updateConfig({ particleSize: parseInt(e.target.value) })
            }
          />
        </div>

        <div className="control-group">
          <h3>Trail Length: {config.trailLength}</h3>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={config.trailLength}
            onChange={(e) =>
              updateConfig({ trailLength: parseInt(e.target.value) })
            }
          />
        </div>

        <div className="control-group">
          <h3>Color Theme: {config.colorTheme} (T)</h3>
          <div className="theme-buttons">
            {themes.map((theme) => (
              <button
                key={theme}
                className={config.colorTheme === theme ? "active" : ""}
                onClick={() => updateConfig({ colorTheme: theme })}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <h3>Gravity: {config.gravity === 0.1 ? "Normal" : "Low"} (G)</h3>
          <button
            onClick={() =>
              updateConfig({ gravity: config.gravity === 0.1 ? 0.05 : 0.1 })
            }
          >
            Toggle Gravity
          </button>
        </div>

        <div className="control-group">
          <h3>Auto Explode: {config.autoExplode ? "ON" : "OFF"} (Space)</h3>
          <button
            onClick={() => updateConfig({ autoExplode: !config.autoExplode })}
          >
            Toggle Auto
          </button>
        </div>

        <div className="control-group">
          <h3>Actions</h3>
          <button onClick={clearParticles}>Clear (R)</button>
          <button onClick={() => setShowControls(false)}>
            Hide Controls (C)
          </button>
        </div>
      </div>

      <div className="instructions">
        <p>
          🎮 <strong>Keyboard Controls:</strong>
        </p>
        <p>
          1-6: Change modes • Space: Auto explode • ↑↓: Speed • S/A: Size • T:
          Theme • G: Gravity • R: Clear • C: Hide controls
        </p>
        <p>
          🖱️ <strong>Mouse:</strong> Click/Drag to create effects • Move mouse
          for trails
        </p>
      </div>
    </div>
  );
};
