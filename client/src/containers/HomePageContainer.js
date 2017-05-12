import { connect } from 'react-redux';

import Home from '../pages/HomePage';

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(Home);
