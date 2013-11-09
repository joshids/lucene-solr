'use strict';

/* App Module */

angular.module('solr-admin', ["solrServices", "$strap.directives"]).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', {templateUrl: 'partials/index.html', controller: IndexCtrl}).
    when('/~logging', {templateUrl: 'partials/logging.html', controller: LoggingCtrl}).
    when('/~cores', {templateUrl: 'partials/cores.html', controller: CoresCtrl}).
    when('/~java-properties', {templateUrl: 'partials/java-properties.html', controller: PropertiesCtrl}).
    when('/~threads', {templateUrl: 'partials/threads.html', controller: ThreadsCtrl}).
    when('/:core', {templateUrl: 'partials/dashboard.html', controller: DashboardCtrl}).
    when('/:core/analysis', {templateUrl: 'partials/analysis.html', controller: AnalysisCtrl}).
    when('/:core/config', {templateUrl: 'partials/config.html', controller: ConfigCtrl}).
    when('/:core/dataimport', {templateUrl: 'partials/dataimport.html', controller: DataimportCtrl}).
    when('/:core/documents', {templateUrl: 'partials/documents.html', controller: DocumentsCtrl}).
    when('/:core/plugins', {templateUrl: 'partials/plugins.html', controller: PluginsCtrl}).
    when('/:core/query', {templateUrl: 'partials/query.html', controller: QueryCtrl}).
    when('/:core/replication', {templateUrl: 'partials/replication.html', controller: ReplicationCtrl}).
    when('/:core/schema', {templateUrl: 'partials/schema.html', controller: SchemaCtrl}).
    when('/:core/schemabrowser', {templateUrl: 'partials/schemaBrowser.html', controller: SchemaBrowserCtrl}).
      otherwise({redirectTo: '/'});
}]);
