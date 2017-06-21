import React, { PropTypes } from 'react';
import ReactGoogleMap from 'google-map-react';

const GoogleMap = (props) => (
  <ReactGoogleMap
    {...props}
    bootstrapURLKeys={{
      key: 'AIzaSyBE8Um5qj7oJOO78bikayl-3ZV8lHvl4N4',
      language: 'zh-tw',
    }}
    yesIWantToUseGoogleMapApiInternals
  >
    {props.children}
  </ReactGoogleMap>
);

GoogleMap.defaultProps = {
  center: {
    lat: 25.018680,
    lng: 121.542029,
  },
  zoom: 12,
};

GoogleMap.propTypes = {
  onClick: PropTypes.func,
  zoom: PropTypes.number,
  children: PropTypes.any,
  center: PropTypes.object,
  onChange: PropTypes.func,
};

export default GoogleMap;
