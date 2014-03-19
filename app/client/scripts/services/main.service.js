var modules = require( '../modules' );

exports = module.exports = function () {
  return new exports.Service();
};

exports.Service = modules.classes.service.extend( function () {
  console.log( 'mainService constructor' )

} ).methods( {

  init: function () {
    console.log( 'mainService class init' );
  },

  data: {
    item: {},
    items: [],
    new: {}
  }

} );