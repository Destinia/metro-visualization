import { compose } from 'redux';
import { connect } from 'react-redux';

import Main from '../components/Main';

const mapStateToProps = () => ({

});


export default compose(
  connect(mapStateToProps),
)(Main);


// export default compose(
//   connect(mapStateToProps, { ...HotNewsActions, ...CommentsActions })
// )(Main);
