"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: string;
  top: string;
  moveY: number;
  moveX: number;
  duration: number;
  delay: number;
  color: string;
  shape: string;
}

export default function BackgroundParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only once on the client to avoid hydration mismatch
    const count = 200; // Denser
    const colors = [
      "bg-primary/80",
      "bg-purple-500/80",
      "bg-pink-500/80",
      "bg-cyan-500/80",
      "bg-blue-500/80",
    ];
    const shapes = ["rounded-full", "rounded-sm"]; // Circles and squares

    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      moveY: Math.random() * 100 - 50,
      moveX: Math.random() * 100 - 50,
      duration: Math.random() * 8 + 5, // Faster: 5-13s
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-2 h-2 ${particle.color} ${particle.shape}`}
          initial={{
            left: particle.left,
            top: particle.top,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: [0, particle.moveY],
            x: [0, particle.moveX],
            opacity: [0.3, 1, 0.3], // Always visible
            scale: [0.5, 1.2, 0.5],
            rotate: particle.shape === "rounded-sm" ? [0, 180, 360] : 0, // Rotate squares
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Glass blur effect overlay */}
      <div className="absolute inset-0 backdrop-blur-xs" />
    </div>
  );
}
