'use strict';

var Calendar = require('./Calendar');
var Bin = require('./bin');
var React = require('react-native');
var BarChart = require('../build/react-native-charts').BarChart;
var {
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  WebView,
} = React;

var chartURL =  'https://demo5985216.mockable.io/getChart/';

var BinScreen = React.createClass({
  getInitialState: function() {
    return {
      startDate:false,
      endDate:false,
      datesSet:false,
    };
  },
  startDate: 'StartDate',
  endDate: 'EndDate',
  imgBlob: null,

  selectStartDate: function(date) {
    this.startDate = 'Selected Start: ' + date;
    this.setState({startDate: true});
    if (this.state.endDate) {
      this.fetchData();
    }
  },

  selectEndDate: function(date) {
    this.endDate = 'Selected End: ' + date;
    this.setState({endDate: true});
    if (this.state.startDate) {
      this.fetchData();
    }
  },

  fetchData: function() {
    fetch(chartURL)
      .then((response) => response.json())
      .then((responseData) => {
        this.imgBlob = responseData.imgBlob;
        this.setState({
          loaded: true,
        });
      })
      .done();
  },

  renderChartView: function() {
    return (
      <View style={styles.container}>
        <BarChart
            dataSets={[
              { 
                fillColor: '#46b3f7', 
                data: [
                  { value: 15 },
                  { value: 10 },
                  { value: 12 },
                  { value: 11 },
                ]
              },
              { 
                fillColor: '#3386b9', 
                data: [
                  { value: 14 },
                  { value: 11 },
                  { value: 14 },
                  { value: 13 },
                ]
              },
            ]}
            graduation={1}
            horizontal={false}
            showGrid={true}
            barSpacing={5}
            style={{
              height: 300,
              margin: 15,
        }}/>
      </View>
    );
  },

  render: function() {
    if (this.state.loaded) {
      return this.renderChartView();
    }

    return (
      <View  style={styles.container}>
        <View style={styles.container}>
          <Bin bin={this.props.bin} />
          <Text>
            {this.props.coverText}
          </Text>
          <Calendar coverText={this.startDate} onSelectDate={this.selectStartDate}/>
          <Calendar coverText={this.endDate} onSelectDate={this.selectEndDate}/>
        </View>
        <View style={styles.web}>
          <Text> Waiting For User Input </Text>
        </View>
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
  web: {
    flex: 1,
    height: 200,
    width: 200
  },
  image: {
    flex: 1,
  },
});

module.exports = BinScreen;
