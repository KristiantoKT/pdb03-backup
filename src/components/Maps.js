import React, { Component } from "react";
import { compose } from "recompose";
import axios from "axios";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

/**
 * Reference: https://gist.github.com/jwo/43b382fc60eb09d3a415c9953f4057f8
 */
const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: 40.712, lng: -74.006 }}>
      {props.markers.map(marker => {
				const markerData = marker._source
				const onClick = props.onClick.bind(this, marker)
				const collisionId = markerData['COLLISION_ID']
				const latitude = parseFloat(markerData['LATITUDE'])
				const longitude = parseFloat(markerData['LONGITUDE'])
        return (
					<Marker
            key={collisionId}
            onClick={onClick}
            position={{ lat: latitude, lng: longitude }}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                    <b>Collision ID: {markerData['COLLISION_ID']}</b><br></br>
                    Accident Date & Time: {markerData['ACCIDENT DATE']}, {markerData['ACCIDENT TIME']}
                </div>
              </InfoWindow>
            }
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

export default class Maps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      crashes: [],
      selectedMarker: false
    }
  }

  async componentDidMount() {
    const query = {	
      "sort":[{
        "ACCIDENT DATE": {
          "order": "desc"
        }
      }]
    }
    await axios.get('http://35.193.23.202:9200/accident/_search?size=250', {
      params: {
        source: JSON.stringify(query),
        source_content_type: 'application/json'
      }
    }).then((response) => {
      console.log(response);
      this.setState({crashes : response.data.hits.hits});
    });
  }

  handleClick = (marker, event) => {
    this.setState({ selectedMarker: marker })
  }

  render() {
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.crashes}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=weekly&key=AIzaSyBTJ6zgwgltbRXG980oIUIBmFug3e3j2SE"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `500px`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}
