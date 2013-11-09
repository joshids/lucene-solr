
function QueryCtrl($scope, $rootScope, $location, $document) {
  if ($scope.core == null) {
    $location.path="/";
  }
  $scope.query = {handler: "/select",
                  q: "*:*",
                  start: 0,
                  rows: 10};

  $scope.search = function() {
 console.log("Core is " + $scope.core);
    var url = "/solr/" + $scope.core + $scope.query.handler + "?q=" + $scope.query.q;
    var iframe = $document.find("result");
    console.dir(iframe);
    console.log(url);
    iframe.attr("src", url);
console.log(iframe.attr("src"));
  };
}

