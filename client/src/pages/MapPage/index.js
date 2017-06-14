import React, {PropTypes, Component} from "react"
import _ from 'lodash';
import { Link } from 'react-router';

import styles from "./assets/component.css"

const MY_API_KEY = "AIzaSyD0IjMC4W1WZYNsennyUn8yoEHKaDqpFTQ"

import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";


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
        onClick={() => props.onMarkerClick(marker)}
      >

      {marker.showInfo && (
           <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
             <div className="marker-apartment">
               <div className="small-img">
                   <img src={marker.content.image}/>
               </div>
               <div className="price">{`${marker.content.price} грн`}</div>
               <hr/>
               <div className="phone">{marker.content.phone}</div>
               <hr/>
               <Link to={`/apartments/${marker.content.id}`}>Детально</Link>
             </div>
           </InfoWindow>
         )}
      </Marker>
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
                    content: {
                      id   : A.id,
                      image: A.images[0],
                      price: A.price,
                      phone: A.number
                    },
                    showInfo: false,
                    key: A.street,
                    defaultAnimation: 2,
                })
              }
              this.setState({markers: markers});
        });
      });
    }
  }

  // Toggle to 'true' to show InfoWindow and re-renders component
handleMarkerClick(targetMarker) {
  this.setState({
    markers: this.state.markers.map(marker => {
      if (marker === targetMarker) {
        return {
          ...marker,
          showInfo: true,
        };
      }
      return marker;
    }),
  });
}

handleMarkerClose(targetMarker) {
  this.setState({
    markers: this.state.markers.map(marker => {
      if (marker === targetMarker) {
        return {
          ...marker,
          showInfo: false,
        };
      }
      return marker;
    }),
  });
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
        onMarkerClick={this.handleMarkerClick.bind(this)}
        onMarkerClose={this.handleMarkerClose.bind(this)}
      />
    )
  }
};
