import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Router from 'next/router';
import NProgress from 'nprogress';
import theme from 'src/utils/theme.js';
import Layout from 'components/Layout';
import 'styles/global.css';
import { client } from 'store/client';
import { gql } from 'graphql-tag';
import App from 'next/app';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, props }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout data={props?.layoutData}>
        <Component {...pageProps} {...props} />
      </Layout>
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { data: layoutData } = await client.query({
    query: gql`
      query Homepage {
        menu {
          nodes {
            menu
            id
            slug
            name
          }
        }
        space {
          description
          name
          site_title
          tag_line
          site_address
          fav_icon {
            url
            dimensions
          }
          logo {
            url
            dimensions
          }
        }
        categories {
          nodes {
            id
            slug
            name
            description
            meta_fields
            medium {
              url
              dimensions
            }
          }
        }
      }
    `,
  });
  return {
    props: {
      ...appProps,
      layoutData,
    },
  };
};

export default MyApp;
