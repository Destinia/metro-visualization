import React, { PropTypes } from 'react';

import Header from './Header';

import './index.css';


const Layout = ({ children }) => (
  <div className="layout">
    <Header />
    {/* this will render the child routes */}
    {children}
  </div>
);


Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
