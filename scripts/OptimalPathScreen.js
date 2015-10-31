'use strict';
var React = require('react-native');
var {
  Text,
  MapView,
  StyleSheet,
  View
} = React;


var Store = require('./Store');

var OptimalPath = React.createClass({
  getInitialState: function() {
    return {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      markers: [],
    };
  },
  componentDidMount: function() {
    Store.getLocation()
    .then((data) => {
      console.log('Store::', data);
      this.setState({
        region: {
          longitude: parseFloat(data.longitude),
          latitude: parseFloat(data.latitude),
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }
      });
    });

    Store.getBinData()
    .then((data) => {
      var latitudeDelta = Math.max.apply(null, data.bins.map(function(bin) {
        return Math.abs(this.state.region.latitude - bin.latitude);
      }.bind(this)));
      var longitudeDelta = Math.max.apply(null, data.bins.map(function(bin) {
        return Math.abs(this.state.region.longitude - bin.longitude);
      }.bind(this)));
      var region = {};
      region.longitude = this.state.region.longitude;
      region.latitude = this.state.region.latitude;
      region.latitudeDelta = latitudeDelta;
      region.longitudeDelta = longitudeDelta;
      this.setState({ region: region, markers: data.bins });
    });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          annotations={this.state.markers}/>
      </View>
      );
  }
});

var styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
});

module.exports = OptimalPath;
