'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} = React;

var Bin = React.createClass({
	render: function() {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    var binStyle = this.getBackgroundColor(this.props.bin.fillLevel)
    return (
      <View>
      <TouchableElement
          onPress={this.props.onSelect}>
          <View style={styles.container}>
            <View style={binStyle}>
              <View style={styles.binData}>
                <Text style={styles.location}>{this.props.bin.location}</Text>
                <Text style={styles.binID}>{this.props.bin.binID}</Text>
              </View>
              <View style={styles.fillLevel}>
                <Text style={styles.location}>{this.props.bin.fillLevel}</Text>
              </View>
            </View>
          </View>
        </TouchableElement>
      </View>
    );
  },

  getBackgroundColor: function(fillLevel) {
    // 0% - 50% : Green 51% - 70% : Amber 71% - 100%: Red
    var fill = parseFloat(fillLevel);
    var bgColorStyle;
    switch (true) {
      case (fill >= 0.0 && fill <= 50):
        bgColorStyle = styles.binContainerGreen;
        break;
      case (fill >= 51.0 && fill <= 70):
        bgColorStyle = styles.binContainerAmber;
        break;
      case (fill >= 71.0 && fill <= 100):
        bgColorStyle = styles.binContainerRed;
        break;
      default:
        //error
    }
    return bgColorStyle;
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
  binContainerRed: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#c0c0c0",
    marginBottom: 2,
    marginTop: 2,
    backgroundColor: 'red',
  },
  binContainerGreen: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#c0c0c0",
    marginBottom: 2,
    marginTop: 2,
    backgroundColor: 'green',
  },
  binContainerAmber: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#c0c0c0",
    marginBottom: 2,
    marginTop: 2,
    backgroundColor: 'yellow',
  },
  location: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left',
  },
  binID: {
    textAlign: 'left',
  },
  binData: {
    flex: 0.8,
  },
  fillLevel: {
    flex: 0.2
  },
});


module.exports = Bin;