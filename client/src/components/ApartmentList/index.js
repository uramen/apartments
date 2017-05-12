import React, { Component } from 'react';
import './assets/component.css';

import Apartment from './components/Apartment';

class ApartmentList extends Component {
  render() {
    return (
      <div className="row apartment-list">
        <Apartment />
        <Apartment />
        <Apartment />
        <Apartment />
        <Apartment />
      </div>
    );
  }
}

export default ApartmentList;
