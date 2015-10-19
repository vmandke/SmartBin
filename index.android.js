'use strict';

var React = require('react-native');
var {
  AppRegistry,
  BackAndroid,
  Navigator,
  StyleSheet,
  ToolbarAndroid,
  View,
} = React;


var MainScreen = require('./scripts/MainScreen');
var BinScreen = require('./scripts/BinScreen')
var _navigator;

var TabNavigator = require('./build/react-native-tab-navigator/TabNavigator')
var TabNavigatorItem = require('./build/react-native-tab-navigator/TabNavigatorItem')

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  if (route.name === 'bins') {
    return (
      <MainScreen navigator={navigationOperations}/>
    );
  } else if (route.name === 'Bin-Data') {
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          actions={[]}
          logo={require('image!trash_24')}
          navIcon={require('image!ic_arrow_back_black_24dp')}
          onIconClicked={navigationOperations.pop}
          style={styles.toolbar}
          titleColor="white"
          title={route.bin.id} />
        <BinScreen
          style={{flex: 1}}
          navigator={navigationOperations}
          bin={route.bin}
        />
      </View>
    );
  }
};

var AwesomeProject = React.createClass({

  getInitialState: function () {
    return {
      selectedTab: 'BINS'
    }
  },

  render: function() {
    var initialRoute = {name: 'bins', index: 0};
    return (
       <TabNavigator>
        <TabNavigator.Item
            selected={this.state.selectedTab === 'BINS'}
            title="BINS"
            onPress={() => this.setState({ selectedTab: 'BINS' })}>

              <Navigator
                style={styles.container}
                initialRoute={initialRoute}
                renderScene={RouteMapper} />

        </TabNavigator.Item>
      </TabNavigator>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
module.exports = AwesomeProject;
