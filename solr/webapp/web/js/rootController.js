
function RootCtrl($scope, CoresService) {
  $scope.load = function() {
    CoresService.coreAdmin(function(err, cores) {
      $scope.cores = cores;
      $scope.err =err;
      $scope.core = null;
    });
  };

  $scope.setCore = function(core) {
    $scope.core = core.name;
console.log("Core is " + $scope.core);
  }
  $scope.base = "/solr";
  $scope.load();
}

