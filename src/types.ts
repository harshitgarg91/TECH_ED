export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  category: string;
  publishDate: string;
  author: string;
  featuredImage: string;
  content: string; // Markdown or rich HTML text
  readTime: string;
  featured?: boolean;
}

export interface SEOConfig {
  siteTitle: string;
  siteDescription: string;
  googleSearchConsoleToken: string;
  defaultOgImage: string;
  canonicalUrl: string;
}
