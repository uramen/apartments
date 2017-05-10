import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Dashboard from '../components/Dashboard';

const apartmentsListQuery = gql`
  query {
    apartments {
      id
      description
    }
  }
`;


const DashboardPageWithData = graphql(apartmentsListQuery)(Dashboard);

export default DashboardPageWithData;
