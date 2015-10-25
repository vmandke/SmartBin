'use strict';

var GooglePlacesAutocomplete = require('react-native-google-places-autocomplete').create({
  placeholder: 'Search',
  minLength: 2, // minimum length of text to search
  autoFocus: true,
  fetchDetails: true,
  onPress(data, details = null) { // details is provided when fetchDetails = true
    console.log(data);
    console.log(details);
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
});

module.exports = GooglePlacesAutocomplete;
