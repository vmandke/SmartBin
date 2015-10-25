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


// var REQUEST_URL = 'http://10.0.2.2:5000/smartBins/getBins';
var REQUEST_URL = 'http://127.0.0.1:5000/smartBins/getBins';

var Bin = require('./bin');
var BinScreen = require('./BinScreen');

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
    var location;
    var promise = new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          console.log(position);
          this.setState({location: position.coords});
          resolve(position);
        }.bind(this),
        function(err) {
          alert(err.code, err.message);
        }.bind(this)
      );
    }.bind(this));
    return promise;
  },

  fetchData: function() {
    console.log(this.state.location);
    fetch(REQUEST_URL,{
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

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
      if (this.state.location !== 'unknown') {
        console.log('We need to now fetch Data');
      }
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderBin}
        style={styles.listView}
      />
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
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = MainScreen;
