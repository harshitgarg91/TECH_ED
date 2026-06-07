import React, { useState } from "react";
import { Search, Menu, X, ArrowRight, Rss } from "lucide-react";

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string, e?: any) => void;
  onOpenSubscribe: () => void;
}

export default function Navbar({ currentPath, onNavigate, onOpenSubscribe }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Blog", path: "/blog" },
    { label: "About", path: "/about" },
  ];

  return (
    <header id="tech-ed-navbar" className="fixed top-0 w-full bg-[#050505]/80 backdrop-blur-md z-50 border-b border-white/10">
      <div className="flex justify-between items-center h-20 px-6 md:px-10 max-w-7xl mx-auto">
        {/* Logo */}
        <a 
          href="/" 
          onClick={(e) => onNavigate("/", e)}
          className="font-sans text-xl font-bold tracking-tighter text-white flex items-center gap-2 hover:opacity-90 transition-all"
          rel="dofollow"
        >
          <div className="w-5 h-5 bg-blue-600 rounded-sm rotate-45 shrink-0"></div>
          TECH_ED
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
          {navigationItems.map((item) => {
            const isActive = currentPath === item.path || (item.path !== "/" && currentPath.startsWith(item.path));
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => onNavigate(item.path, e)}
                className={`transition-colors py-1 ${
                  isActive 
                    ? "text-white font-semibold border-b-2 border-blue-500" 
                    : "text-zinc-400 hover:text-white"
                }`}
                rel="dofollow"
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Utility Icons & Button */}
        <div className="flex items-center gap-4">
          {/* Elegant Search Container */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-900 transition-all"
              aria-label="Toggle Search"
            >
              <Search className="h-5 w-5" />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-12 bg-[#080808] border border-white/10 rounded-lg p-2 flex gap-2 w-64 shadow-2xl animate-fade-in z-50">
                <input
                  type="text"
                  placeholder="Search technical reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      onNavigate(`/blog?search=${encodeURIComponent(searchQuery)}`, e as any);
                      setSearchOpen(false);
                      setSearchQuery("");
                    }
                  }}
                  className="bg-[#020202] text-white text-xs px-3 py-1.5 rounded-md flex-1 outline-none border border-white/10 focus:border-blue-500"
                />
              </div>
            )}
          </div>

          <button
            onClick={onOpenSubscribe}
            className="hidden md:inline-flex px-4 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            SUBSCRIBE
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-zinc-900 rounded-lg transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050505] border-b border-white/10 px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col gap-4 font-sans text-lg">
            {navigationItems.map((item) => {
              const isActive = currentPath === item.path || (item.path !== "/" && currentPath.startsWith(item.path));
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    onNavigate(item.path, e);
                  }}
                  className={`py-1 ${
                    isActive ? "text-white font-semibold text-xl" : "text-zinc-400"
                  }`}
                  rel="dofollow"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSubscribe();
              }}
              className="bg-white hover:bg-zinc-200 text-black text-center w-full py-3 rounded-full font-bold transition-all hover:opacity-90 font-sans text-sm"
            >
              Subscribe Newsletter
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
