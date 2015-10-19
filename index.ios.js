'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;


var MainScreen = require('./scripts/MainScreen');
var TabNavigator = require('./build/react-native-tab-navigator/TabNavigator')
var TabNavigatorItem = require('./build/react-native-tab-navigator/TabNavigatorItem')

var AwesomeProject = React.createClass({
  getInitialState: function () {
    return {
      selectedTab: 'BINS'
    }
  },

  render: function() {
    return (
      <TabNavigator>
        <TabNavigator.Item
            selected={this.state.selectedTab === 'BINS'}
            title="BINS"
            onPress={() => this.setState({ selectedTab: 'BINS' })}>

                <NavigatorIOS
                  style={styles.container}
                  initialRoute={{
                    title: 'Bins',
                    component: MainScreen,
                  }}/>

        </TabNavigator.Item>
      </TabNavigator>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
module.exports = AwesomeProject;
