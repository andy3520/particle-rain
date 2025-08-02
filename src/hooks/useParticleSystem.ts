import { useCallback, useRef, useState } from "react";

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  type: ParticleType;
  trail: { x: number; y: number; life: number }[];
}

export type ParticleType =
  | "rain"
  | "firework"
  | "spiral"
  | "bounce"
  | "magnetic"
  | "vortex";
export type ColorTheme = "rainbow" | "fire" | "ice" | "neon";

export interface ParticleSystemConfig {
  mode: ParticleType;
  speed: number;
  gravity: number;
  autoExplode: boolean;
  trailLength: number;
  colorTheme: ColorTheme;
  particleSize: number;
  magneticStrength: number;
}

export const useParticleSystem = () => {
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);

  const [config, setConfig] = useState<ParticleSystemConfig>({
    mode: "rain",
    speed: 1,
    gravity: 0.1,
    autoExplode: false,
    trailLength: 5,
    colorTheme: "rainbow",
    particleSize: 3,
    magneticStrength: 0.5,
  });

  const colorThemes = {
    rainbow: [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E9",
      "#F8C471",
      "#82E0AA",
    ],
    fire: [
      "#FF4500",
      "#FF6347",
      "#FF7F50",
      "#FF8C00",
      "#FFA500",
      "#FFD700",
      "#FF6B35",
      "#FF4500",
      "#FF6347",
      "#FF7F50",
    ],
    ice: [
      "#00BFFF",
      "#87CEEB",
      "#B0E0E6",
      "#ADD8E6",
      "#F0F8FF",
      "#E0F6FF",
      "#B0E0E6",
      "#87CEEB",
      "#00BFFF",
      "#1E90FF",
    ],
    neon: [
      "#FF00FF",
      "#00FFFF",
      "#FFFF00",
      "#FF0080",
      "#8000FF",
      "#00FF80",
      "#FF8000",
      "#0080FF",
      "#80FF00",
      "#FF0080",
    ],
  };

  const colors = colorThemes[config.colorTheme];

  const createParticle = useCallback(
    (
      x: number,
      y: number,
      isExplosion = false,
      particleType: ParticleType = config.mode
    ): Particle => {
      const angle = Math.random() * Math.PI * 2;
      let speed = isExplosion ? Math.random() * 8 + 2 : Math.random() * 2 + 1;
      let vy = Math.random() * 3 + 2;
      let vx = Math.cos(angle) * speed;

      // Different particle behaviors based on mode
      switch (particleType) {
        case "firework":
          speed = isExplosion ? Math.random() * 12 + 5 : Math.random() * 3 + 1;
          vx = Math.cos(angle) * speed;
          vy = isExplosion
            ? Math.sin(angle) * speed - 3
            : Math.random() * 4 + 2;
          break;
        case "spiral":
          const spiralAngle = Math.random() * Math.PI * 2;
          const spiralRadius = Math.random() * 50 + 20;
          vx = Math.cos(spiralAngle) * spiralRadius * 0.1;
          vy = Math.sin(spiralAngle) * spiralRadius * 0.1 + 2;
          break;
        case "bounce":
          vx = (Math.random() - 0.5) * 4;
          vy = Math.random() * 2 + 1;
          break;
        case "magnetic":
          vx = (Math.random() - 0.5) * 2;
          vy = Math.random() * 2 + 1;
          break;
        case "vortex":
          const vortexAngle = Math.random() * Math.PI * 2;
          const vortexRadius = Math.random() * 30 + 10;
          vx = Math.cos(vortexAngle) * vortexRadius * 0.05;
          vy = Math.sin(vortexAngle) * vortexRadius * 0.05 + 1;
          break;
        default: // rain
          vx = (Math.random() - 0.5) * 2;
          vy = Math.random() * 3 + 2;
      }

      return {
        x,
        y,
        vx,
        vy,
        size: Math.random() * config.particleSize + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        maxLife: Math.random() * 0.5 + 0.5,
        type: particleType,
        trail: [],
      };
    },
    [config.mode, colors, config.particleSize]
  );

  const createExplosion = useCallback(
    (x: number, y: number) => {
      const explosionCount = config.mode === "firework" ? 25 : 15;
      for (let i = 0; i < explosionCount; i++) {
        particlesRef.current.push(createParticle(x, y, true, config.mode));
      }
    },
    [createParticle, config.mode]
  );

  const createSpiral = useCallback(
    (x: number, y: number) => {
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 30;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        particlesRef.current.push(createParticle(px, py, false, "spiral"));
      }
    },
    [createParticle]
  );

  const createVortex = useCallback(
    (x: number, y: number) => {
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 40;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        particlesRef.current.push(createParticle(px, py, false, "vortex"));
      }
    },
    [createParticle]
  );

  const updateParticles = useCallback(
    (
      canvas: HTMLCanvasElement,
      mousePos: { x: number; y: number },
      isMouseDown: boolean
    ) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear canvas with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        // Add to trail
        particle.trail.push({
          x: particle.x,
          y: particle.y,
          life: particle.life,
        });
        if (particle.trail.length > config.trailLength) {
          particle.trail.shift();
        }

        particle.x += particle.vx * config.speed;
        particle.y += particle.vy * config.speed;

        // Different physics for different modes
        switch (particle.type) {
          case "bounce":
            particle.vy += config.gravity;
            if (particle.y > canvas.height - particle.size) {
              particle.y = canvas.height - particle.size;
              particle.vy = -particle.vy * 0.7; // Bounce with energy loss
            }
            if (
              particle.x < particle.size ||
              particle.x > canvas.width - particle.size
            ) {
              particle.vx = -particle.vx * 0.8;
            }
            break;
          case "spiral":
            particle.vx += Math.sin(Date.now() * 0.01) * 0.1;
            particle.vy += config.gravity * 0.5;
            break;
          case "magnetic":
            // Magnetic attraction to mouse
            const dx = mousePos.x - particle.x;
            const dy = mousePos.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 0 && distance < 200) {
              const force = config.magneticStrength / (distance * distance);
              particle.vx += (dx / distance) * force;
              particle.vy += (dy / distance) * force;
            }
            particle.vy += config.gravity * 0.3;
            break;
          case "vortex":
            // Vortex effect around mouse
            const vdx = mousePos.x - particle.x;
            const vdy = mousePos.y - particle.y;
            const vdistance = Math.sqrt(vdx * vdx + vdy * vdy);
            if (vdistance > 0 && vdistance < 150) {
              const vortexForce = 0.5 / vdistance;
              const perpendicularX = -vdy / vdistance;
              const perpendicularY = vdx / vdistance;
              particle.vx += perpendicularX * vortexForce;
              particle.vy += perpendicularY * vortexForce;
            }
            particle.vy += config.gravity * 0.2;
            break;
          default:
            particle.vy += config.gravity;
        }

        particle.life -= 0.02;

        // Draw particle trail
        if (particle.trail.length > 1) {
          ctx.save();
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = particle.size * 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
          for (let i = 1; i < particle.trail.length; i++) {
            const trailPoint = particle.trail[i];
            ctx.globalAlpha = trailPoint.life * 0.3;
            ctx.lineTo(trailPoint.x, trailPoint.y);
          }
          ctx.stroke();
          ctx.restore();
        }

        // Draw particle with different styles
        if (particle.life > 0) {
          ctx.save();
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = particle.color;

          switch (particle.type) {
            case "firework":
              ctx.shadowBlur = 15;
              ctx.shadowColor = particle.color;
              break;
            case "spiral":
              ctx.strokeStyle = particle.color;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
              ctx.stroke();
              ctx.restore();
              return particle.life > 0 && particle.y < canvas.height + 50;
            case "bounce":
              ctx.shadowBlur = 8;
              ctx.shadowColor = particle.color;
              break;
            case "magnetic":
              ctx.shadowBlur = 12;
              ctx.shadowColor = particle.color;
              break;
            case "vortex":
              ctx.shadowBlur = 10;
              ctx.shadowColor = particle.color;
              break;
          }

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        return particle.life > 0 && particle.y < canvas.height + 50;
      });

      // Add new particles based on mode
      if (Math.random() < 0.3) {
        const x = Math.random() * canvas.width;
        const y = -10;
        particlesRef.current.push(createParticle(x, y, false, config.mode));
      }

      // Auto-explode for firework mode
      if (
        config.autoExplode &&
        config.mode === "firework" &&
        Math.random() < 0.02
      ) {
        createExplosion(
          Math.random() * canvas.width,
          Math.random() * canvas.height * 0.5
        );
      }

      // Add particles around mouse when moving
      if (isMouseDown && Math.random() < 0.5) {
        particlesRef.current.push(
          createParticle(
            mousePos.x + (Math.random() - 0.5) * 20,
            mousePos.y + (Math.random() - 0.5) * 20,
            false,
            config.mode
          )
        );
      }
    },
    [config, createParticle, createExplosion]
  );

  const clearParticles = useCallback(() => {
    particlesRef.current = [];
  }, []);

  const updateConfig = useCallback((updates: Partial<ParticleSystemConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  return {
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
  };
};
