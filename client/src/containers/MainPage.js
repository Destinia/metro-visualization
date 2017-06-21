import Main from '../components/Main';
import { compose } from 'redux';
import { connect } from 'react-redux';
import asyncProps from 'async-update-props';

import * as PredictionActions from '../actions/prediction';

const mapStateToProps = state => ({
  prediction: state.prediction,
});


export default compose(
  connect(mapStateToProps, { ...PredictionActions }),
)(Main);


// export default compose(
//   connect(mapStateToProps, { ...HotNewsActions, ...CommentsActions })
// )(Main);
