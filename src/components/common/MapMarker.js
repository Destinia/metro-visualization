import React, { PropTypes } from 'react';
import styles from './MapMarker.module.css';


const MapMarker = ({ onClick, color }) => (
  <i className={`fa fa-map-marker ${styles.marker}`} aria-hidden="true" onClick={onClick} style={{color}} />
);

MapMarker.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default MapMarker;
