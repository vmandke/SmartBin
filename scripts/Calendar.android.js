var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules
 } = React;

var Calendar = React.createClass({
  handleClick: function() {
    NativeModules.DateAndroid.showDatepicker(function() {}, this.props.onSelectDate);
  },

  render: function() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleClick}>
          <Text style={styles.instructions}>
            {this.props.coverText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    margin: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

module.exports = Calendar;
