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
var _navigator;
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
  } 
};

var AwesomeProject = React.createClass({
  render: function() {
    var initialRoute = {name: 'bins', index: 0};
    return (
      <Navigator
        style={styles.container}
        initialRoute={initialRoute}
        renderScene={RouteMapper}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
module.exports = AwesomeProject;