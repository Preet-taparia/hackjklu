import { NextResponse } from "next/server";

const siteUrl = "https://www.hackjklu.com";

export async function GET() {
  const pages = [
    { url: `${siteUrl}/`, priority: 1.0 },
    { url: `${siteUrl}/events`, priority: 0.8 },
    { url: `${siteUrl}/partners/ws-cube-tech`, priority: 0.7 },
    { url: `${siteUrl}/partners/ention`, priority: 0.7 },
    { url: `${siteUrl}/submit-your-problem`, priority: 0.7 },
    { url: `${siteUrl}/team`, priority: 0.6 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${page.url}</loc>
      <priority>${page.priority}</priority>
    </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
