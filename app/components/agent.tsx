"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Cpu, Workflow, FileSearch, Terminal, Zap, GitBranch } from "lucide-react";

interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
}

const capabilities: Capability[] = [
  {
    icon: Cpu,
    title: "Autonomous Coding",
    description:
      "Plans, writes, and refactors code across large codebases with minimal supervision.",
  },
  {
    icon: Workflow,
    title: "Multi-Agent Workflows",
    description:
      "Coordinates parallel specialist agents to complete tasks faster and more reliably.",
  },
  {
    icon: FileSearch,
    title: "Codebase Understanding",
    description:
      "Instantly navigates and comprehends entire codebases to provide context-aware assistance.",
  },
  {
    icon: Terminal,
    title: "Terminal Automation",
    description:
      "Executes commands, manages processes, and automates workflows directly in your shell.",
  },
  {
    icon: Zap,
    title: "Intelligent Refactoring",
    description:
      "Safely restructures code with deep understanding of dependencies and patterns.",
  },
  {
    icon: GitBranch,
    title: "Context Awareness",
    description:
      "Maintains session memory across conversations for coherent, continuous assistance.",
  },
];

type WizardSize = "lg" | "md" | "sm";

interface WizardConfig {
  size: WizardSize;
  code: string;
  left: number;
  top: number;
  floatDelay: number;
  floatDuration: number;
  depth: number;
}

const wizards: WizardConfig[] = [
  { size: "lg", code: "{  }", left: 50, top: 46, floatDelay: 0, floatDuration: 3.5, depth: 1 },
  { size: "md", code: "</>", left: 18, top: 78, floatDelay: 0.6, floatDuration: 4.2, depth: 0.6 },
  { size: "md", code: "=>", left: 82, top: 78, floatDelay: 1.2, floatDuration: 4.2, depth: 0.6 },
  { size: "sm", code: "/*", left: 24, top: 18, floatDelay: 0.3, floatDuration: 3.8, depth: 0.4 },
  { size: "sm", code: "*/", left: 76, top: 18, floatDelay: 0.9, floatDuration: 3.8, depth: 0.4 },
];

interface WizardFigureProps {
  size: WizardSize;
  code: string;
  floatDelay: number;
  floatDuration: number;
  depth: number;
  visible: boolean;
}

const WizardFigure = ({
  size,
  code,
  floatDelay,
  floatDuration,
  depth,
  visible,
}: WizardFigureProps) => {
  const isLg = size === "lg";
  const isMd = size === "md";

  const hatHeight = isLg ? 68 : isMd ? 46 : 34;
  const hatWidth = isLg ? 50 : isMd ? 36 : 26;
  const headSize = isLg ? 30 : isMd ? 22 : 16;
  const robeWidth = isLg ? 70 : isMd ? 48 : 36;
  const robeHeight = isLg ? 84 : isMd ? 58 : 42;

  const baseOpacity = isLg ? 0.92 : isMd ? 0.65 : 0.5;
  const glowIntensity = isLg ? "0.4" : "0.15";

  return (
    <div
      className="absolute flex flex-col items-center pointer-events-none"
      style={{
        animation: visible
          ? `wizard-float-${size} ${floatDuration}s ease-in-out ${floatDelay}s infinite`
          : "none",
      }}
    >
      {/* Glow behind wizard */}
      <div
        className="absolute rounded-full"
        style={{
          width: robeWidth * 2,
          height: robeHeight * 1.5,
          top: "30%",
          background: `radial-gradient(ellipse, rgba(255,255,255,${glowIntensity}) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Hat */}
      <div
        style={{
          width: hatWidth,
          height: hatHeight,
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          background: `rgba(255,255,255,${baseOpacity * 0.85})`,
          borderTopLeftRadius: hatWidth * 0.15,
          borderTopRightRadius: hatWidth * 0.15,
        }}
      />

      {/* Hat brim */}
      <div
        style={{
          width: hatWidth * 1.4,
          height: 3,
          borderRadius: 2,
          background: `rgba(255,255,255,${baseOpacity * 0.75})`,
          marginTop: -1,
        }}
      />

      {/* Head */}
      <div
        style={{
          width: headSize,
          height: headSize,
          borderRadius: "50%",
          background: `rgba(255,255,255,${baseOpacity * 0.95})`,
          marginTop: -2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <span
          style={{
            fontSize: headSize * 0.3,
            color: "#0a0a0a",
            opacity: depth * 0.9,
          }}
        >
          ◈
        </span>
        <span
          style={{
            fontSize: headSize * 0.3,
            color: "#0a0a0a",
            opacity: depth * 0.9,
          }}
        >
          ◈
        </span>
      </div>

      {/* Robe */}
      <div
        style={{
          width: robeWidth,
          height: robeHeight,
          clipPath: "polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%)",
          background: `linear-gradient(to bottom, rgba(255,255,255,${baseOpacity * 0.65}) 0%, rgba(255,255,255,${baseOpacity * 0.3}) 100%)`,
          marginTop: -3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: isLg ? 16 : isMd ? 12 : 10,
            color: `rgba(255,255,255,${baseOpacity * 0.9})`,
            fontWeight: isLg ? 700 : 500,
            letterSpacing: "0.05em",
            marginTop: -robeHeight * 0.08,
          }}
        >
          {code}
        </span>
      </div>
    </div>
  );
};

export const AgentSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="meet-horizon"
      className="w-full max-w-7xl mx-auto px-6 py-24"
    >
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        {/* Left: Coding Wizards */}
        <div className="w-full">
          <div className="relative w-full max-w-[420px] mx-auto aspect-[4/5]">
            {/* Background code particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
              {["{", "}", "<", "/", ">", "$", "#", "!", "?", "~", "&", "%"].map(
                (char, i) => (
                  <span
                    key={i}
                    className="absolute font-mono"
                    style={{
                      fontSize: `${8 + (i % 3) * 4}px`,
                      color: `rgba(255,255,255,${0.06 + (i % 4) * 0.03})`,
                      left: `${8 + (i * 17) % 85}%`,
                      top: `${5 + (i * 23) % 90}%`,
                      transform: `rotate(${(i * 37) % 360}deg)`,
                    }}
                  >
                    {char}
                  </span>
                )
              )}
            </div>

            {/* Wizard figures */}
            {wizards.map((w, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${w.left}%`,
                  top: `${w.top}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <WizardFigure
                  size={w.size}
                  code={w.code}
                  floatDelay={w.floatDelay}
                  floatDuration={w.floatDuration}
                  depth={w.depth}
                  visible={visible}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Capabilities */}
        <div className="w-full">
          <div className="mb-10 md:mb-12 space-y-3">
            <span
              className="inline-block text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "rgba(0, 255, 159, 0.7)" }}
            >
              Your AI Agent
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500 pb-1">
              Meet Horizon
            </h2>
            <p className="text-base md:text-lg text-neutral-400 max-w-xl leading-relaxed">
              A terminal-native AI agent that understands your codebase, runs
              commands, and ships features — all from your command line.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="group rounded-xl p-4 md:p-5 bg-gradient-to-br from-stone-900/60 to-stone-950/60 border border-stone-800/50 hover:border-stone-700/60 transition-all duration-300"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.5s ease, transform 0.5s ease`,
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-stone-800/60 border border-stone-700/40 flex items-center justify-center group-hover:border-[#00ff9f]/30 group-hover:bg-stone-800/80 transition-colors duration-300">
                      <Icon
                        size={16}
                        className="text-stone-400 group-hover:text-[#00ff9f] transition-colors duration-300"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-stone-200 group-hover:text-white transition-colors duration-300">
                        {cap.title}
                      </h3>
                      <p className="text-xs text-stone-500 leading-relaxed mt-1 group-hover:text-stone-400 transition-colors duration-300">
                        {cap.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wizard-float-lg {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes wizard-float-md {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes wizard-float-sm {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </section>
  );
};
