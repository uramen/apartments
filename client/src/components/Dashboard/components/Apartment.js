import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import apartmentImg from '../assets/apartment.jpg';

class Apartment extends Component {
  render() {
    return (
      <div className="apartment">
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
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
      </div>
    );
  }
}

export default Apartment;
