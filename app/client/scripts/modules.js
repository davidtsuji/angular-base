/* modules */
exports = module.exports = {
  klass: require( 'klass' ),
  routes: require( './routes' )
};

/* classes */
exports.classes = {
  model: require( './classes/model.class' ),
  service: require( './classes/service.class' )
};

/* services */
exports.services = {
  main: {
    name: 'mainService',
    service: require( './services/main.service' )
  },
  person: {
    name: 'personService',
    service: require( './services/person.service' )
  }
};