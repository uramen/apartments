import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Map from '../pages/MapPage';

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,

});

const apartmentsListQuery = gql`
  query {
    apartments {
      id
      type
      description
      price
      number
      type
      vk_profile
      images
      street
      rooms
      createdAt
    }
  }
`;

const DashboardPageWithData = graphql(apartmentsListQuery)(Map);
export default connect(mapStateToProps)(DashboardPageWithData);
