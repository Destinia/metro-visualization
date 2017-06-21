import React, { PropTypes } from 'react';


import './index.css';


const Layout = ({ children }) => (
  <div className="layout">
    {/* this will render the child routes */}
    {children}
  </div>
);


Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
