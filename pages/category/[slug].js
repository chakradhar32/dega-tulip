/** @jsx jsx */
/** @jsxRuntime classic */
import React, { useState, useEffect } from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import gql from 'graphql-tag';
import parseEditorJsData from 'src/utils/parseEditorJsData';
import PostGrid from 'components/PostGrid';

import { client } from 'store/client';
import Head from 'next/head';
import parseTiptapContent from '../../src/utils/parseTipTapEditorData';

function CategoryDetailsAll({ data }) {
  const [readMore, setReadMore] = React.useState(true);
  const [isReadMoreNeeded, setIsReadMoreNeeded] = useState(false);

  useEffect(() => {
    if (process.browser) {
      const el = document.getElementById('category-description');
      setIsReadMoreNeeded(el?.clientHeight < el?.scrollHeight);
    }
  }, []);

  const header = (item) => {
    return (
      <div
        sx={{
          mb: (theme) => `${theme.space.spacing6}`,
          fontSize: (theme) => `${theme.fontSizes.h6}`,
        }}
      >
        <h1
          sx={{
            fontSize: [(theme) => `${theme.fontSizes.h5}`, (theme) => `${theme.fontSizes.h4}`],
            mb: (theme) => `${theme.space.spacing5}`,
            textTransform: 'capitalize',
            px: (theme) => theme.space.layout2,
          }}
        >
          {item.name}
        </h1>
        <div
          id="category-description"
          sx={{
            maxHeight: (theme) => (readMore ? `calc(${theme.lineHeights.normal}em * 6 )` : '100%'),
            overflow: 'hidden',
            px: (theme) => `${theme.space.spacing5}`,
          }}
        >
          {process.browser && parseTiptapContent(item.description_html)}
        </div>
        {item.description && isReadMoreNeeded && (
          <button
            type="button"
            onClick={() => setReadMore((prev) => !prev)}
            sx={{
              px: (theme) => `${theme.space.spacing5}`,
              color: (theme) => `${theme.colors.textLinkPrimary}`,
              fontSize: (theme) => `${theme.fontSizes.h6}`,
            }}
          >
            {readMore ? 'Read more' : 'Read less'}
          </button>
        )}
      </div>
    );
  };
  return (
    <>
      <Head>
        <title> {data.category.name} </title>
      </Head>
      <PostGrid
        type="category"
        posts={data.posts.nodes}
        formats={data.formats.nodes}
        item={data.category}
        header={header}
      />
    </>
  );
}

export default CategoryDetailsAll;

export async function getServerSideProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query ($slug: String!) {
        category(slug: $slug) {
          description
          description_html
          id
          medium {
            alt_text
            url
            dimensions
          }
          name
          slug
        }
        formats {
          nodes {
            id
            slug
            name
          }
        }
        posts(categories: { slugs: [$slug] }) {
          nodes {
            users {
              id
              first_name
              last_name
              display_name
              slug
            }
            categories {
              slug
              name
            }
            medium {
              alt_text
              url
              dimensions
            }
            format {
              name
              slug
            }
            published_date
            id
            excerpt
            status
            subtitle
            title
            slug
          }
        }
      }
    `,
    variables: {
      slug: params.slug,
    },
  });

  if (!data || !data.category) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
}
