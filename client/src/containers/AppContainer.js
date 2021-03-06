import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import App from '../components/App';

const mapStateToProps = (state, props) => ({
  authenticated: state.auth.authenticated,
  pathname     : props.location.pathname,
  pushURL      : props.router.push,
});

export default connect(
  mapStateToProps
)(App);
