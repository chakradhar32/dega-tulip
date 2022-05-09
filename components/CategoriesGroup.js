/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import { jsx } from 'theme-ui';
import Link from 'next/link';

const Categories = ({ categories }) => {
  const list =
    categories &&
    categories.map((category, index) => (
      <div
        key={`category${index}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 'tight',
          py: (theme) => `${theme.space.spacing3}`,
          borderBottomWidth: '1px',
          '&:last-child': {
            borderBottomWidth: 0,
          },
          borderColor: (theme) => `${theme.colors.borderPrimary}`,
        }}
      >
        <Link passHref href={`/category/${category.slug}`}>
          <a
            sx={{
              width: 'full',
              display: 'flex',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'none' },
              fontWeight: 'bold',
              fontSize: (theme) => `${theme.fontSizes.h7}`,
              color: (theme) => `${theme.colors.textPrimary}`,
              '&:hover': {
                color: (theme) => `${theme.colors.textLinkHoverPrimary}`,
              },
            }}
          >
            {' '}
            {category.name}
          </a>
        </Link>
      </div>
    ));
  return categories ? list : null;
};

export default Categories;
