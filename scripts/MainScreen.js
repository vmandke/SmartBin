'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Platform
} = React;


var Bin = require('./bin');
var BinScreen = require('./BinScreen');
var GooglePlacesAutocomplete = require('./GooglePlacesSearch');

var MainScreen = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      location: 'unknown',
    };
  },

  componentDidMount: function() {
    this.fetchLocation()
    .then((response) => {
      console.log('resolved');
      this.fetchData();
    });
  },

  fetchLocation: function() {
    var positionLL = {latitude: 18.5145387, longitude: 73.81554};
    return new Promise(function(resolve, reject) {
      if (Platform.OS === 'ios') {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            var positionLL = {};
            positionLL.latitude = position.coords.latitude;
            positionLL.longitude = position.coords.longitude;
            console.log(positionLL);
            this.setState({location: positionLL});
            resolve(positionLL);
          }.bind(this),
          function(err) {
            alert(err.code, err.message);
          }.bind(this),
          { enableHighAccuracy: true }
        );
      }
      else {
        this.setState({location: positionLL});
        resolve(positionLL);
      }
    }.bind(this));
  },

  fetchData: function() {
    var url = getRequestURL();
    fetch(url,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        coords: this.state.location,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.bins),
        loaded: true,
      });
    })
    .catch( (error) => console.log(error) )
    .done();
  },

  selectBin: function(bin: Object) {
    console.log('SelectBin : ',bin);
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: bin.id,
        component: BinScreen,
        passProps: {bin},
      });
    }
    else {
      this.props.navigator.push({
        title: 'Bin',
        name: 'Bin-Data',
        bin: bin,
      });
    }
  },

  onSearchSelect: function(data, details) {
    var detLL = details.geometry.location;
    var positionLL = {};
    positionLL.latitude = detLL.lat;
    positionLL.longitude = detLL.lng;
    this.setState({location:positionLL, loaded: false});
    setTimeout(function() {
      this.fetchData();
    }.bind(this), 0);
  },

  render: function() {
    var styleSearchBox;
    if (Platform.OS === 'ios') {
      styleSearchBox = styles.searchBoxIOS;
    }
    else {
      styleSearchBox = styles.searchBoxAND;
    }
    if (!this.state.loaded) {
      return this.renderLoadingView();
      if (this.state.location !== 'unknown') {
        console.log('We need to now fetch Data');
      }
    }

    return (
      <View>
        <View style={styleSearchBox}>
          <GooglePlacesAutocomplete onSearchSelect={this.onSearchSelect}/>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderBin}
          style={styles.listView}
        />
      </View>
    );
  },

  renderLoadingView: function() {
    var loadingString = 'Fetching Location...';
    if (this.state.location !== 'unknown') {
      loadingString = 'Loading bins...';
    }
    return (
      <View style={styles.container}>
        <Text>
          {loadingString}
        </Text>
      </View>
    );
  },

  renderBin: function(
    bin: Object,
    sectionID: number | string,
    rowID: number | string
  )  {
    return (
      <Bin bin={bin} onSelect={() => this.selectBin(bin)}/>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
  searchBoxIOS: {
    paddingTop: 70,
  },
  searchBoxAND: {
  }
});

function getRequestURL() {
  var url;
  if (Platform.OS === 'ios') {
    url = 'http://127.0.0.1:5000/smartBins/getBins';
  }
  else {
    url = 'http://10.0.2.2:5000/smartBins/getBins';
  }
  return url;
}

module.exports = MainScreen;
