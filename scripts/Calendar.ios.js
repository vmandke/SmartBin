var React = require('react-native');
var CalendarView = require('react-native-calendar')

var { 
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
  Modal,
  Button
 } = React;

var Calendar = React.createClass({
    
    getInitialState: function() {
      return {
        animated: true,
        modalVisible: false,
        transparent: false,
      };
    },


  _setModalVisible: function(visible) {
    this.setState({modalVisible: visible});
  },

    onDateSelect: function (date) {
        console.log(date);
    },
    handleClick: function() {
        //need to render Calendar
        this._setModalVisible(true)
    },
    render: function() {
      var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;

        return (
           <View>
            

            <Modal
              animated={true}
              transparent={false}
              visible={this.state.modalVisible}>
              <View style={[styles.container, modalBackgroundStyle]}>
                <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                  <CalendarView
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
                      // Customize any pre-defined styles
                      customStyle={{day: {fontSize: 15, textAlign: 'center'}}}  />      
                </View>
              </View>
            </Modal>




          <View style={styles.container}>
              <TouchableOpacity onPress={this.handleClick}>
                <Text style={styles.instructions}>
                  Click me
                </Text>
              </TouchableOpacity>
            </View>

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
    padding: 20,
  },

  innerContainer: {
    borderRadius: 10,
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
});


module.exports = Calendar;
