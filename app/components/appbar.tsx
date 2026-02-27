'use client'

export const AppBar = () => {
    return (
        <div
            className="h-16 flex items-center px-6"
            style={{
                background: "rgba(10, 10, 10, 0.6)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
            }}
        >
            {/* Brand / Logo */}
            <div className="flex items-center shrink-0">
                <div
                    className="rounded-full h-10 w-10 flex items-center justify-center"
                    style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "inset 0 0 8px rgba(255,255,255,0.05)",
                    }}
                >
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(255,255,255,0.85)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                </div>
                <span
                    className="ml-3 font-bold text-lg tracking-widest uppercase"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                >
                    Horizon CLI
                </span>
            </div>

            {/* Nav links */}
            <ul className="flex items-center space-x-1 ml-auto">
                {["Home", "About", "Services", "Blog", "Contact"].map((item) => (
                    <li
                        key={item}
                        className="px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200"
                        style={{
                            color: "rgba(255,255,255,0.65)",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLLIElement).style.background =
                                "rgba(255,255,255,0.1)";
                            (e.currentTarget as HTMLLIElement).style.color =
                                "rgba(255,255,255,1)";
                            (e.currentTarget as HTMLLIElement).style.border =
                                "1px solid rgba(255,255,255,0.15)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLLIElement).style.background =
                                "transparent";
                            (e.currentTarget as HTMLLIElement).style.color =
                                "rgba(255,255,255,0.65)";
                            (e.currentTarget as HTMLLIElement).style.border =
                                "1px solid transparent";
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};