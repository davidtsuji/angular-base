var modules = require( '../modules' );

module.exports = modules.klass( function () {
  console.log( 'service.class constructor' );

} ).methods( {

  init: function () {
    console.log( 'Service Class Init' );
  }

} );