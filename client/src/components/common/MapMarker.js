import React, { PropTypes } from 'react';
import styles from './MapMarker.module.css';

import subway from './subway.png';

const MapMarker = ({ time }) => (
  <div>
    <span className={styles.time}>{time}</span>
    <img src={subway} className={`${styles.marker}`} role="presentation" />
  </div>
);

MapMarker.propTypes = {
  time: PropTypes.number,
};

export default MapMarker;
