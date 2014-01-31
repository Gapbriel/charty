/**
* Base class for charts
* Contains common functionality
* 
* @class BaseChart
* @requires d3,
*           underscore,
*           d3.chart
*
* @author "Marcio Caraballo <marcio.caraballososa@gmail.com>"
*/

(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('charty/basechart',[
      'd3.chart',
      'underscore',
      ],
      function (d3, _) {
        /** Export global even in AMD case in case this script
        * is loaded with others */
        return factory(d3, _);
    });
  }
  else {
    /** Browser globals */
    return factory(d3, _);
  }
}(this, function (d3, _) {

  d3.chart('BaseChart',{
    /**
    * Sets the width for the chart
    * In case chart contains components, width will
    * propagate to them
    *
    * @method width
    * @param {Number} newWidth Width for the chart
    * @chainable
    */
    width : function(newWidth){

      this.w = newWidth;
      if(this.componentsMixins){
        _.each(this.componentsMixins, function (element){
          element.width(newWidth);
        });
      }

      return this;
    },
    /**
    * Sets the height for the chart. Propagates to
    * components.
    *
    * @method height
    * @param {Number} newHeight Height for the chart
    */
    height : function(newHeight){

      this.h = newHeight;
      if(this.componentsMixins){
        _.each(this.componentsMixins, function (element){
          element.height(newHeight);
        });
      }

      return this;
    },
    /**
    * Sets the scale type for the x data mapping chart.
    * Propagates to components
    * 
    * Not all charts use scales. Some can use direct
    * mapping.
    *
    * @method setXScale
    * @param {Oject} LinearScale, OrdinalScale
    * @chainable
    */
    setXScale : function (scale){

      this.xscale = scale;
      if(this.componentsMixins){
        _.each(this.componentsMixins, function (element){
          element.setXScale(scale);
        });
      }

      return this;
    },
    /**
    * Sets the scale type for the y data mapping chart.
    * Propagates to components.
    *
    * Not all charts use scales. Some can use direct
    * mapping.
    * 
    * @method setYScale
    * @param {Oject} LinearScale, OrdinalScale
    * @chainable
    */
    setYScale : function (scale){

      this.yscale = scale;
      if ( this.componentsMixins ){
        _.each(this.componentsMixins, function (element){
          element.setYScale(scale);
        });
      }

      return this;
    },
    /**
    * Keeps outter reference to defined mixins.
    *
    * @method setMixins
    * @chainable
    */
    setMixins : function(){
      if( !this.componentsMixins ){
        this.componentsMixins = [];
      }

      var args = Array.prototype.slice.call(arguments,0),
          self = this;

      _.each(args, function(mixin){
        self.componentsMixins.push(mixin);
      });

      return this;
    },
    /**
    * Propagates the Event Manager to component parts.
    * 
    * @method setEventManager
    * @param {EventManager} evtManager Event Manager for chart.
    * @chainable
    */
    setEventManager : function (evtManager){
      this.eventManager = evtManager;

      _.each(this.componentsMixins, function (mixin){
        if ( mixin.setEventManager ){
          mixin.setEventManager(evtManager);
        }
      });

      return this;
    }
  });
}));