angular.module('solr-admin').filter('fromNow', function() {
  return function(date) {
    return moment(date).fromNow();
  }
});
