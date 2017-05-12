import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import DashboardPage from '../pages/DashboardPage';

const apartmentsListQuery = gql`
  query {
    apartments {
      id
      type
      description
      price
      type
      vk_profile
      rooms
      createdAt
    }
  }
`;


const DashboardPageWithData = graphql(apartmentsListQuery)(DashboardPage);

export default DashboardPageWithData;
