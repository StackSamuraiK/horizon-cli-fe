"use client";

import dynamic from "next/dynamic";

const UsageTerminal = dynamic(() => import("./usage-terminal"), { ssr: false });

export const Usage = () => {
    return (
        <div id="how-to-use-horizon-cli" className="w-full max-w-7xl mx-auto px-6 py-24 flex flex-col items-center">
            {/* Section Header */}
            <div className="text-center mb-18 space-y-4">
                <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500 pb-2">
                    Deploy the Agent in your Terminal
                </h2>
                <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                    Setup is instant. Give it an API key, chat naturally, and watch it scaffold your entire project right before your eyes.
                </p>
            </div>

            {/* Terminal Window */}
            <UsageTerminal />
        </div>
    );
};