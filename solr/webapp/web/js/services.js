'use strict';

var CoresService = function($http) {
  var service = {
    "coreAdmin": function(callback) {
      var url = '/solr/admin/cores?wt=json';
      $http.get(url, {})
        .error(function(data, status, headers, config) {callback(data, null)})
        .success(function(data, status, headers, config) {
          callback(null, data);
        });
      }
    }
    return service;
}

angular.module('solrServices', []).
  factory('CoresService', CoresService);
