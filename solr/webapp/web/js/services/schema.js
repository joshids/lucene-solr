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

'use strict';

var getFieldsAndTypes = function(base, $http, callback) {
  $http.get(base + '/admin/luke?wt=json&show=schema', {})
    .error(function(data, status, headers, config) {callback(data, null, null)})
    .success(function(data, status, headers, config) {
      var entries = [];
      for (var field in data.schema.fields) {
        entries.push({name: field, type: "field"});
      }
      for (var type in data.schema.types) {
        entries.push({name: type, type: 'type'});
      }
    //  var fields = Object.keys(data.schema.fields); //sort them??
    //  var types = Object.keys(data.schema.types); //sort them??
      callback(null, entries); //fields, types);
/*            var fields = 0;
              for( var key in context.params )
              {
                if( 'string' === typeof context.params[key] && 0 !== context.params[key].length )
                {
                  fields++;
                  $( '[name="' + key + '"]', analysis_form )
                    .val( context.params[key] );
                }
              }

              if( 'undefined' !== typeof context.params.verbose_output )
              {
                verbose_link.trigger( 'toggle', !!context.params.verbose_output.match( /^(1|true)$/ ) );
              }

              if( 0 !== fields )
              {
                analysis_form
                  .trigger( 'execute' );
              }
*/
    });
};

angular.module('solrServices').
  factory('SchemaService', function($http) {
    var service = {
      "getFieldsAndTypes": function(base, callback) {
        getFieldsAndTypes(base, $http, callback);
      },
      "analyzeText": function(base, fieldOrType, indexTimeText, queryTimeText, isVerbose, callback) {
        analyzeText($http, base, fieldOrType, indexTimeText, queryTimeText, isVerbose, callback);
      }
    };
    return service;
  });

    /*** ELEMENTS:
        var analysis_element = $( '#analysis', content_element );
        var analysis_form = $( 'form', analysis_element );
        var analysis_result = $( '#analysis-result', analysis_element );
        analysis_result.hide();

        var verbose_link = $( '.verbose_output a', analysis_element );

        var type_or_name = $( '#type_or_name', analysis_form );
        var schema_browser_element = $( '#tor_schema' );
        var schema_browser_path = app.core_menu.find( '.schema-browser a' ).attr( 'href' );
        var schema_browser_map = { 'fieldname' : 'field', 'fieldtype' : 'type' };

        type_or_name
            function( change )
            {
              var info = $( this ).val().split( '=' );

              schema_browser_element
                .attr( 'href', schema_browser_path + '?' + schema_browser_map[info[0]] + '=' + info[1] );
            }
          );
     *******/
////////////////////////////////////////                        

/**

--------$( '.analysis-error .head a', analysis_element )
          .die( 'click' )
          .live
          (
            'click',
            function( event )
            {
              $( this ).parents( '.analysis-error' )
                .toggleClass( 'expanded' );
            }
          );
                        
--------var check_empty_spacer = function()
        {
          var spacer_holder = $( 'td.part.data.spacer .holder', analysis_result );

          if( 0 === spacer_holder.size() )
          {
            return false;
          }

          var verbose_output = analysis_result.hasClass( 'verbose_output' );

          spacer_holder
            .each
            (
              function( index, element )
              {
                element = $( element );

                if( verbose_output )
                {
                  var cell = element.parent();
                  element.height( cell.height() );
                }
                else
                {
                  element.removeAttr( 'style' );
                }
              }
            );
        }
                        
--------verbose_link
          .die( 'toggle' )
          .live
          (
            'toggle',
            function( event, state )
            {
              $( this ).parent()
                .toggleClass( 'active', state );
                            
              analysis_result
                .toggleClass( 'verbose_output', state );
                            
              check_empty_spacer();
            }
          )
          .die( 'click' )
          .live
          (
            'click',
            function( event )
            {
              $( this ).parent()
                .toggleClass( 'active' );

              analysis_form.trigger( 'submit' );
            }
          );

        var button = $( 'button', analysis_form )

--------var compute_analysis_params = function()
        {
          var params = analysis_form.formToArray();
                          
          var type_or_name = $( '#type_or_name', analysis_form ).val().split( '=' );
          params.push( { name: 'analysis.' + type_or_name[0], value: type_or_name[1] } );
          params.push( { name: 'verbose_output', value: $( '.verbose_output', analysis_element ).hasClass( 'active' ) ? 1 : 0 } );

          return params;
        }
                
--------analysis_form
          .die( 'submit' )
          .live
          (
// On submit, set the URL in the address bar:
              var params = $.param( compute_analysis_params() )
                            .replace( /[\w\.]+=\+*(&)/g, '$1' ) // remove empty parameters
                            .replace( /(&)+/, '$1' )            // reduce multiple ampersands
                            .replace( /^&/, '' )                // remove leading ampersand
                            .replace( /\+/g, '%20' );           // replace plus-signs with encoded whitespaces

              context.redirect( context.path.split( '?' ).shift() + '?' + params );
              return false;
            }
          )
/////////////////////

*/

var getQueryString = function(fieldOrType, indexTimeText, queryTimeText, isVerbose) {
  var params = [];
  console.dir(fieldOrType);
  if (fieldOrType.type == "field") {
    params.push("analysis.fieldname=" + fieldOrType.name);
  } else {
    params.push("analysis.fieldtype=" + fieldOrType.name);
  }
  if (indexTimeText) {
    params.push("analysis.fieldvalue=" + indexTimeText);
  }
  if (queryTimeText) {
    params.push("analysis.query="+ queryTimeText);
  }
  params.push("verbose_output=" + (isVerbose ? 1 : 0));
  return params;
};

var analyzeText = function($http, base, fieldOrType, indexTimeText, queryTimeText, isVerbose, callback) {

  var params = getQueryString(fieldOrType, indexTimeText, queryTimeText, isVerbose);
  var queryString = params.join("&");
  var url = base + '/analysis/field?wt=json&analysis.showmatch=true&' + queryString;
  console.log("url:" + url);
  $http.get(url, {}).
    error(function(data, status, headers, config) {
/*
                    if( 404 === xhr.status )
                    {
                      $( '#analysis-handler-missing', analysis_element )
                        .show();
                    }
                    else
                    {
                      $( '#analysis-error', analysis_element )
                        .show();

                      var response = null;
                      try
                      {
                        eval( 'response = ' + xhr.responseText + ';' );
                      }
                      catch( e )
                      {
                        console.error( e );
                      }

                      $( '#analysis-error .body', analysis_element )
                        .text( response ? response.error.msg : xhr.responseText );
                    }
*/
      callback(data, null, null)
    }).
    success(function(data, status, headers, config) {
      var result;
      if (fieldOrType.type == "field") {
        result = data.analysis.field_names[fieldOrType.name];
      } else {
        result = data.analysis.field_types[fieldOrType.name];
      }
//      console.dir(result);
      var finalResult = {
        index: restructureResults(result.index),
        query: restructureResults(result.query)
      };
//      console.dir(data);
console.log("finalResult:");
      console.dir(finalResult);
      callback(null, finalResult);
    });
};

var generateLegend = function(row) {
  var legends = [];
  for( var key in row[0] ) {
    var key_parts = key.split( '#' );
    var used_key = key_parts.pop();
    var short_key = used_key;

    if (short_key === "positionHistory" || short_key === "match") {
      continue; // skip these values, don't want them in our legend
    }

    var legend = {};
    if(key_parts.length === 1 ) {
      legend.key = key;
    } else {
      legend.key = null;
    }
    legend.used_key = used_key;
    legends.push(legend);
  }
  return legends;
};

var shortenAnalyzerName = function(analyzer_name) {
  var analyzer_short = -1 !== analyzer_name.indexOf( '$' )
                       ? analyzer_name.split( '$' )[1]
                       : analyzer_name.split( '.' ).pop();
  analyzer_short = analyzer_short.match( /[A-Z]/g ).join( '' );
  return analyzer_short;
};

var restructureResults = function(data) {
  if (data === undefined) {
    return [];
  }
  var rows = [];
  // restructure
  for (var i=0; i<data.length; i+=2) {
    var className = data[i].replace( /(\$1)+$/g, '' );
    var shortName = shortenAnalyzerName(className);
    var tokenDetails = data[i+1];
    var row = {name: className, shortName: shortName, legend: generateLegend(tokenDetails)};
    if ("string" === typeof tokenDetails) {
      row.rows = [{'text': tokenDetails}];
    } else {
      row.rows = tokenDetails;
    }
    rows.push(row);
  }
  return rows;
};

//disable analysis button on click
//hide error block on success
                                    
/*
       -- var generate_class_name = function( type )
          {
            var classes = [type];
            if( 'text' !== type )
            {
              classes.push( 'verbose_output' );
            }
            return classes.join( ' ' );
          }
*/                    

var getGlobalElementsCount = function(data, type) {
  var global_elements_count = 0;
  for( var i = 0; i < data[type].length; i += 2 ) {
    var tmp = {};
    var cols = data[type][i+1].filter(function( obj ) {
      var obj_position = obj.position || 0;
      if( !tmp[obj_position] ) {
        tmp[obj_position] = true;
        return true;
      }
      return false;
     });
     global_elements_count = Math.max( global_elements_count, cols.length );
  }
  return global_elements_count;
};
/*
                  var colspan = 1;
                  var elements = analysis_data[type][i+1];
                  var elements_count = global_elements_count;
                  
                  if( !elements[0] || !elements[0].positionHistory )
                  {
                    colspan = elements_count;
                    elements_count = 1;
                  }
*/
/*
                var analysis_result_type = $( '.' + type, analysis_result );

                for( var i = 0; i < analysis_data[type].length; i += 2 )
                {
                  for( var j = 0; j < analysis_data[type][i+1].length; j += 1 )
                  {
                    var pos = analysis_data[type][i+1][j].positionHistory
                        ? analysis_data[type][i+1][j].positionHistory[0]
                        : 1;
                    var selector = 'tr.step:eq(' + ( i / 2 ) +') '
                                 + 'td.data:eq(' + ( pos - 1 ) + ') '
                                 + '.holder';
                    var cell = $( selector, analysis_result_type );

                    cell.parent()
                      .removeClass( 'spacer' );

                    var table = $( 'table tr.details', cell );
                    if( 0 === table.size() )
                    {
                      cell
                        .html
                        (
                        );
                      var table = $( 'table tr.details', cell );
                    }

                    var tokens = [];
                    for( var key in analysis_data[type][i+1][j] )
                    {
                      var short_key = key.split( '#' ).pop();
                                            
                      var classes = [];
                      classes.push( generate_class_name( short_key ) );

                      var data = analysis_data[type][i+1][j][key];
                      if( 'object' === typeof data && data instanceof Array )
                      {
                        data = data.join( ' ' );
                      }
                      if( 'string' === typeof data )
                      {
                        data = data.esc();
                      }

                      if( null === data || 0 === data.length )
                      {
                        classes.push( 'empty' );
                        data = '&empty;';
                      }

                      if( analysis_data[type][i+1][j].match && 
                        ( 'text' === short_key || 'raw_bytes' === short_key ) )
                      {
                        classes.push( 'match' );
                      }

*/
