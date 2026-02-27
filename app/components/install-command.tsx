"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function InstallCommand() {
  const command = "npm i @kshitiz-2002/horizon-cli";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-[#0b0b0b] text-white rounded-xl px-5 py-4 flex items-center justify-between border border-neutral-800 max-w-xl">
      
      {/* command text */}
      <div className="flex items-center gap-3 font-mono text-sm">
        <span className="text-neutral-400">{">"}</span>
        <span>{command}</span>
      </div>

      {/* copy button */}
      <button
        onClick={handleCopy}
        className="p-2 rounded-md hover:bg-neutral-800 transition"
      >
        {copied ? (
          <Check size={18} className="text-green-400" />
        ) : (
          <Copy size={18} className="text-neutral-300" />
        )}
      </button>
    </div>
  );
}