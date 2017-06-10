import React, { Component } from 'react';
import _ from 'lodash';
import './assets/component.css';

import Apartment from './components/Apartment';

export default ({data}) => {
    return (
      <div className="row apartment-list">
        {_.map(data.apartments, (A) =>
          <Apartment
            key={A._id}
            title={A.title}
            description={A.description}
            rooms={A.rooms}
            number={A.number}
            price={A.price}
            type={A.type}
            images={A.images}
          />)}
      </div>
    );
}
