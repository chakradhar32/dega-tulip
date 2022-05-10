/** @jsx jsx */
/** @jsxRuntime classic */
import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import { jsx } from 'theme-ui';
import Navbar from './Navbar';

import Footer from './Footer';

const Layout = ({ children, data }) => {
  return (
    <>
      {data && data.menu && <Navbar data={data} />}
      <main
        style={{ maxWidth: '1560px' }}
        sx={{
          width: 'full',
          fontSize: [(theme) => `${theme.fontSizes.h6}`, null, (theme) => `${theme.fontSizes.h5}`],
          color: (theme) => `${theme.colors.textPrimary}`,
          lineHeight: 'normal',
          pt: [(theme) => `${theme.space.spacing5}`, 0, 0],
          minHeight: 'calc(100vh - 60px)',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
