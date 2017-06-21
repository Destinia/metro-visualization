import React, { PropTypes } from 'react';
import Logo from '../Header/Logo';

import styles from './Header.module.css';

const Header = ({ handleRegisterOpen, handleFirstVisit, baba }) => (
  <div className={styles.header}>
    <div className={styles.wrapper}>
      <Logo />
    </div>
  </div>
);

Header.propTypes = {
  handleRegisterOpen: PropTypes.func,
  handleFirstVisit: PropTypes.func,
  baba: PropTypes.string,
};


export default Header;
