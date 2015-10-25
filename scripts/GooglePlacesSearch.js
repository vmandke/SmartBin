'use strict';


var GooglePlacesAutocomplete = require('react-native-google-places-autocomplete');

var React = require('react-native');
var {
  View,
} = React;

var GoogleSearchPlaces = React.createClass({
  options: {
    placeholder: 'Search',
    minLength: 2, // minimum length of text to search
    autoFocus: true,
    fetchDetails: true,
    onPress(data, details = null) { // details is provided when fetchDetails = true
      this.props.onSearchSelect(data, details);
    },
    getDefaultValue() {
      return ''; // text input default value
    },
    query: {
      // available options: https://developers.google.com/places/web-service/autocomplete
      key: 'AIzaSyBGL8jxRxWOvbM83FD_WFHT8BKkEa2NQLg',
      language: 'en', // language of the results
      types: '(regions)', // default: 'geocode'
    },
    styles: {
      description: {
        fontWeight: 'bold',
      }
    }
  },
  render: function() {
    var SearchBox;
    this.options.onPress = this.props.onSearchSelect;
    SearchBox = GooglePlacesAutocomplete.create(this.options);
    return (
      <SearchBox />
    );
  },
});
module.exports = GoogleSearchPlaces;
