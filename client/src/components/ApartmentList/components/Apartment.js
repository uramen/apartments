import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

import _ from 'lodash';

export default class Apartment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleType: false,
      visibleWifi: false,
     }
  }

  handleTypeHover = () => {
      this.setState({
        visibleType: !this.state.visibleType,
      });
  }

  handleWifiHover = () => {
      this.setState({
        visibleWifi: !this.state.visibleWifi,
      });
  }

  render() {
    return (
      <div className="col-md-6 apartment">
        <div className="flex-wrapp">
          <div className="apartment-image">
            <img src={this.props.images[0]} alt=""/>
          </div>
          <div className="apartment-info">
            <h4>{_.truncate(this.props.title, {'length': 24, 'separator': ' '})}</h4>
            <div className="rooms-with-price">
              <span className="rooms">{`${this.props.rooms}к`}</span>
              <span className="price">{`${this.props.price} грн`}</span>
            </div>
            <div className="comfort">
              <Tooltip
                visible={this.state.visibleType}
                animation="zoom"
                trigger={[]}
                overlayStyle={{ zIndex: 1000 }}
                overlay={<span>{this.props.type}</span>}
              >
                  <div className="comfort-yellow" onClick={this.handleTypeHover.bind(this)}>
                    {
                      this.props.type === 'Flat'
                      ? <FontAwesome name="building" style={{paddingLeft: 2, paddingRight: 2}} />
                      : <FontAwesome name="home" />
                    }
                  </div>
              </Tooltip>
              <Tooltip
                visible={this.state.visibleWifi}
                animation="zoom"
                trigger={[]}
                overlayStyle={{ zIndex: 1000 }}
                overlay={<span>wifi</span>}
              >
                  <div className="comfort-blue" onClick={this.handleWifiHover.bind(this)}>
                      <FontAwesome name="wifi" />
                  </div>
              </Tooltip>
            </div>
            
          </div>
        </div>
          <p className="apartment-description">{_.truncate(this.props.description, {'length': 150, 'separator': ' '})}</p>
      </div>
    );
  }
}
