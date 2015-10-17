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


var REQUEST_URL = 'https://demo4405532.mockable.io/smartBins/getBins';

var Bin = require('./bin');
var BinScreen = require('./BinScreen')

var MainScreen = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.bins),
          loaded: true,
        });
      })
      .done();
  },

  selectBin: function(bin: Object) {
    console.log("SelectBin : ",bin);
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: bin.id,
        component: BinScreen,
        passProps: {bin},
      });
    } else {
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
    return (
      <View style={styles.container}>
        <Text>
          Loading bins...
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
