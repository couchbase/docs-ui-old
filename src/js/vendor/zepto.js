;(function () {
  'use strict'
  require('zepto/src/zepto')
  require('zepto/src/selector')
  require('zepto/src/event')
  require('zepto/src/ajax')
  var $ = window.$
  $.extend($.fn, {
    animate: $.fn.css,
    fadeIn: $.fn.show,
    fadeOut: $.fn.hide,
    outerHeight: function () {
      var el = this
      return ['padding-top', 'padding-bottom', 'border-top-width', 'border-bottom-width'].reduce(function (acc, prop) {
        return (acc += parseInt(el.css(prop)))
      }, el.height())
    },
  })
})()
