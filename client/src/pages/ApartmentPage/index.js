import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import './assets/component.css';


export default ({data, loading}) => {
  return (
    <div className="apartment-details">
      <div className="info">
        <div>
          <h2>Детальна сторінка</h2>
          <p><Link to="/apartments">Головна</Link>/Квартири</p>
        </div>
      </div>
      <div className="detail-white">
        
      </div>
    </div>
  )
};
