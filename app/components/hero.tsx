"use client";

import InstallCommand from "./install-command";
import dynamic from "next/dynamic";
import { Wrench, Zap, Rocket } from "lucide-react";

const InteractiveTerminal = dynamic(() => import("./terminal"), { ssr: false });

export const Hero = () => {
    return (
        <div id="home" className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-0 overflow-x-hidden">
            <div className="flex flex-col gap-4 justify-start items-start p-6 pt-32 lg:p-10 lg:pt-56 relative w-full">
                {/* Planetary Horizon Glow */}
                <div
                    className="absolute -top-[700px] -left-[350px] w-[900px] h-[900px] rounded-full pointer-events-none -z-10"
                    style={{
                        background: '#000',
                        boxShadow: '0 40px 150px 40px rgba(0, 120, 255, 0.5), inset 0 -10px 40px 5px rgba(0, 150, 255, 0.5)',
                        borderBottom: '3px solid rgba(255,255,255,0.9)',
                    }}
                />

                <h1 className="text-5xl lg:text-6xl font-extrabold relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-white via-neutral-200 to-neutral-500 leading-tight">Horizon CLI</h1>
                <p className="text-neutral-400 relative z-10 text-base md:text-lg font-medium tracking-wide leading-relaxed max-w-md mt-2">
                    An intelligent AI agent that lives directly in your terminal, ready to scaffold, automate, and deploy your next big idea.
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-3 mt-4 lg:mt-6 relative z-10 w-full">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800/80 shadow-sm w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-300 drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]"></span>
                        <span className="text-stone-300 font-medium text-sm">Build</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800/80 shadow-sm w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-300 drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]"></span>
                        <span className="text-stone-300 font-medium text-sm">Automate</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800/80 shadow-sm w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-300 drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]"></span>
                        <span className="text-stone-300 font-medium text-sm">Ship fast</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 px-6 lg:px-0 w-full">
                <div className="mb-2 lg:mt-8 w-full">
                    <InstallCommand />
                </div>
                <div className="lg:mr-4 w-full overflow-hidden">
                    <InteractiveTerminal />
                </div>
            </div>
        </div>
    );
};