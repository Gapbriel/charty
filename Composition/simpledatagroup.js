/**
Defines a basic chart to process individual data series

@class SimpleDataGroup
@extends BaseChart
@requires d3,
          d3.chart,
          basechart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  // Set up Backbone appropriately for the environment.
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['d3',
      'd3.chart',
      'basechart'],
      function(d3) {
        // Export global even in AMD case in case this script is loaded with others
        return factory(d3);
    });
  }
  else {
    // Browser globals
    return factory(d3);
  }
}(this, function(d3) {
  d3.chart('BaseChart').extend('SimpleDataGroup', {
    /**
    Returns the next element of the data collection

    @method
    @param {Object} data Data accessor
    @return {Object} next element in the collection
    */
    transform : function (data) {
      var top = data.next();
      return top;
    }
  });
 })
);