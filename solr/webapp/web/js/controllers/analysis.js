/*
 Licensed to the Apache Software Foundation (ASF) under one or more
 contributor license agreements.  See the NOTICE file distributed with
 this work for additional information regarding copyright ownership.
 The ASF licenses this file to You under the Apache License, Version 2.0
 (the "License"); you may not use this file except in compliance with
 the License.  You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

function AnalysisCtrl($scope, $rootScope, $location, SchemaService) {

  $scope.initialize = function() {
    $scope.isLoading = true;
    SchemaService.getFieldsAndTypes($scope.base, function(err, fieldsAndTypes) {
      $scope.fieldsAndTypes = fieldsAndTypes;
      $scope.isLoading = false;
    });
  };
  $scope.initialize();
  $scope.fieldOrType="";

  $scope.analyzeText = function() {
    console.log("Analysing " + $scope.fieldOrType.name + " which is a " + $scope.fieldOrType.type);
    SchemaService.analyzeText($scope.base, $scope.fieldOrType, $scope.indexTimeText, $scope.queryTimeText, $scope.isVerbose, function(err, analysisResult) {
       if (err) {alert(err);return;}
       $scope.analysisResult = analysisResult;
       console.dir($scope.analysisResult);
/*
$scope.analysisResult = {
  index: [
    {
    name: "org.apache.lucene.StandardTokenizer",
    short_name: "ST",
    legend: [
      "text",
      "raw_bytes",
      "start",
      "end",
      "type",
      "position"],
    rows: [
     ["hello", "[12 12 12]", 0, 5, "<ALPHA>", 1],
     ["there", "[24 44 AA]", 6, 11, "<ALPHA>", 2],
     ["bill", "[24 44 AA]", 12,15, "<ALPHA>", 3]
    ]
   },
   {
    name: "org.apache.lucene.StopFilter",
    short_name: "SF",
    legend: [
      "text",
      "raw_bytes",
      "start",
      "end",
      "type",
      "position"],
    rows: [
     ["hello", "[12 12 12]", 0, 5, "<ALPHA>", 1],
     [],
     ["bill", "[24 44 AA]", 12,15, "<ALPHA>", 3]
    ]
   }
  ],
  query: [
  ]
};
*/
  });
}
}
