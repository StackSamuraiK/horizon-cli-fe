"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

// ANSI color helpers (chalk-like, but browser-safe)
const c = {
  cyan:    (s: string) => `\x1b[36m${s}\x1b[0m`,
  green:   (s: string) => `\x1b[32m${s}\x1b[0m`,
  yellow:  (s: string) => `\x1b[33m${s}\x1b[0m`,
  red:     (s: string) => `\x1b[31m${s}\x1b[0m`,
  magenta: (s: string) => `\x1b[35m${s}\x1b[0m`,
  blue:    (s: string) => `\x1b[34m${s}\x1b[0m`,
  white:   (s: string) => `\x1b[97m${s}\x1b[0m`,
  gray:    (s: string) => `\x1b[90m${s}\x1b[0m`,
  bold:    (s: string) => `\x1b[1m${s}\x1b[0m`,
  dim:     (s: string) => `\x1b[2m${s}\x1b[0m`,
};

export default function InteractiveTerminal() {
  const terminalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      cursorStyle: "bar",
      fontSize: 13,
      fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
      lineHeight: 1.6,
      letterSpacing: 0.5,
      scrollback: 1000,
      theme: {
        background:    "#0a0a0f",
        foreground:    "#e2e8f0",
        cursor:        "#00ff9f",
        cursorAccent:  "#0a0a0f",
        selectionBackground: "rgba(0,255,159,0.2)",
        black:         "#1a1a2e",
        red:           "#ff6b6b",
        green:         "#00ff9f",
        yellow:        "#ffd93d",
        blue:          "#4dabf7",
        magenta:       "#c77dff",
        cyan:          "#48cae4",
        white:         "#e2e8f0",
        brightBlack:   "#4a5568",
        brightRed:     "#ff8e8e",
        brightGreen:   "#69ffbe",
        brightYellow:  "#ffe066",
        brightBlue:    "#74c0fc",
        brightMagenta: "#da8fff",
        brightCyan:    "#72d9ed",
        brightWhite:   "#f8fafc",
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    window.addEventListener("resize", () => fitAddon.fit());

    // ---------- UTILITIES ----------
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    async function type(text: string, speed = 18) {
      for (const char of text) {
        term.write(char);
        await delay(speed);
      }
    }

    function prompt() {
      term.write(`\r\n${c.green("❯")} `);
    }

    function writeln(text: string) {
      term.writeln(text);
    }

    // ---------- BANNER ----------
    async function writeBanner() {
      writeln("");
      writeln(c.cyan(c.bold("  ██╗  ██╗ ██████╗ ██████╗ ██╗███████╗ ██████╗ ███╗   ██╗")));
      writeln(c.cyan(c.bold("  ██║  ██║██╔═══██╗██╔══██╗██║╚══███╔╝██╔═══██╗████╗  ██║")));
      writeln(c.cyan(c.bold("  ███████║██║   ██║██████╔╝██║  ███╔╝ ██║   ██║██╔██╗ ██║")));
      writeln(c.blue(c.bold("  ██╔══██║██║   ██║██╔══██╗██║ ███╔╝  ██║   ██║██║╚██╗██║")));
      writeln(c.blue(c.bold("  ██║  ██║╚██████╔╝██║  ██║██║███████╗╚██████╔╝██║ ╚████║")));
      writeln(c.dim("  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝"));
      writeln("");
      writeln(`  ${c.gray("v1.0.2")}  ${c.dim("·")}  ${c.magenta("CLI for modern developers")}  ${c.dim("·")}  ${c.gray("cli.horizonlab.in")}`);
      writeln(c.dim("  ─────────────────────────────────────────────────────────────"));
      writeln(`  ${c.yellow("tip")} ${c.dim("→")} type ${c.cyan("help")} to see available commands`);
      writeln("");
    }

    // ---------- DEMO SCRIPT ----------
    async function runDemo() {
      await type(`${c.green("❯")} horizon create my-app`, 30);
      await delay(300);
      term.write("\r\n");
      await delay(300);

      writeln(`  ${c.dim("┌")} ${c.bold("Creating project")} ${c.cyan("my-app")}`);
      await delay(400);
      writeln(`  ${c.dim("│")}`);

      const steps = [
        ["◆", "cyan",    "Scaffolding project structure"],
        ["◆", "green",   "Installing dependencies"],
        ["◆", "magenta", "Configuring TypeScript"],
        ["◆", "yellow",  "Setting up dev server"],
      ];

      for (const [icon, color, label] of steps) {
        writeln(`  ${c.dim("│")}  ${c[color as keyof typeof c](icon)} ${c.dim(label + "...")} `);
        await delay(500 + Math.random() * 400);
        // Overwrite with done state
        writeln(`  ${c.dim("│")}  ${c.green("✔")} ${c.white(label)}`);
        await delay(200);
      }

      writeln(`  ${c.dim("│")}`);
      writeln(`  ${c.dim("└")} ${c.green(c.bold("Done!"))} in ${c.yellow("1.2s")}`);
      writeln("");
      writeln(`  ${c.cyan("◈")} ${c.white("Dev server running at")}  ${c.green(c.bold("http://localhost:3000"))}`);
      writeln(`  ${c.cyan("◈")} ${c.white("Press")} ${c.yellow("Ctrl+C")} ${c.white("to stop")}`);
      writeln("");
    }

    // ---------- HELP ----------
    function showHelp() {
      writeln("");
      writeln(`  ${c.cyan(c.bold("Commands"))}`);
      writeln(`  ${c.dim("─────────────────────────────────")}`);
      writeln(`  ${c.green("horizon")}   ${c.dim("·")}  Run the live demo`);
      writeln(`  ${c.green("help")}      ${c.dim("·")}  Show this message`);
      writeln(`  ${c.green("clear")}     ${c.dim("·")}  Clear the terminal`);
      writeln(`  ${c.green("version")}   ${c.dim("·")}  Show CLI version`);
      writeln(`  ${c.green("about")}     ${c.dim("·")}  About Horizon CLI`);
      writeln("");
    }

    // ---------- COMMAND HANDLER ----------
    let command = "";

    term.onData(async (data) => {
      const code = data.charCodeAt(0);

      if (code === 13) {
        term.write("\r\n");
        await handleCommand(command.trim());
        command = "";
        prompt();
        return;
      }

      if (code === 127) {
        if (command.length > 0) {
          command = command.slice(0, -1);
          term.write("\b \b");
        }
        return;
      }

      command += data;
      term.write(data);
    });

    async function handleCommand(cmd: string) {
      switch (cmd) {
        case "help":
          showHelp();
          break;
        case "clear":
          term.clear();
          break;
        case "horizon":
          await runDemo();
          break;
        case "version":
          writeln(`\r\n  ${c.cyan("horizon")} ${c.white("v1.0.2")}  ${c.dim("(latest)")}`);
          writeln("");
          break;
        case "about":
          writeln("");
          writeln(`  ${c.bold(c.cyan("Horizon CLI"))} — ${c.white("The scaffolding tool for modern web apps.")}`);
          writeln(`  ${c.dim("Built with love by the Horizon team · MIT License")}`);
          writeln("");
          break;
        case "":
          break;
        default:
          writeln(`\r\n  ${c.red("✖")} Command not found: ${c.yellow(cmd)}`);
          writeln(`  ${c.dim("Run")} ${c.cyan("help")} ${c.dim("to see available commands.")}`);
          writeln("");
      }
    }

    // ---------- INIT ----------
    (async () => {
      await writeBanner();
      prompt();
      await delay(1200);
      await runDemo();
      prompt();
    })();

    return () => {
      window.removeEventListener("resize", () => fitAddon.fit());
      term.dispose();
    };
  }, []);

  return (
    <div>
      {/* Glow effect behind terminal */}
      <div style={{ position: "relative", width: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: "-2px",
            borderRadius: "18px",
            background: "linear-gradient(135deg, rgba(0,255,159,0.15), rgba(72,202,228,0.1), rgba(199,125,255,0.1))",
            filter: "blur(1px)",
            zIndex: 0,
          }}
        />

        {/* Terminal window chrome */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)",
            background: "#0a0a0f",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 16px",
              background: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              gap: "8px",
            }}
          >
            {/* Traffic lights */}
            <div style={{ display: "flex", gap: "6px", marginRight: "8px" }}>
              {["#ff5f57", "#febc2e", "#28c840"].map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: color,
                    boxShadow: `0 0 6px ${color}66`,
                  }}
                />
              ))}
            </div>

            {/* Tab */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "3px 12px",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.07)",
                fontSize: "12px",
                color: "rgba(255,255,255,0.6)",
                fontFamily: '"JetBrains Mono", monospace',
              }}
            >
              <span style={{ color: "#00ff9f", fontSize: "10px" }}>●</span>
              horizon — zsh
            </div>

            {/* Spacer + right actions */}
            <div style={{ marginLeft: "auto", display: "flex", gap: "12px", opacity: 0.3 }}>
              {["⊟", "⊡", "✕"].map((icon, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "14px",
                    cursor: "pointer",
                    color: "#fff",
                    fontFamily: "monospace",
                  }}
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalRef}
            style={{
              height: "460px",
              width: "100%",
              padding: "8px 4px",
            }}
          />
        </div>
      </div>
    </div>
  );
}