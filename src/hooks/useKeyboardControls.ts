import { useEffect } from "react";
import { ParticleSystemConfig } from "./useParticleSystem";

interface KeyboardControlsProps {
  config: ParticleSystemConfig;
  updateConfig: (updates: Partial<ParticleSystemConfig>) => void;
  clearParticles: () => void;
  setShowControls: (show: boolean | ((prev: boolean) => boolean)) => void;
}

export const useKeyboardControls = ({
  config,
  updateConfig,
  clearParticles,
  setShowControls,
}: KeyboardControlsProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "1":
          updateConfig({ mode: "rain" });
          break;
        case "2":
          updateConfig({ mode: "firework" });
          break;
        case "3":
          updateConfig({ mode: "spiral" });
          break;
        case "4":
          updateConfig({ mode: "bounce" });
          break;
        case "5":
          updateConfig({ mode: "magnetic" });
          break;
        case "6":
          updateConfig({ mode: "vortex" });
          break;
        case " ":
          e.preventDefault();
          updateConfig({ autoExplode: !config.autoExplode });
          break;
        case "c":
          setShowControls((prev) => !prev);
          break;
        case "ArrowUp":
          updateConfig({ speed: Math.min(config.speed + 0.1, 3) });
          break;
        case "ArrowDown":
          updateConfig({ speed: Math.max(config.speed - 0.1, 0.1) });
          break;
        case "g":
          updateConfig({ gravity: config.gravity === 0.1 ? 0.05 : 0.1 });
          break;
        case "r":
          clearParticles();
          break;
        case "t":
          const themes = ["rainbow", "fire", "ice", "neon"] as const;
          const currentIndex = themes.indexOf(config.colorTheme);
          const nextTheme = themes[(currentIndex + 1) % themes.length];
          updateConfig({ colorTheme: nextTheme });
          break;
        case "s":
          updateConfig({ particleSize: Math.min(config.particleSize + 1, 8) });
          break;
        case "a":
          updateConfig({ particleSize: Math.max(config.particleSize - 1, 1) });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [config, updateConfig, clearParticles, setShowControls]);
};
