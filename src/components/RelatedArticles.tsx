import React from "react";
import { BlogPost } from "../types";
import { blogs } from "../data/blogs";
import { ArrowRight, Clock } from "lucide-react";

interface RelatedArticlesProps {
  currentSlug: string;
  category: string;
  onNavigate: (path: string, e?: any) => void;
}

export default function RelatedArticles({ currentSlug, category, onNavigate }: RelatedArticlesProps) {
  // Find up to 3 blog posts that have the same category or overall interesting, excluding the active post
  const related = blogs
    .filter((b) => b.slug !== currentSlug)
    .sort((a, b) => {
      // Prioritize same category match
      const aMatch = a.category.toLowerCase() === category.toLowerCase() ? 1 : 0;
      const bMatch = b.category.toLowerCase() === category.toLowerCase() ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section id="tech-ed-related-articles" className="mt-16 pt-12 border-t border-white/10">
      <h4 className="font-sans font-bold text-2xl text-white mb-8 tracking-tight">
        Related Dispatch Archives
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((post) => (
          <div 
            key={post.slug}
            onClick={(e) => onNavigate(`/blog/${post.slug}`, e)}
            className="group bg-[#080808] border border-white/5 p-5 rounded-xl hover:border-blue-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 font-sans">
                {post.category}
              </span>
              <h5 className="font-sans font-bold text-base text-white leading-snug group-hover:text-blue-400 transition-colors mt-2 mb-3 line-clamp-2">
                <a
                  href={`/blog/${post.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  rel="dofollow"
                >
                  {post.title}
                </a>
              </h5>
              <p className="text-xs text-zinc-400 line-clamp-2 mb-4 font-sans">
                {post.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-3 border-t border-white/5 mt-auto">
              <span>{post.publishDate}</span>
              <span className="text-white group-hover:text-blue-400 font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-all">
                Read File <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
