import React from "react";
import { BlogPost } from "../types";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  onNavigate: (to: string, e?: any) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onNavigate }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "cybersecurity":
      case "security":
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
      case "infrastructure":
        return "bg-amber-500/10 text-amber-300 border-amber-500/20";
      case "growth":
      case "marketing":
        return "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20";
      case "ai":
      case "artificial intelligence":
        return "bg-blue-500/10 text-blue-300 border-blue-500/20";
      case "devops":
        return "bg-rose-500/10 text-rose-300 border-rose-500/20";
      case "engineering":
        return "bg-purple-500/10 text-purple-300 border-purple-500/20";
      default:
        return "bg-[#adc6ff]/10 text-[#adc6ff] border-[#adc6ff]/20";
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    onNavigate(`/blog/${post.slug}`, e);
  };

  return (
    <div className="relative group">
      {/* Dynamic glow blur backplate */}
      <div className="absolute inset-0 bg-blue-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
      
      <article 
        className="relative bg-zinc-900/90 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Featured Cover Photo */}
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
          <img
            src={post.featuredImage}
            alt={post.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/85 to-transparent"></div>
          
          {/* Category Floating Tag */}
          <span className={`absolute top-4 left-4 text-xs font-bold font-sans tracking-wide px-3 py-1.5 rounded-full border ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
        </div>

        {/* content Details container */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Chrono Metadata Row */}
          <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3 font-sans">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {post.publishDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          {/* Title Text Heading */}
          <h3 className="font-sans font-bold text-xl text-white leading-snug group-hover:text-blue-400 transition-colors mb-3 line-clamp-2">
            <a 
              href={`/blog/${post.slug}`}
              onClick={(e) => {
                e.preventDefault();
                // Navigation handled by parent container click
              }}
              className="focus:outline-none"
              rel="dofollow"
            >
              {post.title}
            </a>
          </h3>

          {/* abstract description snippet */}
          <p className="text-sm text-zinc-400 font-sans line-clamp-3 mb-6 flex-grow leading-relaxed">
            {post.description}
          </p>

          {/* Author details & action triggers */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-sans mt-auto">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-sm bg-zinc-800 border border-white/10 flex items-center justify-center font-bold text-blue-400 text-[10px]">
                {post.author.split(" ").map(n => n[0]).join("")}
              </div>
              <span className="text-zinc-400 font-medium">{post.author}</span>
            </div>
            
            <span className="text-white hover:text-blue-400 font-bold inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-all">
              Read Dispatch
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogCard;
