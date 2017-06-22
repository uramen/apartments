import './assets/component.css';
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import Tooltip from 'rc-tooltip';
import { Link } from 'react-router';
import 'rc-tooltip/assets/bootstrap.css';

import _ from 'lodash';

export default class Apartment extends Component {
  constructor(props) {
    super(props);

  }

componentWillReceiveProps(nextProps) {
  this.apartment = _.filter(nextProps.data.apartments, I => I.id === this.props.params.id);
}

  render() {
    return (
       <div className="apartment-details">
           <div className="info">
             <div>
               <h2>Детальна сторінка</h2>
               <p><Link to="/apartments">Головна</Link>/Квартири</p>
             </div>
           </div>
           <div className="detail-white">
             <div className="images">
               {_.get(this.apartment, '[0].images', []).map(src => <img src={src} alt=""/>)}
             </div>
             <div className="description">
               {_.get(this.apartment, '[0].description', '')}
             </div>
           </div>
    </div>
    );
  }
}
