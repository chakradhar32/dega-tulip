import gql from 'graphql-tag';
import { client } from 'store/client';
import getConfig from 'next/config';

function generateSiteMap(posts) {
  const { publicRuntimeConfig } = getConfig();

  return `<?xml version="1.0" encoding="UTF-8"?>
  <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     
     <url>
      <loc>${`${publicRuntimeConfig.siteURL}/sitemap-posts.xml/`}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
  </url>
  <url>
      <loc>${`${publicRuntimeConfig.siteURL}/sitemap-authors.xml/`}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
  </url>
  <url>
      <loc>${`${publicRuntimeConfig.siteURL}/sitemap-categories.xml/`}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
  </url>
  <url>
      <loc>${`${publicRuntimeConfig.siteURL}/sitemap-tags.xml/`}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
  </url>
   </urlset>
 `;
}

function SiteMapTag() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {


  const sitemap = await generateSiteMap()

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();


  return {
    props: {},
  };
}

export default SiteMapTag;