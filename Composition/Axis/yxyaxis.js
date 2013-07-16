/**
Defines a YXY axis system.
Two Y Axis (one left, one right)
One X Axis (bottom)

@class YXYAxis
@extends BaseChart
@constructor
@requires d3,
          basechart,
          axis,
          d3.chart

@author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  // Set up Backbone appropriately for the environment.
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['d3',
      'basechart',
      'axis',
      'd3.chart'],
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
  d3.chart('BaseChart').extend('YXYAxis',{
    /**
    Defines as a mixin a right Y axis, a left Y axis, a X bottom axis

    @method
    */
    initialize : function(){
      this.xaxis = this.mixin('Axis', this.base.append('g')).orient('bottom').axistype('x');
      this.yaxisleft = this.mixin('Axis',this.base.append('g')).orient('left').axistype('y');
      this.yaxisright = this.mixin('Axis', this.base.append('g')).axistype('y').orient('right');

      this.componentsMixins = [];
      this.componentsMixins.push(this.xaxis);
      this.componentsMixins.push(this.yaxisleft);
      this.componentsMixins.push(this.yaxisright);
    },
    /**
    Show whole chart as a grid.

    @method
    @chainable
    */
    showAsGrid : function(){
      this.xaxis.showAsGrid(true);
      this.yaxisleft.showAsGrid(true);
      return this;
    },
    /**
    Propagate height to components

    @method
    @param {Number} newHeight height set for all components
    @chainable
    */
    height : function(newHeight){
      this.h = newHeight;
      this.xaxis.height(newHeight).ytranslate(newHeight);
      this.yaxisright.height(newHeight);
      this.yaxisleft.height(newHeight).tickSize(newHeight);
      return this;
    },
    /**
    Propagate width to components

    @method
    @param {Number} newHeight height set for all components
    @chainable
    */
    width : function(newWidth){
      this.w = newWidth;
      this.xaxis.width(newWidth).tickSize(newWidth);
      this.yaxisright.width(newWidth).xtranslate(newWidth);
      this.yaxisleft.width(newWidth);
      return this;
    },
    /**
    Redefinition of x scale setter

    @method
    @param {Object} scale d3.scale
    @chainable
    */
    setXScale : function(scale){
      this.xaxis.setScale(scale);
      return this;
    },
    /**
    Redefinition of y scale setter

    @method
    @param {Object} scale d3.scale
    @chainable
    */
    setYScale : function(scale){
      this.yaxisleft.setScale(scale);
      this.yaxisright.setScale(scale);
      return this;
    }
  });
 })
);