import gql from 'graphql-tag';
import { client } from 'store/client';
import getConfig from 'next/config';

function generateSiteMap(categories) {
  const { publicRuntimeConfig } = getConfig();

  return `<?xml version="1.0" encoding="UTF-8"?>
  <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     ${categories
      .map((category) => {
        return `
        <url>
      <loc>${`${publicRuntimeConfig.siteURL}/category/${category?.slug}/`}</loc>
      <lastmod>${category?.updated_at}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
  </url>

     `;
      })
      .join('')}
   </urlset>
 `;
}

function SiteMapCategory() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const { data } = await client.query({
    query: gql`
      query SitemapQuery {
        sitemap {
          categories {
            slug
            id
            created_at
            published_date
            updated_at
          }
         
        }
      }
    `,
  });


  const sitemap = await generateSiteMap(data.sitemap.categories);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMapCategory;