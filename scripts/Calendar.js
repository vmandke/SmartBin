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
    handleClick: function () {
      NativeModules.DateAndroid.showDatepicker(function() {}, function(date) {
        console.log(date);
      });
    },
    render: function() {
        return (
            <View style={styles.container}>
              <TouchableOpacity onPress={this.handleClick}>
                <Text style={styles.instructions}>
                  Click me
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