/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
// import Seo from './Seo';
import Link from 'next/link';
import parseDate from '../src/utils/parseDate';

function Homepage({ data }) {
  const { posts } = data;
  const featuredPost = posts.nodes[0];
  return (
    <>
      {/* <Seo title={dega.space.site_title} canonical={dega.space.site_address} type="website" /> */}
      <main sx={{ p: [null, null, null, '2rem'], pt: '2rem' }}>
        {/* Hero Section */}
        <div
          className="hero"
          sx={{
            display: 'grid',
            columnGap: [null, null, null, '2rem'],
            gridTemplateColumns: [null, null, null, 'repeat(12,1fr)'],
            gridTemplateRows: [null, null, null, 'minmax(2rem,auto) repeat(2,1fr)'],
            px: ['1.5rem', null, null, 'initial'],
            '& > *': {
              mt: ['2rem', null, null, 'initial'],
            },
          }}
        >
          {/* Left */}
          <div
            className="left"
            sx={{
              gridColumn: [null, null, null, '1/span 3'],
              gridRowStart: [null, null, null, 1],
              position: 'relative',
              order: [2, null, null, 'initial'],
              '::after': {
                content: `""`,
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 'auto',
                right: 'calc((2rem / 2) * -1)',
                borderRight: '1px solid #d9d9d9',
              },
            }}
          >
            {posts.nodes.slice(1, 3).map((post) => (
              <div
                key={post.id}
                sx={{ borderTop: '1px solid #d9d9d9', display: 'block', py: '1rem' }}
              >
                <Link passHref href={`/${post.slug}`}>
                  <a>
                    <img src={post.medium.url.proxy} alt="" />
                  </a>
                </Link>
                <Link key={post.id} href={`category/${post.categories[0].slug}`} passHref>
                  <a
                    sx={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      color: '#df1c22',
                      display: 'block',
                    }}
                  >
                    {post.categories.length > 0 ? post.categories[0].name : ''}
                  </a>
                </Link>
                <Link key={post.id} href={`/${post.slug}`} passHref>
                  <a sx={{ display: 'block' }}>
                    <h3 sx={{ fontSize: '1rem' }}>{post.title}</h3>
                  </a>
                </Link>
                <Link key={post.id} href={`/author/${post.users[0].slug}`} passHref>
                  <a sx={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    {post.users[0].display_name}
                  </a>
                </Link>
                <p sx={{ fontSize: '0.675rem' }}>{parseDate(post.published_date)}</p>
              </div>
            ))}
          </div>
          {/* Center */}
          <div
            className="center"
            sx={{
              gridColumn: [null, null, null, '4/span 6'],
              textAlign: 'center',
              order: [1, null, null, 'initial'],
              mt: [0, null, null, 'initial'],
            }}
          >
            <div>
              <Link href={`/${featuredPost.slug}`} passHref>
                <a>
                  <div>
                    <img src={featuredPost.medium?.url?.proxy} alt={featuredPost.title} />
                  </div>

                  <div sx={{ p: '1rem' }}>
                    <p sx={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#df1c22' }}>
                      {featuredPost.categories[0].name}
                    </p>
                    <h2 sx={{ fontSize: '2.25rem' }}>{featuredPost.title}</h2>
                    <p sx={{ fontSize: '1rem' }}>{featuredPost.excerpt}</p>
                    <p sx={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      {featuredPost.users[0].display_name}
                    </p>
                    <p sx={{ fontSize: '0.675rem' }}>{parseDate(featuredPost.published_date)}</p>
                  </div>
                </a>
              </Link>
            </div>
          </div>
          {/* Right */}
          <div
            className="right"
            sx={{
              gridColumn: [null, null, null, '10/span 3'],
              position: 'relative',
              order: [2, null, null, 'initial'],
              '::before': {
                content: `""`,
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 'auto',
                left: 'calc((2rem / 2) * -1)',
                borderRight: '1px solid #d9d9d9',
              },
            }}
          >
            <h4 sx={{ mb: '0.5rem', fontSize: '1rem' }}>Latest Posts</h4>
            <div>
              {posts.nodes.slice(3, 8).map((post) => (
                <div
                  key={post.id}
                  sx={{
                    borderTop: '1px solid #d9d9d9',
                    display: 'block',
                    py: '1rem',
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <Link key={post.id} href={`category/${post.categories[0].slug}`} passHref>
                      <a
                        sx={{
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          color: '#df1c22',
                          display: 'block',
                        }}
                      >
                        {post.categories.length > 0 ? post.categories[0].name : ''}
                      </a>
                    </Link>
                    <Link key={post.id} href={`/${post.slug}`} passHref>
                      <a sx={{ display: 'block' }}>
                        <h3 sx={{ fontSize: '1rem' }}>{post.title}</h3>
                      </a>
                    </Link>
                    <div sx={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <Link key={post.id} href={`/author/${post.users[0].slug}`} passHref>
                        <a sx={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>
                          {post.users[0].display_name}
                        </a>
                      </Link>
                      <p sx={{ fontSize: '0.675rem' }}>{parseDate(post.published_date)}</p>
                    </div>
                  </div>
                  <div sx={{ maxWidth: '7.5rem', maxWidth: '25%', flex: '1 0 25%' }}>
                    <img src={post.medium?.url?.proxy} alt={post.title} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left sidebar */}
          {/* <div
          className="sidebar"
          sx={{
            display: [null, null, null, null, 'flex'],
            width: [null, null, null, null, '1/4'],
            borderRightWidth: 'px',
            position: 'sticky',
          }}
        >
          <div sx={{ display: 'block' }}>
            <div
              sx={{
                mb: (theme) => `${theme.space.spacing5}`,
                py: (theme) => `${theme.space.spacing5}`,
                px: (theme) => `${theme.space.spacing6}`,
                borderBottomWidth: 'px',
              }}
            >
              <h5 className="heading">Categories</h5>
              <CategoriesGroup categories={data.categories.nodes} />
            </div>
          </div>
        </div> */}
          {/* Main/ Middle part of the homepage */}
          {/* <div
            className="main-content"
            sx={{ width: ['full', null, '3/4', null, '2/4'], }}
          >
            {/* Featured Card * /}
            {data.posts.nodes.length > 0 ? (
              <div className='featured' sx={{
                transition: 'all 0.5s',
                '&:hover': { textDecoration: 'none', transform: 'scale(1.04)', },
              }}>
                <StoryCard
                  cardStyle="featured"
                  storyData={data.posts.nodes[0]}
                  // imageSize="w-full h-64"
                  imageSize={{ width: 'full', height: 64 }}
                />
              </div>

            ) : null}

            {/* Articles list * /}
            <div
              sx={{
                display: 'flex',
                flexDirection: 'column',
                py: (theme) => `${theme.space.spacing6}`,
              }}
            >
              {data?.posts.nodes.slice(1, 20).map((item, index) => (
                <StoryCard
                  key={`homepage-post-${index}`}
                  cardStyle="card"
                  storyData={item}
                  imageSize={{
                    width: ['full', null, '1/3'],
                    height: [48, null, 'full'],
                    py: [(theme) => `${theme.space.spacing6}`, null, 0],
                  }}
                />
              ))}
            </div>
          </div> */}
          {/* Right sidebar */}
          {/* <div
            className="sidebar"
            sx={{
              display: [null, null, null, 'flex'],
              width: [null, null, null, '2/6', '1/4'],
              borderLeftWidth: 'px',
              position: 'sticky',
            }}
          >
            <div sx={{ display: 'block' }}>
              <div
                sx={{
                  mb: (theme) => `${theme.space.spacing5}`,
                  py: (theme) => `${theme.space.spacing5}`,
                  px: (theme) => `${theme.space.spacing6}`,
                  borderBottomWidth: 'px',
                }}
              >
                <h5 sx={{ fontSize: '1.25rem' }}>Recent In Factchecks</h5>
              </div>
              {data?.factchecks.nodes.map((item, index) => (
                <StoryCard
                  key={`homepage-factcheck-${index}`}
                  cardStyle="vertical"
                  storyData={item}
                  imageSize={{ height: 40 }}
                />
              ))}
            </div>
          </div> */}
        </div>
        {/* Featured categories Section  */}
        <div>
          {data?.featuredCategories?.nodes.length > 0 &&
            data.featuredCategories.nodes.map((category) => (
              <section key={category.id}>
                <h4 sx={{ borderBottom: '1px solid black' }}>{category.name}</h4>
                <div>
                  {category.posts.map((post) => (
                    <div key={post.id}>
                      <Link href={`/${post.slug}`} passHref>
                        <a sx={{ display: 'block' }}>{post.title}</a>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            ))}
        </div>
      </main>
    </>
  );
}
export default Homepage;
