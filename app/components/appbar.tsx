"use client"

import { useState, useEffect } from 'react';
import { X, Copy, Check } from 'lucide-react';

export const AppBar = () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const handleOpenPricing = () => setActiveModal('pricing');
        const handleOpenModal = (e: Event) => {
            const customEvent = e as CustomEvent<{ type: string }>;
            setActiveModal(customEvent.detail?.type || 'pricing');
        };

        window.addEventListener('openPricingModal', handleOpenPricing);
        window.addEventListener('openModal', handleOpenModal);

        return () => {
            window.removeEventListener('openPricingModal', handleOpenPricing);
            window.removeEventListener('openModal', handleOpenModal);
        };
    }, []);

    const handleCopy = async () => {
        await navigator.clipboard.writeText("npx create-horizon-app@latest");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleScroll = (id: string) => {
        if (id === 'Pricing') {
            setActiveModal('pricing');
            return;
        }
        const element = document.getElementById(id.toLowerCase().replace(/\s+/g, '-'));
        if (element) {
            const yOffset = -80; // offset for sticky header
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        } else if (id === 'Home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            <div
                className="h-16 flex items-center px-6 sticky top-0 z-40"
                style={{
                    background: "rgba(10, 10, 10, 0.6)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
                }}
            >
                {/* Brand / Logo */}
                <div className="flex items-center shrink-0 gap-3">
                    <div className="w-8 h-8 rounded-md bg-white text-black flex items-center justify-center font-bold text-xl">
                        H
                    </div>
                    <span
                        className="font-bold text-lg tracking-widest uppercase cursor-pointer"
                        style={{ color: "rgba(255,255,255,0.9)" }}
                        onClick={() => handleScroll('Home')}
                    >
                        Horizon
                    </span>
                </div>

                {/* Nav links */}
                <ul className="flex items-center space-x-1 ml-auto hidden md:flex">
                    {["Home", "How to use Horizon-CLI", "Pricing", "Contact"].map((item) => (
                        <li
                            key={item}
                            onClick={() => handleScroll(item)}
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

            {/* Universal Modal */}
            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div
                        className="relative w-full max-w-sm p-8 rounded-xl bg-[#0a0a0f] border border-stone-800/50 shadow-2xl"
                        style={{ fontFamily: "var(--font-inter-sans, Inter, sans-serif)" }}
                    >
                        <button
                            onClick={() => setActiveModal(null)}
                            className="absolute top-4 right-4 text-stone-500 hover:text-stone-300 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex flex-col items-center text-center gap-4 mt-2">
                            {/* Logo */}
                            <div className="w-8 h-8 rounded-md bg-white text-black flex items-center justify-center font-bold text-xl mb-1">
                                H
                            </div>

                            {activeModal === 'pricing' && (
                                <>
                                    <h3 className="text-lg font-semibold text-stone-100 tracking-tight">Thank you for liking Horizon!</h3>
                                    <p className="text-stone-400 leading-relaxed text-sm">
                                        Currently we don't charge a single dime to you, as you will be using your own API key.
                                    </p>
                                    <p className="text-stone-500 text-sm mt-2">
                                        But soon we'll be introducing pricing. Till then keep using Horizon.
                                    </p>
                                </>
                            )}

                            {activeModal === 'docs' && (
                                <>
                                    <h3 className="text-lg font-semibold text-stone-100 tracking-tight">Documentation</h3>
                                    <p className="text-stone-400 leading-relaxed text-sm">
                                        We are actively working on it. Thanks for keeping patience!
                                    </p>
                                </>
                            )}

                            {activeModal === 'integrations' && (
                                <>
                                    <h3 className="text-lg font-semibold text-stone-100 tracking-tight">Integrations</h3>
                                    <p className="text-stone-400 leading-relaxed text-sm">
                                        Copy this install command to integrate Horizon into your existing workflow:
                                    </p>

                                    <div className="w-full flex items-center justify-between mt-2 bg-stone-900 border border-stone-800 rounded-lg p-3">
                                        <code className="text-stone-300 text-sm font-mono">
                                            npx create-horizon-app@latest
                                        </code>
                                        <button
                                            onClick={handleCopy}
                                            className="text-stone-400 hover:text-white transition-colors"
                                        >
                                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </>
                            )}

                            {activeModal === 'changelog' && (
                                <>
                                    <h3 className="text-lg font-semibold text-stone-100 tracking-tight">Changelog v1.0</h3>
                                    <p className="text-stone-400 leading-relaxed text-sm">
                                        This is the first stable version of Horizon CLI. Keep enjoying it! Let's build something amazing.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

