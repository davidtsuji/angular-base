var modules = require( '../modules' );

exports = module.exports = function () {
  return new exports.Service();
};

exports.Service = modules.classes.service.extend( function () {
  console.log( 'peopleService constructor' )

} ).methods( {

  init: function () {
    var self = this;

    console.log( 'peopleService class init' );

    switch ( self.scope.$routeParams.id ) {
    case '1':
      self.data.item.name = 'David';
      break;

    case '2':
      self.data.item.name = 'Glen';
      break;
    }

  },

  data: {
    item: {
      name: ''
    },
    items: [],
    new: {}
  }

} );