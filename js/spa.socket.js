/*
 * spa.socket.js
 * Socket.io feature module for OSCON Demo
 * Brian Capouch 
*/

spa.socket = (function () {
  'use strict';
  //--- Begin local variables
  var
    configMap = {
      main_html : String()
        + '<section id="socketIO">Socket.io Demonstration'
        + '<script id="sock_js" src="/js/data.js"></script>'
        + '<button class="btn btn-default" id="sendBtn">Send</button>'
        + '</section>'
    },

    stateMap = {
      $container  : undefined,
    },

    jqueryMap = {},
    initModule, copyAnchorMap, setJqueryMap, setClicks, postSection,
    socketIO, socket, serverURL;
  //--- end local variables

  //--- DOM interaction methods
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    // Overkill for small amount of functionality
    jqueryMap = {
      $container : $container,
      $socketIO  : $container.find('#socketIO')
    };
  };
  // End DOM method /setJqueryMap/

  //--- end DOM-related methods

  //--- Public methods
  // Begin Public method /initModule
  initModule = function ( $container ) {

    // Set to taste
    serverURL = 'http://localhost:8000';
    // serverURL = 'http://knuckle.palaver.net:8000';

    // load HTML and map jQuery collections
    stateMap.$container = $container;
    $container.hide();
    $container.html( configMap.main_html );

    setJqueryMap();

    // Display the value of var "b" from the data.js file
    $(function () {
      jqueryMap.$socketIO.html( b );
    });

    // Set event handler to react to "stylesheet" message 
    io.connect(serverURL).on('script', function (path) {
      console.log('I hear the file has changed' + b );
      $( '#sock_js' ).remove();
      // Replace contents of stylesheet with file from websocket
      // Note which container you append to here is crucial
      jqueryMap.$container.append(
        '<script id="sock_js"  src="'
          + path +
          '"></script>'
      );
      // Redisplay HTML with new styling
      jqueryMap.$socketIO.html( b );
    });

    io.connect(serverURL).on( 'stylesheet', function ( path ) {
      // Get rid of current style
      $( '#sock_css' ).remove();
      // Replace contents of stylesheet with file from websocket
      // Note which container you append to here is crucial
      jqueryMap.$container.append(
        '<link id="sock_css" rel="stylesheet" href="'
          + path +
          '"/>'
      );
      // Redisplay HTML with new styling
      jqueryMap.$socketIO.html( b );
    });
  };

  postSection = function() {
    jqueryMap.$socketIO.show();
    jqueryMap.$container.show();
  };

 
  return { initModule : initModule,
           postSection : postSection
    };
  //--- end public methods
}());
