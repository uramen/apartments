import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import App from '../components/App';

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
});

export default connect(
  mapStateToProps
)(App);
