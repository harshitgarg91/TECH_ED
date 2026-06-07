import React from "react";
import { Mail, Network, Rss, ArrowRight } from "lucide-react";

interface FooterProps {
  onNavigate: (path: string, e: React.MouseEvent) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleCategoryClick = (category: string, e: React.MouseEvent) => {
    onNavigate(`/blog?category=${encodeURIComponent(category)}`, e);
  };

  return (
    <footer id="tech-ed-footer" className="bg-[#050505] border-t border-white/10 py-16 w-full relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Intro Column */}
          <div className="space-y-4">
            <a 
              href="/" 
              onClick={(e) => onNavigate("/", e)}
              className="text-2xl font-bold font-sans tracking-tighter text-white hover:text-blue-500 transition-all flex items-center gap-2"
              rel="dofollow"
            >
              <div className="w-5 h-5 bg-blue-600 rounded-sm rotate-45 shrink-0"></div>
              TECH_ED
            </a>
            <p className="text-sm text-zinc-400 max-w-sm font-sans leading-relaxed">
              Decoding the complex architectures, distributed algorithms, zero-trust cloud architectures, and market indicators shaping the global digital economy.
            </p>
          </div>

          {/* Filtering Categories Column */}
          <div>
            <h5 className="font-sans font-bold text-white text-sm uppercase tracking-wider mb-6">
              Categories
            </h5>
            <ul className="space-y-3 text-sm text-zinc-400">
              {["AI", "Cybersecurity", "Infrastructure", "Engineering", "DevOps", "Data"].map((cat) => (
                <li key={cat}>
                  <a
                    href={`/blog?category=${encodeURIComponent(cat)}`}
                    onClick={(e) => handleCategoryClick(cat, e)}
                    className="hover:text-blue-400 transition-colors inline-block"
                    rel="dofollow"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Hub Profiles Column */}
          <div>
            <h5 className="font-sans font-bold text-white text-sm uppercase tracking-wider mb-6">
              Company
            </h5>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <a
                  href="/about"
                  onClick={(e) => onNavigate("/about", e)}
                  className="hover:text-blue-400 transition-colors inline-block"
                  rel="dofollow"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => onNavigate("/about", e)}
                  className="hover:text-blue-400 transition-colors inline-block pb-0.5"
                  rel="dofollow"
                >
                  Lead Architect
                </a>
              </li>
              <li>
                <a
                  href="mailto:harshit.24mcan0224@jecrcu.edu.in"
                  className="hover:text-blue-400 transition-colors inline-block"
                  rel="dofollow"
                >
                  Contact Outreach
                </a>
              </li>
            </ul>
          </div>

          {/* Network Connection Signals Column */}
          <div>
            <h5 className="font-sans font-bold text-white text-sm uppercase tracking-wider mb-6">
              Connect Channels
            </h5>
            <div className="flex gap-4">
              <a
                href="mailto:harshit.24mcan0224@jecrcu.edu.in"
                title="Send direct email"
                className="w-11 h-11 rounded-lg bg-[#080808] border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30 transition-all cursor-pointer"
                rel="dofollow"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="/about"
                onClick={(e) => onNavigate("/about", e)}
                title="Explore competencies"
                className="w-11 h-11 rounded-lg bg-[#080808] border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30 transition-all cursor-pointer"
                rel="dofollow"
              >
                <Network className="h-5 w-5" />
              </a>
              <a
                href="/sitemap.xml"
                title="Crawlers Site index map"
                className="w-11 h-11 rounded-lg bg-[#080808] border border-white/5 flex items-center justify-center text-zinc-400 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30 transition-all cursor-pointer"
                target="_blank"
                rel="dofollow"
              >
                <Rss className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-zinc-500 mt-4 leading-relaxed font-sans">
              Connect to our global indexes to sync semantic search payloads across neural hubs.
            </p>
          </div>
        </div>

        {/* Legal & Attribution Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-sans">
          <p>© {currentYear} TECH_ED Editorial. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white transition-all cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-all cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-all cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
