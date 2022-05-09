/** @jsx jsx */
/** @jsxRuntime classic */
import React, { useState, useEffect } from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import gql from 'graphql-tag';
import parseEditorJsData from 'src/utils/parseEditorJsData';
import PostGrid from 'components/PostGrid';

import { client } from 'store/client';
import Head from 'next/head';

function TagDetailsAll({ data }) {
  //  const { dega } = data;
  // const formatType = 'fact-check';
  // const filterPosts = dega.posts.nodes.filter((i) => i.format.slug !== formatType);

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
      </div>
    );
  };
  return (
    <>
      <Head>
        <title> {data.tag.name} </title>
      </Head>
      <PostGrid
        type="tag"
        posts={data.posts.nodes}
        formats={data.formats.nodes}
        item={data.tag}
        header={header}
      />
    </>
  );
}

export default TagDetailsAll;

export async function getServerSideProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query ($slug: String!) {
        tag(slug: $slug) {
          description
          id
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
        posts(tags: { slugs: [$slug] }) {
          nodes {
            users {
              id
              first_name
              last_name
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

  if (!data) {
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
