import { compose } from 'redux';
import { connect } from 'react-redux';
import Layout from '../components/Layout';

const mapStateToProps = (state) => ({
  board: state.board,
  newsTime: state.newsTime,
});

export default compose(
  connect(mapStateToProps),
)(Layout);
