var React = require('react-native');
var CalendarView = require('react-native-calendar')

var { 
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules
 } = React;

var Calendar = React.createClass({
    onDateSelect: function (date) {
        console.log(date);
    },
    handleClick: function() {
      var CalendarPicker = <CalendarView
              scrollEnabled={true}              // False disables swiping. Default: True
              showControls={true}               // False hides prev/next buttons. Default: False
              titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
              dayHeadings={['S', 'M', 'T', 'W', 'T', 'F', 'S']}               // Default: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
              prevButtonText={'Prev'}           // Text for previous button. Default: 'Prev'
              nextButtonText={'Next'}           // Text for next button. Default: 'Next
              onDateSelect={(date) => this.onDateSelect(date)} // Callback after date selection
              onTouchPrev={this.onTouchPrev}    // Callback for prev touch event
              onTouchNext={this.onTouchNext}    // Callback for next touch event
              onSwipePrev={this.onSwipePrev}    // Callback for back swipe event
              onSwipeNext={this.onSwipeNext}    // Callback for forward swipe event
              eventDates={['2015-07-01']}       // Optional array of moment() parseable dates that will show an event indicator
              startDate={'2015-08-01'}          // The first month that will display. Default: current month
              selectedDate={'2015-08-15'}       // Day to be selected
              customStyle={{day: {fontSize: 15, textAlign: 'center'}}} // Customize any pre-defined styles
             />
       ReactDOM.render(CalendarPicker, document.getElementById('example'));
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