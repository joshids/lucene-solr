
function CoresCtrl($scope, $rootScope, $location, CoresService) {
  $scope.reload = function() {
    CoresService.coreAdmin(function(err, cores) {
      $scope.cores = cores;
      $scope.err =err;
    });
  };
  $scope.setCore = function(core) {
    $scope.currentCore = core;
    $location.search({core: core.name});
  }

  if ($location.search().core) {
    var core = $scope.cores.status[$location.search().core];
    $scope.setCore(core);
  }
console.log($scope.core);
}

