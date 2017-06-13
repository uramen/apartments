import React, {PropTypes, Component} from "react"
import _ from 'lodash';

import styles from "./assets/component.css"

const MY_API_KEY = "AIzaSyD0IjMC4W1WZYNsennyUn8yoEHKaDqpFTQ"

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";


// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const Map = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    defaultCenter={props.currentCoords}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
      />
    ))}
  </GoogleMap>
));

export default class MapPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentCoords: {
        lat: 48.2895072,
        lng: 25.9314175,
      },

      markers: [],
    };

  }

  componentWillMount() {

    if (typeof window === 'undefined') {
      return
    }
    // grab our googleMaps obj from whever she may lay
    var googleMaps = this.props.googleMaps ||
      (window.google && // eslint-disable-line no-extra-parens
        window.google.maps) ||
      this.googleMaps

    if (!googleMaps) {
      console.error(// eslint-disable-line no-console
        'Google map api was not found in the page.')
      return
    }
    // now grab the services we need
    this.googleMaps = googleMaps
    this.autocompleteService = new googleMaps.places.AutocompleteService()
    this.geocoder = new googleMaps.Geocoder()


  }

  componentDidMount(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(D => this.setState({
        currentCoords: {
          lat: D.coords.latitude,
          lng: D.coords.longitude,
        }
      }))
    }
  };

  componentWillReceiveProps(nextProps) {
    if(!nextProps.data.loading) {
      let address = _.filter(nextProps.data.apartments, T => T.street);
      var markers = [];

      _.map(address, A => {
        this.geocoder.geocode({'address': `Чернівці ${A.street}`}, (results, status) => {
              if (status === 'OK') {
                markers.push({
                    position: {
                      lat: results[0].geometry.location.lat(),
                      lng: results[0].geometry.location.lng(),
                    },
                    key: A.street,
                    defaultAnimation: 2,
                })
              }
              console.log(markers);
              this.setState({markers: markers});
        });
      });
    }
  }

  render(){
    return(
      <Map
        containerElement={
          <div style={{ height: `800px`, width: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        currentCoords={this.state.currentCoords}
        onMapLoad={_.noop}
        onMapClick={_.noop}
        markers={this.state.markers}
        onMarkerRightClick={_.noop}
      />
    )
  }
};
