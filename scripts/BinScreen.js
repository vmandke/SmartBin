'use strict';

var React = require('react-native');
var {
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

var BinScreen = React.createClass({
	render: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading bin data...
        </Text>
      </View>
    );
	}
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

module.exports = BinScreen;
