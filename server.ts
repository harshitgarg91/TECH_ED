import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { blogs } from "./src/data/blogs.js";
import { seoConfig } from "./src/config/seo.js";

// Setup __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Cache static index file if needed in prod, but reading is fast
  const isProd = process.env.NODE_ENV === "production";

  // API dynamic endpoints
  app.get("/api/blogs", (req, res) => {
    // Return list of blogs without rich content body to save bandwidth on lists, but includes description
    const list = blogs.map(({ title, slug, description, category, publishDate, author, featuredImage, readTime, featured }) => ({
      title, slug, description, category, publishDate, author, featuredImage, readTime, featured
    }));
    res.json(list);
  });

  app.get("/api/blogs/:slug", (req, res) => {
    const post = blogs.find((b) => b.slug === req.params.slug);
    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(post);
  });

  // Dynamic robots.txt
  app.get("/robots.txt", (req, res) => {
    const host = req.get("host") || "ais-pre-d6x3jffmmxfs6vbmmmya5z-949796948259.asia-southeast1.run.app";
    const protocol = req.secure || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    res.setHeader("Content-Type", "text/plain");
    res.send(`User-agent: *
Allow: /

Sitemap: ${protocol}://${host}/sitemap.xml
`);
  });

  // Dynamic sitemap.xml
  app.get("/sitemap.xml", (req, res) => {
    const host = req.get("host") || "ais-pre-d6x3jffmmxfs6vbmmmya5z-949796948259.asia-southeast1.run.app";
    const protocol = req.secure || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    const staticPages = [
      { loc: "", changefreq: "daily", priority: "1.0" },
      { loc: "/about", changefreq: "weekly", priority: "0.8" },
      { loc: "/blog", changefreq: "daily", priority: "0.9" },
    ];

    const blogPages = blogs.map((post) => ({
      loc: `/blog/${post.slug}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: post.publishDate,
    }));

    const allPages = [...staticPages, ...blogPages];

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map((page: any) => {
    return `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ""}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.send(sitemapXml);
  });

  // Dynamic llms.txt containing structured data guides for crawling LLMs
  app.get("/llms.txt", (req, res) => {
    const host = req.get("host") || "ais-pre-d6x3jffmmxfs6vbmmmya5z-949796948259.asia-southeast1.run.app";
    const protocol = req.secure || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;

    let md = `# TECH_ED Technical Journalism Directory

Superior technical journalism decoding the architecture of tomorrow's digital economy.

## Essential Pages
- [Home Page](${baseUrl}/) - Live featured analysis, core technology newsletters, latest articles.
- [About Us](${baseUrl}/about) - Editorial vision, core competencies (AI, cybersecurity, systems engineering, digital growth marketing).
- [Full Blog Archives](${baseUrl}/blog) - Filterable technology archives.

## Published Technical Articles & Deep-Dives
`;

    blogs.forEach((post) => {
      md += `\n### [${post.title}](${baseUrl}/blog/${post.slug})
- **Category:** ${post.category}
- **Author:** ${post.author}
- **Published:** ${post.publishDate} (${post.readTime})
- **Description:** ${post.description}
`;
    });

    res.setHeader("Content-Type", "text/plain");
    res.send(md);
  });

  let vite: any;
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist"), { index: false }));
  }

  // Handle all HTML document requests and perform SEO tag & Google Search Console pre-populating
  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;

    // Skip static assets and internal APIs
    if (url.startsWith("/api") || url.includes(".") || url.startsWith("/@")) {
      return next();
    }

    try {
      let rawHtml = "";
      if (!isProd) {
        // Read index.html directly from root folder during dev
        rawHtml = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        rawHtml = await vite.transformIndexHtml(url, rawHtml);
      } else {
        // Read from compiled dist folder in production
        rawHtml = fs.readFileSync(path.resolve(__dirname, "dist", "index.html"), "utf-8");
      }

      // Configure dynamic tags based on route matches
      let title = seoConfig.siteTitle;
      let description = seoConfig.siteDescription;
      let ogImage = seoConfig.defaultOgImage;
      let canonicalRelative = url.split("?")[0];
      const host = req.get("host") || "ais-pre-d6x3jffmmxfs6vbmmmya5z-949796948259.asia-southeast1.run.app";
      const protocol = req.secure || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
      const canonicalUrl = `${protocol}://${host}${canonicalRelative}`;
      
      let jsonLdString = "";

      // Check if visiting a specific blog post
      if (url.startsWith("/blog/")) {
        const slug = url.split("/blog/")[1]?.split("?")[0];
        const post = blogs.find((b) => b.slug === slug);
        if (post) {
          title = `${post.title} | TECH_ED Insights`;
          description = post.description;
          ogImage = post.featuredImage;

          // Schema.org BlogPosting structured metadata
          const structuredData = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "image": post.featuredImage,
            "datePublished": post.publishDate,
            "dateModified": post.publishDate,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "TECH_ED",
              "logo": {
                "@type": "ImageObject",
                "url": seoConfig.defaultOgImage
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": canonicalUrl
            }
          };
          jsonLdString = `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
        }
      } else if (url.startsWith("/about")) {
        title = `About Marcus Vance & The Core Team | TECH_ED`;
        description = "Meet the researchers, tech architects, and educators decoding the complexity of artificial intelligence and deep infrastructure systems.";
      }

      // Generate all HTML tag metadata dynamically
      const metaTags = `
    <!-- General SEO Metadata -->
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Open Graph (Facebook / LinkedIn) / Meta Cards -->
    <meta property="og:type" content="${url.startsWith("/blog/") ? "article" : "website"}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="TECH_ED" />

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${ogImage}" />
`;

      const gscVerification = `<meta name="google-site-verification" content="${seoConfig.googleSearchConsoleToken}" />`;

      // Replace placeholders with constructed tags
      let finalHtml = rawHtml
        .replace("<!-- GSC_VERIFICATION_PLACEHOLDER -->", gscVerification)
        .replace("<!-- META_TAGS_PLACEHOLDER -->", metaTags)
        .replace("<!-- JSON_LD_PLACEHOLDER -->", jsonLdString);

      // Remove default title from index.html to avoid duplications
      finalHtml = finalHtml.replace(/<title>.*?<\/title>/, "");

      res.setHeader("Content-Type", "text/html");
      res.status(200).send(finalHtml);
    } catch (e: any) {
      if (!isProd && vite) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e);
      res.status(500).end(e.stack || "Internal Server Error");
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TECH_ED Server running in ${isProd ? "Production" : "Development"} on http://0.0.0.0:${PORT}`);
  });
}

startServer();
