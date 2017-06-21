import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { firebaseConnect, helpers } from 'react-redux-firebase';
import GoogleMap from '../common/GoogleMap';
import MapMarker from '../common/MapMarker';
import styles from './Main.module.css';
import queryLocation from '../../utils/currentLocation';

const { isLoaded, isEmpty, dataToJS } = helpers;


@firebaseConnect([
  { path: '/metro' }, // object notation
])
@connect(
  ({ firebase }) => ({
    // Connect todos prop to firebase todos
    data: dataToJS(firebase, '/metro'),
  })
)
class Main extends Component {

  constructor() {
    super();
    this.state = {
      timer: null,
      metros: [],
    };
  }

  componentDidMount = () => {
    const timer = setInterval(this.tick, 100);
    this.setState({ timer });
  }

  tick = () => {
    const data = isLoaded(this.props.data) ? this.props.data : [];

    const metros = data.map(el =>
      [...queryLocation(
        el.Station.slice(0, -1),
        el.Destination.slice(0, -1),
        el.UpdateTime
      ), el._id]).filter(m => m);

    this.setState({
      metros,
    });
  }

  handleMarkerClick = (time) => () => {
    this.setState({ hover: time });
    if (!this.state.startTime) {
      this.setState({ startTime: time });
    } else {
      this.setState({ endTime: time });
    }
  }

  filterUnhandledStation = (val) =>
    ['新北投', '小碧潭'].find(k => val.Station !== k && val.Destination !== k)
  ;

  renderMapMarker = (el) => {
    return (<MapMarker
      lat={el[1]}
      lng={el[0]}
      key={el[2]}
    />);
  }


  render() {
    return (
      <div className={`row ${styles.main}`}>
        <div className="col-xs-12">
          <div className={styles.mapContainer}>
            <GoogleMap>
              {
                this.state.metros.filter(this.filterUnhandledStation).map(m =>
                  this.renderMapMarker(m))
              }
            </GoogleMap>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  data: PropTypes.object,
  firebase: PropTypes.object,
  prediction: PropTypes.object,
  createPredictionRequest: PropTypes.func,
  testPredictionRequest: PropTypes.func,
  resetPredictionRequest: PropTypes.func,
  updatePredictionDataRequest: PropTypes.func,
};

export default Main;
