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
      number
      type
      vk_profile
      images
      rooms
      createdAt
    }
  }
`;


const DashboardPageWithData = graphql(apartmentsListQuery)(DashboardPage);

export default DashboardPageWithData;
