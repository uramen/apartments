import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import apartmentImg from '../assets/apartment.jpg';

export default ({description}) => {
    return (
    <div className="col-md-6 apartment">
      <div className="flex-wrapp">
        <div className="apartment-image">
          <img src={apartmentImg} alt=""/>
        </div>
        <div className="apartment-info">
          <h4>Чернівецького багатопрофільного ліцею №6</h4>
          <div className="rooms-with-price">
            <span className="rooms">2к</span>
            <span className="price">5000 грн + ком.</span>
          </div>
          <div className="comfort">
            <div className="comfort-blue">
              <FontAwesome name="wifi" />
            </div>
            <div className="comfort-yellow">
              <FontAwesome name="bed" />
            </div>
            <div className="comfort-blue">
              <FontAwesome name="wifi" />
            </div>
            <div className="comfort-yellow">
              <FontAwesome name="bed" />
            </div>
            <div className="comfort-blue">
              <FontAwesome name="wifi" />
            </div>
            <div className="comfort-blue">
              <FontAwesome name="wifi" />
            </div>
            <div className="comfort-blue">
              <FontAwesome name="wifi" />
            </div>
          </div>
        </div>
      </div>
        <p>{description}</p>
    </div>
  );
}
