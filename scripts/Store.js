'use strict';


var PubSub = require('pubsub-js');
var binToken, locToken; // tokens
var binData, location; //


var api = {
	init: function() {
		// subscribe to all 
		binToken = PubSub.subscribe('bins', saveBinData);
		locToken = PubSub.subscribe('location', saveLocation);
	},

    getBinData: function() {
      var promise = new Promise(function(resolve) {
        if (binData) {
          resolve(binData);
        }
        else {
          resolveBinDataPromise = resolve;
        }
      });
      return promise;
	},

    getLocation: function() {
      var promise = new Promise(function(resolve) {
        if (location) {
          resolve(location);
        }
        else {
          resolveLocationPromise = resolve;
        }
      });
      return promise;
	},
};

function resolveBinDataPromise(data) {
    return data;
};
function resolveLocationPromise(data) {
    return data;
};

function saveBinData( msg, data ) {
    binData = data;
    resolveBinDataPromise(data);
};

function saveLocation( msg, data ) {
    location = data;
    resolveLocationPromise(data);
};


module.exports = api;