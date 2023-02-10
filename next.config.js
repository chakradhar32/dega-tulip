const basePath = process.NODE_ENV === 'production' ? '' : process.env.NEXT_PUBLIC_BASE_PATH;

module.exports = {
  reactStrictMode: true,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    path: `${basePath}/_next/image`,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  publicRuntimeConfig: {
    degaAPIKey: process.env.NEXT_PUBLIC_DEGA_API_KEY,
    spaceId: process.env.NEXT_PUBLIC_SPACE_ID,
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    kratosURL: process.env.NEXT_PUBLIC_KRATOS_URL,
    kavachProfileURL: process.env.NEXT_PUBLIC_KAVACH_PROFILE_URL,
    siteURL: process.env.NEXT_PUBLIC_SITE_URL,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  },
  serverRuntimeConfig: {

  },
};
