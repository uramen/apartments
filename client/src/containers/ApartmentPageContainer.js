import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ApartmentPage from '../pages/ApartmentPage';

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


const ApartmentPageWithData = graphql(apartmentsListQuery)(ApartmentPage);

export default ApartmentPageWithData;
