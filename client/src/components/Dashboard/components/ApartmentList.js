import React, { Component } from 'react';

import Apartment from './Apartment';

class ApartmentList extends Component {
  render() {
    return (
      <div className="apartment-list">
        <Apartment />
        <Apartment />
        <Apartment />
      </div>
    );
  }
}

export default ApartmentList;
