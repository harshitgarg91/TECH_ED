import React, { useState, useEffect } from "react";
import { blogs } from "./data/blogs";
import { seoConfig } from "./config/seo";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BlogCard from "./components/BlogCard";
import RelatedArticles from "./components/RelatedArticles";
import { 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  FileText, 
  Rss, 
  Mail, 
  CheckCircle, 
  ArrowRight, 
  ChevronRight, 
  X,
  Search,
  MessageSquare,
  Shield,
  TrendingUp,
  Award,
  Plus,
  Send,
  SlidersHorizontal,
  BookmarkCheck,
  Check
} from "lucide-react";

export default function App() {
  const [path, setPath] = useState(() => {
    return typeof window !== "undefined" ? window.location.pathname : "/";
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Newsletter Modal State
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscribedStatus, setSubscribedStatus] = useState(false);

  // Consultation booking local states
  const [consultName, setConsultName] = useState("");
  const [consultEmail, setConsultEmail] = useState("");
  const [consultFocus, setConsultFocus] = useState("AI Integration");
  const [consultMessage, setConsultMessage] = useState("");
  const [consultBooked, setConsultBooked] = useState(false);

  // Social share feedback bubbles
  const [copiedLink, setCopiedLink] = useState(false);

  // Listen to popstate event (navigating backward/forward)
  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
      syncUrlParams();
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Synchronize dynamic parameters (like search and category) from URL
  const syncUrlParams = () => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search") || "";
    const category = params.get("category") || "All";
    setSearchQuery(search);
    setSelectedCategory(category);
  };

  useEffect(() => {
    syncUrlParams();
  }, [path]);

  // Command to transition internally
  const handleNavigate = (to: string, e?: any) => {
    if (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return; // let standard middle-clicks pass
      e.preventDefault();
    }
    window.history.pushState({}, "", to);
    setPath(window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Triggering share action overlays
  const triggerCopyLink = (blogTitle: string) => {
    const absoluteLink = window.location.href;
    navigator.clipboard.writeText(absoluteLink).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }).catch(err => {
      console.error("Could not copy:", err);
    });
  };

  // Find active blog based on slug match
  const getActiveBlog = () => {
    if (path.startsWith("/blog/")) {
      const slug = path.split("/blog/")[1]?.split("?")[0];
      return blogs.find((b) => b.slug === slug);
    }
    return null;
  };

  const activeBlog = getActiveBlog();

  // Categories list
  const categories = ["All", "AI", "Cybersecurity", "Infrastructure", "Engineering", "DevOps", "Data"];

  // Filter logic for Blog List page
  const filteredBlogs = blogs.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesQuery = 
      post.title.toLowerCase().includes(query) || 
      post.description.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  // Pick the designated featured blog (the main system analysis)
  const featuredBlog = blogs.find((b) => b.featured) || blogs[0];

  // Pick 3 latest dispatches for the home page list
  const latestDispatches = blogs
    .filter((b) => b.slug !== featuredBlog.slug)
    .slice(0, 3);

  // Handle subscribe action
  const handleSubscribeSubmit = (email: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribedStatus(true);
    setTimeout(() => {
      setSubscribeModalOpen(false);
      setSubscribedStatus(false);
      setSubscriberEmail("");
      alert("Successfully subscribed! Welcome to the TECH_ED briefings.");
    }, 1500);
  };

  // Handle consult appointment
  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName || !consultEmail) return;
    setConsultBooked(true);
    setTimeout(() => {
      setConsultBooked(false);
      setConsultName("");
      setConsultEmail("");
      setConsultMessage("");
      alert("Consultation scheduled successfully! Dr. Vance's office will reach out within 24 hours.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-[#e5e5e5] flex flex-col justify-between font-sans selection:bg-blue-500/20 selection:text-blue-400">
      
      {/* Global Navbar */}
      <Navbar 
        currentPath={path} 
        onNavigate={handleNavigate} 
        onOpenSubscribe={() => setSubscribeModalOpen(true)} 
      />

      {/* Main viewport Container */}
      <main className="flex-grow pt-20">
        
        {/* HOMEPAGE VIEW */}
        {path === "/" && (
          <div className="animate-fade-in">
            {/* Hero Section Banner */}
            <section className="relative overflow-hidden py-24 md:py-32 border-b border-white/5 bg-[#020202]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
              
              <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 mb-6 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Lighthouse Score: 100 / SEO System Active
                </div>
                
                <h1 className="font-sans text-5xl md:text-[84px] leading-[0.85] font-bold text-white tracking-tighter mb-8 max-w-4xl">
                  FUTURISTIC<br/><span className="text-zinc-600 italic">LOGIC.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-zinc-400 max-w-xl font-sans leading-relaxed mb-10">
                  Superior analysis for the modern builder. We decode the complex algorithms, distributed networks, and strategic mechanics shaping our tomorrow.
                </p>
                
                <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                  <button
                    onClick={(e) => handleNavigate("/blog", e)}
                    className="px-6 py-3.5 bg-white hover:bg-zinc-200 text-black text-xs font-bold rounded-full transition-all transform hover:scale-[1.01] active:scale-95 shadow-lg shadow-white/5 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                  >
                    Explore Dispatches
                    <ArrowRight className="h-4 w-4 text-black" />
                  </button>
                  <button
                    onClick={(e) => handleNavigate(`/blog/${featuredBlog.slug}`, e)}
                    className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white text-xs font-bold rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                  >
                    Read Latest Release
                  </button>
                </div>
              </div>
            </section>

            {/* Bento Grid Featured Layout Section */}
            <section className="bg-[#050505] py-16 border-b border-white/5">
              <div className="max-w-7xl mx-auto px-6 md:px-10">
                <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-2 font-mono">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  FEATURES INSIGHTS
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column (Wide Featured Blog Panel) */}
                  <div 
                    onClick={(e) => handleNavigate(`/blog/${featuredBlog.slug}`, e)}
                    className="lg:col-span-2 group relative cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-blue-600/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                    <div className="relative bg-zinc-900/90 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between h-full shadow-2xl">
                      <div className="relative aspect-video lg:aspect-[16/9] overflow-hidden bg-zinc-950">
                        <img 
                          src={featuredBlog.featuredImage} 
                          alt={featuredBlog.title} 
                          loading="eager"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/85 via-[#020202]/30 to-transparent"></div>
                        <span className="absolute top-4 left-4 text-[10px] uppercase font-mono font-bold tracking-widest bg-blue-600 text-white px-3.5 py-1.5 rounded-md shadow-lg">
                          {featuredBlog.category}
                        </span>
                      </div>

                      <div className="p-8 space-y-4">
                        <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono">
                          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{featuredBlog.publishDate}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featuredBlog.readTime}</span>
                        </div>
                        <h3 className="font-sans font-bold text-2xl md:text-3.5xl text-white group-hover:text-blue-400 transition-colors leading-tight">
                          <a 
                            href={`/blog/${featuredBlog.slug}`} 
                            onClick={(e) => e.preventDefault()}
                            className="outline-none"
                            rel="dofollow"
                          >
                            {featuredBlog.title}
                          </a>
                        </h3>
                        <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-sans line-clamp-3">
                          {featuredBlog.description}
                        </p>
                        
                        <div className="pt-6 border-t border-white/5 flex justify-between items-center text-sm font-sans">
                          <span className="text-zinc-400 font-medium inline-flex items-center gap-2">
                            <span className="h-8 w-8 rounded-sm bg-zinc-800 border border-white/10 flex items-center justify-center font-bold text-blue-400 text-xs">
                              {featuredBlog.author.split(" ").map(n => n[0]).join("")}
                            </span>
                            Developer: {featuredBlog.author}
                          </span>
                          <span className="text-white group-hover:text-blue-400 font-bold inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-all">
                            Read Full Deep-Dive
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Standard Bento widgets) */}
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6 h-full justify-between">
                    {/* Bento Widget 1: Data Trends Metrics Box */}
                    <div 
                      onClick={(e) => handleNavigate("/blog?category=Data", e)}
                      className="group bg-zinc-900 border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 cursor-pointer shadow-md"
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-blue-400 px-2.5 py-1 rounded-md bg-blue-500/5 border border-blue-500/10">
                            Data Trends report
                          </span>
                          <TrendingUp className="h-5 w-5 text-blue-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h4 className="font-sans font-bold text-xl text-white group-hover:text-blue-400 transition-colors mt-4">
                          Algorithmic Engines in 2026
                        </h4>
                        <p className="text-xs text-zinc-400 mt-2 font-sans leading-relaxed">
                          We review the active adoption of vector embedding index standards and column-oriented streaming storage platforms across lead cloud stacks.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs font-sans mt-4">
                        <span className="text-zinc-500 font-mono">Download Analytics Pack</span>
                        <span className="text-white group-hover:text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Read Report <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Bento Widget 2: Beautiful Quick Subscribe Form */}
                    <div className="bg-[#080808] border border-white/5 p-6 rounded-2xl flex flex-col justify-between shadow-md relative overflow-hidden">
                      <div className="absolute -top-12 -right-12 h-32 w-32 bg-blue-600/5 rounded-full blur-2xl"></div>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <BookmarkCheck className="h-5 w-5 text-blue-500" />
                          <h4 className="font-sans font-bold text-base text-white">
                            Technical briefings
                          </h4>
                        </div>
                        <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                          Join 50,000+ lead CTOs, Principal Engineers, and system architects receiving our bi-weekly breakdown files on server infrastructures.
                        </p>
                      </div>

                      <form onSubmit={(e) => handleSubscribeSubmit(subscriberEmail, e)} className="mt-6 flex flex-col gap-2">
                        <div className="flex gap-2">
                          <input 
                            type="email" 
                            required
                            placeholder="work@corporatedomain.com"
                            value={subscriberEmail}
                            onChange={(e) => setSubscriberEmail(e.target.value)}
                            className="bg-[#020202] border border-white/10 text-white text-xs px-3.5 py-2.5 rounded-full flex-grow outline-none focus:border-blue-500 font-mono"
                          />
                          <button 
                            type="submit"
                            title="Register Subscription"
                            className="bg-white hover:bg-zinc-200 text-black px-4 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0"
                          >
                            <Send className="h-4 w-4 shrink-0" />
                          </button>
                        </div>
                        <p className="text-[9px] text-zinc-500 font-sans mt-1">No trackers. Simple markdown text briefing payloads only.</p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Latest Dispatches Section Grid */}
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                  <div>
                    <h2 className="font-sans text-3xl font-bold text-white tracking-tight">
                      Latest Dispatches
                    </h2>
                    <p className="text-sm text-zinc-400 mt-1 font-sans">
                      The most recent technical breakthroughs catalogued by our editorial workspace.
                    </p>
                  </div>
                  <a
                    href="/blog"
                    onClick={(e) => handleNavigate("/blog", e)}
                    className="text-sm font-bold text-white hover:text-blue-400 inline-flex items-center gap-1.5 font-sans group hover:underline"
                    rel="dofollow"
                  >
                    View Global Technical Directory
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {latestDispatches.map((post) => (
                    <BlogCard 
                      key={post.slug} 
                      post={post} 
                      onNavigate={handleNavigate} 
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Newsletter CTA Bracket Block */}
            <section className="py-20 border-t border-white/5 bg-gradient-to-b from-[#020202] to-[#050505]">
              <div className="max-w-5xl mx-auto px-6">
                <div className="relative bg-[#080808] border border-white/5 rounded-3xl p-8 md:p-14 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-blue-600/5 rounded-full blur-3xl"></div>
                  <div className="absolute -left-20 -top-20 h-64 w-64 bg-green-500/5 rounded-full blur-3xl"></div>
                  
                  <div className="relative z-10 max-w-lg space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">Stay ahead of the curve</span>
                    <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-white leading-snug">
                      Receive weekly briefings on hardware breakthroughs & engineering.
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                      Our system distributes curated architectural analyses. No spam, no hype patterns—only raw mathematical, infrastructure, and coding dispatches. Join 12,400+ subscribers.
                    </p>
                  </div>

                  <form 
                    onSubmit={(e) => handleSubscribeSubmit(subscriberEmail, e)}
                    className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row gap-3 flex-shrink-0"
                  >
                    <input 
                      type="email" 
                      required
                      placeholder="work@companydomain.com"
                      value={subscriberEmail}
                      onChange={(e) => setSubscriberEmail(e.target.value)}
                      className="bg-[#020202] border border-white/10 text-white text-sm px-5 py-3.5 rounded-full outline-none focus:border-blue-500 font-mono w-full sm:w-72"
                    />
                    <button 
                      type="submit"
                      className="bg-white hover:bg-zinc-200 text-black px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 whitespace-nowrap cursor-pointer"
                    >
                      Join Briefing List
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* BLOG LISTING VIEW */}
        {path === "/blog" && (
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 animate-fade-in">
            {/* Header branding block */}
            <div className="border-b border-white/5 pb-10 mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">Technical Dispatch Index</span>
              <h1 className="font-sans font-extrabold text-4xl md:text-5xl text-white tracking-tight mt-2">
                Explore Insights
              </h1>
              <p className="mt-3 text-base md:text-lg text-zinc-400 max-w-3xl font-sans leading-relaxed">
                Deep dives into emerging technology, engineering paradigms, and the physics of digital product design. Curated by the lead architect team for the technical elite.
              </p>
            </div>

            {/* Filtering Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
              
              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 items-center">
                <SlidersHorizontal className="h-4 w-4 text-zinc-500 mr-2" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      // Update search params on active url to support crawl safety
                      const params = new URLSearchParams(window.location.search);
                      if (cat === "All") {
                        params.delete("category");
                      } else {
                        params.set("category", cat);
                      }
                      window.history.replaceState({}, "", `/blog?${params.toString()}`);
                    }}
                    className={`px-4 py-2 text-xs font-bold transition-all font-sans cursor-pointer rounded-full ${
                      selectedCategory === cat
                        ? "bg-white text-black"
                        : "bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Instant filter query search */}
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-600" />
                <input
                  type="text"
                  placeholder="Filter keyterms..."
                  value={searchQuery}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchQuery(val);
                    const params = new URLSearchParams(window.location.search);
                    if (!val) {
                      params.delete("search");
                    } else {
                      params.set("search", val);
                    }
                    window.history.replaceState({}, "", `/blog?${params.toString()}`);
                  }}
                  className="bg-[#080808] border border-white/5 text-white pl-10 pr-4 py-2.5 rounded-full w-full text-xs outline-none focus:border-blue-500 font-mono"
                />
                {searchQuery && (
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      const params = new URLSearchParams(window.location.search);
                      params.delete("search");
                      window.history.replaceState({}, "", `/blog?${params.toString()}`);
                    }}
                    className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Main grid cards */}
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((post) => (
                  <BlogCard 
                    key={post.slug} 
                    post={post} 
                    onNavigate={handleNavigate} 
                  />
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-white/10 rounded-2xl py-16 text-center max-w-lg mx-auto">
                <p className="text-sm text-zinc-500 font-sans">No matching briefings found under search bounds.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    window.history.replaceState({}, "", '/blog');
                  }}
                  className="mt-6 text-blue-400 font-bold text-xs hover:underline inline-flex items-center gap-1 font-sans"
                >
                  Reset all criteria <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Static Pagination button */}
            {filteredBlogs.length > 5 && (
              <div className="mt-16 text-center">
                <button 
                  onClick={() => alert("Static directory completely loaded. All current indices synced successfully.")}
                  className="bg-[#080808] hover:bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white px-6 py-3 rounded-full text-xs font-bold font-sans inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  Confirm Synchronization Loop
                  <Check className="h-4 w-4 text-emerald-400" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ABOUT US VIEW */}
        {path === "/about" && (
          <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in space-y-16">
            
            {/* Title intro */}
            <div className="border-b border-white/5 pb-10 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">Architect Statement</span>
              <h1 className="font-sans font-extrabold text-4xl md:text-5xl text-white tracking-tight mt-2">
                Bridging Tech & High-Fidelity Journalism
              </h1>
            </div>

            {/* Biography visual block */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full blur opacity-15 group-hover:opacity-25 transition-opacity"></div>
                  <div className="relative h-48 w-48 rounded-full border-2 border-white/10 overflow-hidden bg-zinc-900">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6EFSIuQcZB0QQ0AncfroG4ClOBfC34AZB5LkDWsdN0WipfbGyRUvyOOPZMPrEY7SpsYo5kc1yeRB7UxNg4IynaeHQb96q53LjNRl4N9ZLTFgpirorKjd_rdSuDwkObhqSKdIJorFKCZHGQlnWpBFkZdhft0LsJ_1WsxqKEPUIWqdZGR8KVM9gYXtkoqYtaFrGCsGCkn8o0Ni6sKU5Zuv0LjrWrePu1L_YNGv3FednpVIW03S6f3cak__ppACjlVnZv4iQHkuqx8ue" 
                      alt="Marcus Vance Lead Architect" 
                      className="w-full h-full object-cover scale-102 hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h4 className="font-sans font-bold text-lg text-white">Marcus Vance</h4>
                  <p className="text-xs text-zinc-550 font-mono">Principal System Architect & Editor</p>
                  
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] uppercase font-bold tracking-wider mt-3 font-sans">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Status: Online (Berlin)
                  </span>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4 text-zinc-400 leading-relaxed text-sm md:text-base font-sans">
                <p>
                  I am a senior strategist, systems developer, and educator dedicated to unpacking tech complexity. At <strong>TECH_ED</strong>, I synthesize advanced engineering topics (such as mutual TLS handshakes, distributed container state variables, neural weights, and predictive user behavior funnels) into highly polished, scannable digests.
                </p>
                <p>
                  Our goal is simple: <strong>Deliver pure intellectual fuel.</strong> We strictly exclude sales-pitch wording, promotional filler, and AI-slop layouts. Every dispatch published is meticulously written, fact-checked, and supplemented with production code snippets ready for live implementation.
                </p>
              </div>
            </div>

            {/* Mission / Vision Two Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div className="bg-[#080808] border border-white/5 p-8 rounded-2xl space-y-3 shadow-lg">
                <h4 className="text-xl font-bold font-sans text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Our Core Mission
                </h4>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                  To empower software developers, CTOs, and digital builders with accurate system assessments. We cut through the commercial noise and synthesize deep technical knowledge to foster an ecosystem where engineering decisions are guided by purpose.
                </p>
              </div>

              <div className="bg-[#080808] border border-white/5 p-8 rounded-2xl space-y-3 shadow-lg">
                <h4 className="text-xl font-bold font-sans text-white flex items-center gap-2">
                  <Rss className="h-5 w-5 text-emerald-400" />
                  Our Editorial Vision
                </h4>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                  A global knowledge graph where architecture models, cybersecurity, and algorithmic growth metrics are shared freely and verified cryptographically, providing the principal resources for global infrastructure creators.
                </p>
              </div>
            </div>

            {/* bento grid of competencies */}
            <div className="space-y-6 pt-6">
              <h3 className="font-sans font-bold text-2xl text-white mb-6 text-center md:text-left">
                System Core Competencies
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "AI & Neural Networks", desc: "Orchestrating agent schemas, model compression mechanics, and generative API integration patterns built on secure token authentication vectors." },
                  { title: "Zero Trust Cybersecurity", desc: "Securing modern microservices using continuous state monitoring, ephemeral credentials, mTLS gates, and isolated micro-segments." },
                  { title: "Distributed Devops Stacks", desc: "Architecting load-balanced edge platforms, high-concurrency systems using Rust and Go, and cloud-agnostic programmatic IaC systems." },
                  { title: "Event Analytics at Scale", desc: "Setting up fast real-time pipelines using Apache Druid and Kafka queues to render millisecond metrics safely." },
                  { title: "Programmatic SEO Blocks", desc: "Optimizing metadata structures, robot indexes, dynamic JSON-LD structures, and sitemaps to secure leading organic positions." },
                  { title: "Responsive Web Engineering", desc: "Drafting highly optimized, mobile-first interfaces using pure Tailwind structures, sub-millisecond compile loops, and Inter typography." }
                ].map((comp, idx) => (
                  <div key={idx} className="bg-[#080808] border border-white/5 p-6 rounded-xl hover:border-blue-500/30 transition-all shadow-md">
                    <span className="text-[10px] font-mono text-blue-400 font-bold">BLOCK 0{idx + 1} // COMP</span>
                    <h5 className="font-sans font-bold text-lg text-white mt-2 mb-2">{comp.title}</h5>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">{comp.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Consulting Appointment Area */}
            <div className="bg-[#080808] border border-white/5 p-8 md:p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
                <div className="space-y-4">
                  <span className="text-blue-500 text-xs font-mono font-bold tracking-widest uppercase">Lead Advisory</span>
                  <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-white leading-snug">
                    Schedule a Technical Consultation Room
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    Whether you are designing a high-concurrency Rust pipeline, migrating cloud parameters, or auditing cybersecurity perimeters, book a focused 1-on-1 briefing. Our advisory delivers custom blueprint parameters and solutions within 25 minutes.
                  </p>
                </div>

                <form onSubmit={handleConsultSubmit} className="bg-zinc-900 border border-white/10 p-6 rounded-2xl space-y-4 shadow-xl">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-450 font-sans">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                      placeholder="e.g. Sarah Connor"
                      className="bg-[#020202] border border-white/10 text-white text-xs px-4 py-2.5 rounded-full w-full outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-450 font-sans">Contact Email</label>
                    <input 
                      type="email" 
                      required
                      value={consultEmail}
                      onChange={(e) => setConsultEmail(e.target.value)}
                      placeholder="e.g. s.connor@cyberdyne.org"
                      className="bg-[#020202] border border-white/10 text-white text-xs px-4 py-2.5 rounded-full w-full outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-450 font-sans">Focus Domain</label>
                    <select 
                      value={consultFocus} 
                      onChange={(e) => setConsultFocus(e.target.value)}
                      className="bg-[#020202] border border-white/10 text-white text-xs px-4 py-2.5 rounded-full w-full outline-none focus:border-blue-500 font-sans"
                    >
                      <option>AI Integration Parameters</option>
                      <option>Zero Trust security bounds</option>
                      <option>Distributed Edge Infrastructure</option>
                      <option>Technical SEO Optimization</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-450 font-sans">Message Brief (Optional)</label>
                    <textarea 
                      value={consultMessage}
                      onChange={(e) => setConsultMessage(e.target.value)}
                      placeholder="Details on active system bottlenecks..."
                      rows={3}
                      className="bg-[#020202] border border-white/10 text-white text-xs px-4 py-3 rounded-2xl w-full outline-none focus:border-blue-500 font-mono resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="bg-white hover:bg-zinc-200 text-black w-full py-3.5 rounded-full font-bold font-sans text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Schedule Direct Consult
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* DYNAMIC ARTICLE DISPATCH VIEWER */}
        {path.startsWith("/blog/") && (
          <div className="animate-fade-in py-8">
            {activeBlog ? (
              <div className="max-w-4xl mx-auto px-6">
                
                {/* Back directory link */}
                <button
                  onClick={(e) => handleNavigate("/blog", e)}
                  className="inline-flex items-center gap-1 text-xs text-blue-400 font-bold hover:underline mb-8 font-sans"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" /> Back to Technical Indices
                </button>

                {/* header branding details */}
                <header className="space-y-4 mb-8">
                  <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-white bg-blue-550/15 border border-blue-500/30 px-3 py-1.5 rounded-md font-mono">
                    {activeBlog.category}
                  </span>

                  <h1 className="font-sans font-extrabold text-3xl md:text-5xl text-white leading-tight tracking-tight">
                    {activeBlog.title}
                  </h1>

                  {/* Authors line and metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-sm bg-zinc-800 border border-white/10 flex items-center justify-center font-bold text-blue-400 text-xs">
                        {activeBlog.author.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white font-sans leading-none">{activeBlog.author}</p>
                        <p className="text-[10px] text-zinc-500 font-mono mt-1">Staff Technical Analyst</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-zinc-500 font-sans font-mono">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{activeBlog.publishDate}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{activeBlog.readTime}</span>
                    </div>
                  </div>
                </header>

                {/* Cover image illustration */}
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 mb-10 shadow-xl relative group">
                  <img
                    src={activeBlog.featuredImage}
                    alt={activeBlog.title}
                    loading="eager"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Row Grid integrating social toolbar and core article content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Share toolbar (Column size 1) */}
                  <aside className="lg:col-span-1 lg:block sticky top-28 h-fit space-y-4">
                    <div className="flex lg:flex-col justify-start gap-3 p-3 bg-zinc-900 border border-white/10 rounded-xl text-zinc-400 text-xs max-w-fit mx-auto lg:mx-0 shadow-md">
                      
                      {/* Copy action */}
                      <button 
                        onClick={() => triggerCopyLink(activeBlog.title)}
                        title="Copy article link"
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-zinc-850 hover:text-white transition-colors relative cursor-pointer"
                      >
                        <Share2 className="h-4 w-4" />
                        {copiedLink && (
                          <span className="absolute left-[110%] top-1/2 transform -translate-y-1/2 bg-emerald-500 text-white text-[9px] px-2 py-1 rounded font-bold whitespace-nowrap shadow-lg">
                            Copied Link!
                          </span>
                        )}
                      </button>

                      {/* Tweet share action */}
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${activeBlog.title} | ${seoConfig.siteTitle}`)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : seoConfig.canonicalUrl)}`}
                        target="_blank"
                        rel="dofollow"
                        title="Share on Twitter/X"
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-zinc-850 hover:text-white transition-colors"
                      >
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>

                      {/* LinkedIn share action */}
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : seoConfig.canonicalUrl)}`}
                        target="_blank"
                        rel="dofollow"
                        title="Share on LinkedIn"
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-zinc-850 hover:text-white transition-colors"
                      >
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>

                      {/* Email template index */}
                      <a
                        href={`mailto:?subject=${encodeURIComponent(activeBlog.title)}&body=${encodeURIComponent(`Check out this technical dispatch on TECH_ED:\n\n${typeof window !== "undefined" ? window.location.href : ""}`)}`}
                        title="Mail to colleague"
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-zinc-850 hover:text-white transition-colors"
                        rel="dofollow"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </aside>

                  {/* Prose article blocks (Column size 11) */}
                  <article className="lg:col-span-11 prose prose-invert prose-blue max-w-none text-zinc-300 font-sans leading-relaxed text-sm md:text-base selection:bg-blue-500/20">
                    <div 
                      dangerouslySetInnerHTML={{ __html: activeBlog.content }} 
                      className="space-y-6 text-zinc-300 leading-relaxed font-sans font-light"
                    />
                  </article>
                </div>

                {/* Related Articles Component container */}
                <RelatedArticles 
                  currentSlug={activeBlog.slug} 
                  category={activeBlog.category} 
                  onNavigate={handleNavigate} 
                />

              </div>
            ) : (
              <div className="max-w-xl mx-auto text-center py-20 px-6 border border-dashed border-white/10 rounded-2xl">
                <h3 className="font-sans font-bold text-xl text-white">Record Node Offline</h3>
                <p className="text-xs text-zinc-500 mt-2 font-sans">The requested slug has no active registry block in the system databases.</p>
                <button
                  onClick={(e) => handleNavigate("/blog", e)}
                  className="mt-6 bg-white hover:bg-zinc-200 text-black px-6 py-2.5 rounded-full font-bold text-xs inline-flex items-center gap-1.5 font-sans uppercase tracking-wider"
                >
                  Return to Archive Directory <ArrowRight className="h-3.5 w-3.5 text-black" />
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Persistent global footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global quick register Newsletter modal popup */}
      {subscribeModalOpen && (
        <div id="tech-ed-subscribe-modal" className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-[#050505] border border-white/10 w-full max-w-md rounded-3xl p-8 relative shadow-2xl overflow-hidden text-center">
            
            <button 
              onClick={() => setSubscribeModalOpen(false)}
              title="Close Panel"
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white h-8 w-8 rounded-full hover:bg-zinc-900 flex items-center justify-center"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6" />
            </span>

            <h3 className="font-sans font-extrabold text-xl text-white mb-2 tracking-tight">
              Subscribe to TECH_ED Dispatch
            </h3>
            
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed font-sans max-w-xs mx-auto">
              Our scripts distribute curated weekly analyses. Simple markdown text briefings—no advertising, tracking, or sales-pitch blocks.
            </p>

            <form onSubmit={(e) => handleSubscribeSubmit(subscriberEmail, e)} className="space-y-4">
              <input 
                type="email" 
                required
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                placeholder="work@corporatedomain.com"
                className="bg-[#020202] border border-white/10 text-white text-xs px-4 py-3 rounded-full w-full outline-none focus:border-blue-500 font-mono"
              />
              <button 
                type="submit"
                className="bg-white hover:bg-zinc-200 text-black w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Sync with Briefings Loop
              </button>
            </form>

            <p className="text-[9px] text-zinc-500 mt-4 leading-relaxed font-sans">
              By subscribing, you agree to receive technical dispatches. You can cancel at any time instantly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
