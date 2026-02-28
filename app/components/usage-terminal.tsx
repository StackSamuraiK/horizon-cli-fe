"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

const c = {
    cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
    green: (s: string) => `\x1b[32m${s}\x1b[0m`,
    yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
    red: (s: string) => `\x1b[31m${s}\x1b[0m`,
    magenta: (s: string) => `\x1b[35m${s}\x1b[0m`,
    blue: (s: string) => `\x1b[34m${s}\x1b[0m`,
    white: (s: string) => `\x1b[97m${s}\x1b[0m`,
    gray: (s: string) => `\x1b[90m${s}\x1b[0m`,
    bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
    dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
};

export default function UsageTerminal() {
    const terminalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!terminalRef.current) return;

        const term = new Terminal({
            cursorBlink: true,
            cursorStyle: "bar",
            fontSize: 14,
            fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
            lineHeight: 1.6,
            letterSpacing: 0.5,
            theme: {
                background: "#0a0a0f",
                foreground: "#e2e8f0",
                cursor: "#00ff9f",
                cursorAccent: "#0a0a0f",
            },
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        term.open(terminalRef.current);
        fitAddon.fit();

        const handleResize = () => fitAddon.fit();
        window.addEventListener("resize", handleResize);

        // --- UTILITIES ---
        const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

        async function type(text: string, speed = 30) {
            for (const char of text) {
                term.write(char);
                await delay(speed + Math.random() * 20);
            }
        }

        function writeln(text: string) {
            term.writeln(text);
        }

        function prompt() {
            term.write(`\r\n${c.green("❯")} `);
        }

        async function writeBanner(color: "white" | "blue") {
            const colorFn = color === "blue" ? c.blue : c.white;
            writeln("");
            writeln(colorFn(c.bold("  ██╗  ██╗ ██████╗ ██████╗ ██╗███████╗ ██████╗ ███╗   ██╗")));
            writeln(colorFn(c.bold("  ██║  ██║██╔═══██╗██╔══██╗██║╚══███╔╝██╔═══██╗████╗  ██║")));
            writeln(colorFn(c.bold("  ███████║██║   ██║██████╔╝██║  ███╔╝ ██║   ██║██╔██╗ ██║")));
            writeln(colorFn(c.bold("  ██╔══██║██║   ██║██╔══██╗██║ ███╔╝  ██║   ██║██║╚██╗██║")));
            writeln(colorFn(c.bold("  ██║  ██║╚██████╔╝██║  ██║██║███████╗╚██████╔╝██║ ╚████║")));
            writeln(c.dim("  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝"));
            writeln("");
        }

        async function runSequence() {
            // STEP 1: Installation
            prompt();
            await delay(1000);
            await type("npm i @kshitiz-2002/horizon-cli");
            await delay(400);
            term.write("\r\n");
            await writeBanner("white");
            writeln(`  ${c.green("✔")} Horizon CLI installed globally.`);

            // STEP 2: Auth
            prompt();
            await delay(1200);
            await type("horizon auth");
            await delay(400);
            term.write("\r\n\r\n");
            await type(`  ${c.cyan("? ")} ${c.bold("Enter your API Key:")} `);
            await delay(500);
            // Simulate typing a hidden api key
            for (let i = 0; i < 24; i++) {
                term.write("*");
                await delay(40 + Math.random() * 30);
            }
            await delay(400);
            term.write("\r\n");
            writeln(`  ${c.green("✔")} Authentication successful! API Key stored securely.`);

            // STEP 3: Using horizon
            prompt();
            await delay(1500);
            await type("horizon");
            await delay(400);
            term.write("\r\n");
            await writeBanner("blue");

            // STEP 4: Chatting with LLM
            await delay(500);
            writeln(`  ${c.dim("Hint: Type 'exit' to quit the interactive session")}`);
            term.write(`\r\n${c.cyan("horizon")} ${c.dim("❯")} `);
            await delay(1000);
            await type("create a react project with tailwind CSS in it", 40);
            await delay(600);
            term.write("\r\n\r\n");

            writeln(`  ${c.magenta("Horizon AI ◈")} Thinking...`);
            await delay(1500);

            writeln(`  ${c.dim("┌")} ${c.bold("Planning execution for: React + Tailwind CSS")}`);
            await delay(400);
            writeln(`  ${c.dim("│")}`);

            const steps = [
                ["◆", "blue", "Initializing React app using Vite"],
                ["◆", "cyan", "Installing Tailwind CSS dependencies"],
                ["◆", "white", "Generating tailwind.config.js"],
                ["◆", "green", "Injecting directives into index.css"],
            ];

            for (const [icon, color, label] of steps) {
                writeln(`  ${c.dim("│")}  ${c[color as keyof typeof c](icon)} ${c.dim(label + "...")} `);
                await delay(600 + Math.random() * 400);
                writeln(`  ${c.dim("│")}  ${c.green("✔")} ${c.white(label)}`);
                await delay(200);
            }
            writeln(`  ${c.dim("│")}`);
            writeln(`  ${c.dim("└")} ${c.green(c.bold("Task Complete!"))}`);
            term.write(`\r\n${c.cyan("horizon")} ${c.dim("❯")} `);
        }

        // Set up the intersection observer to wait for scroll
        let animationStarted = false;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !animationStarted) {
                    animationStarted = true;
                    runSequence();
                    observer.disconnect(); // Only run once
                }
            },
            { threshold: 0.3 } // Trigger when 30% of the terminal is visible
        );

        if (terminalRef.current) {
            observer.observe(terminalRef.current);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            observer.disconnect();
            term.dispose();
        };
    }, []);

    return (
        <div className="w-full relative shadow-2xl mx-auto">
            {/* Glow effect behind terminal */}
            <div
                className="absolute inset-[-2px] rounded-[18px] blur-[1px] -z-10"
                style={{
                    background: "linear-gradient(135deg, rgba(0,255,159,0.15), rgba(72,202,228,0.1), rgba(199,125,255,0.1))",
                }}
            />

            <div className="w-full relative rounded-xl overflow-hidden border border-neutral-800 bg-[#0a0a0f] z-10">
                {/* Title bar */}
                <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10 gap-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_#ff5f5766]" />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_#febc2e66]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_#28c84066]" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 ml-2 text-xs text-white/60 font-mono">
                        <span className="text-[#00ff9f] text-[10px]">●</span>
                        horizon — agent
                    </div>
                </div>

                {/* Terminal body */}
                <div
                    ref={terminalRef}
                    className="w-full p-4 h-[700px]"
                />
            </div>
        </div>
    );
}
