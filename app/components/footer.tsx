"use client";

import Link from "next/link";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="relative w-full overflow-hidden bg-[#050505] text-white pt-20 pb-10 mt-32 border-t border-neutral-900">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
                    {/* Brand & Description */}
                    <div className="md:col-span-5 flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-md bg-white text-black flex items-center justify-center font-bold text-xl">
                                H
                            </div>
                            <span className="text-xl font-bold">Horizon</span>
                        </div>
                        <p className="text-neutral-400 text-sm max-w-sm leading-relaxed">
                            Horizon empowers developers to transform complex ideas into robust applications instantly — making scaffolding easier to build, understand, and scale.
                        </p>
                        <div className="flex items-center gap-5 text-neutral-400 mt-2">
                            <Link href="#" className="hover:text-white transition-colors"><Twitter size={20} /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></Link>
                            <Link href="#" className="hover:text-white transition-colors"><Github size={20} /></Link>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-white">Product</h3>
                            <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Features</Link>
                            <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Pricing</Link>
                            <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Integrations</Link>
                            <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Changelog</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-white">Resources</h3>
                            <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Documentation</Link>
                            <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Tutorials</Link>
                            <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Blog</Link>
                            <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Support</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-white">Company</h3>
                            <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">About</Link>
                            <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Careers</Link>
                            <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Contact</Link>
                            <Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Partners</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-neutral-500">
                        © 2026 Horizon. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-neutral-500">
                        <Link href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">Cookies Settings</Link>
                    </div>
                </div>

            </div>

            {/* Footer "HORIZON" text spanning full screen width */}
            <div className="w-screen flex items-end justify-center pointer-events-none select-none overflow-hidden mt-12 mb-[-10%] ml-[calc(-50vw+50%)]">
                <span
                    className="text-[22vw] font-black leading-none tracking-tighter text-neutral-800"
                    style={{
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
                    }}
                >
                    HORIZON
                </span>
            </div>
        </footer>
    );
};
