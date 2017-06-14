import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ApolloClient, { createNetworkInterface, createBatchingNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { reducer as formReducer } from 'redux-form';

import { AUTH_SIGNIN } from './actions';
import authReducer from './reducers/authReducer';
import RequireAuth from './containers/RequireAuth';
import AppContainer from './containers/AppContainer';
import NoMatch from './components/NoMatch';
import HomePageContainer from './containers/HomePageContainer';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import MapContainer from './containers/MapContainer';
import DashboardPageContainer from './containers/DashboardPageContainer';
import ApartmentPageContainer from './containers/ApartmentPageContainer';

const token = localStorage.getItem('token');

const graphqlURI = process.env.REACT_APP_ENV === 'cloud9'
  ? 'https://apartments-uramen.c9users.io:8081/graphql'
  : 'http://localhost:4000/graphql';

const networkInterface = createNetworkInterface({ uri: graphqlURI });

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }

    // Get the authentication token from local storage if it exists
    req.options.headers.token = token ? token : null;
    next();
  }
}]);


const client = new ApolloClient({
  networkInterface,
  shouldBatch: true,
});

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    form: formReducer,
    auth: authReducer,
  }),
  {}, // initial state
  compose(
      applyMiddleware(client.middleware()),
      // If you are using the devToolsExtension, you can add it here also
      window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
);

if (token) {
  // We need to update application state if the token exists
  store.dispatch({ type: AUTH_SIGNIN });
}

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={HomePageContainer} />
        <Route path="signup" component={SignUpPage} />
        <Route path="signin" component={SignInPage} />
        <Route path="apartments" component={RequireAuth(DashboardPageContainer)} />
        <Route path="apartments/:id" component={RequireAuth(ApartmentPageContainer)} />
        <Route path="map" component={RequireAuth(MapContainer)} />
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
