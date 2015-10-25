'use strict';
var React = require('react-native');
var {
  Text,
  MapView,
  StyleSheet,
  View
} = React;

var OptimalPath = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text>
          Will Load Map here
        </Text>
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
    height: 150,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
});

module.exports = OptimalPath;
