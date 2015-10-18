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
        this._setModalVisible(false)
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
                    ref="calendar"
                    eventDates={[]}
                    scrollEnabled={false}
                    showControls={true}
                    dayHeadings={['  Sun   ', '  Mon   ', '   Tue   ', '   Wed   ', '   Thu   ', '    Fri   ', '     Sat  ']}
                    titleFormat={'MMMM YYYY'}
                    prevButtonText={'Prev       '}
                    nextButtonText={'       Next'}
                    onDateSelect={(date) => this.onDateSelect(date)}
                    onTouchPrev={() => console.log('Back TOUCH')}
                    onTouchNext={() => console.log('Forward TOUCH')}
                    onSwipePrev={() => console.log('Back SWIPE')}
                    onSwipeNext={() => console.log('Forward SWIPE')}/>
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
