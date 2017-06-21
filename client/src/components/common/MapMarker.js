import React, { PropTypes } from 'react';
import styles from './MapMarker.module.css';

import subway from './subway.png';

const MapMarker = () => (
  <img src={subway} className={`${styles.marker}`} role="presentation" />
);

MapMarker.propTypes = {
};

export default MapMarker;
