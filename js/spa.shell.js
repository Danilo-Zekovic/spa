/*
 * spa.shell.js
 * Shell for OSCON Demo
*/

spa.shell = (function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html : String()
      +'<nav>'
      +'<div class="navbar navbar-default" role="navigation">'
      +'<div class="navbar-header">'
      +'<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">'
      +'<span class="sr-only">Toggle navigation</span>'
      +'<span class="icon-bar"></span>'
      +'<span class="icon-bar"></span>'
      +'<span class="icon-bar"></span>'
      +'</button>'
      +'<a class="navbar-brand" href="/">SPA Demo</a>'
      +'</div>'
      +'</div></nav>'
      
      +'<nav class="collapse navbar-collapse navbar-ex1-collapse col-md-8 col-sm-7">'
      +'<ul class="nav nav-sidebar" id="side">'
      +'<li><a href="/">Home</a></li>'
      +'<li><a href="/dates">Date Calculator</a></li>'
      +'<li><a href="/">socket.io Data Channel</a></li>'
      +'<li id="signUp"><a href=""><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>'
      +'<li id="logIn"><a href=""><span class="glyphicon glyphicon-log-in"></span> Login</a></li>'
      +'</ul>'
      +'</nav>'
      
      +'<section><div id="content-main">Feature Content Region'
      + '</div></section>'
      +'<section><div id="content-dates"></div></section>'
      +'<section><div id="content-socket"></div></section>'
      +'<section><div id="content-seo"></div></section>'
    },
      
    stateMap = {
      // View state information
      $container  : undefined,
    },

    jqueryMap = {},

    initModule, setJqueryMap,
    currentMod;

  //----------------- END MODULE SCOPE VARIABLES ---------------


  //--------------------- BEGIN DOM METHODS --------------------
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;

    // Only three regions for now
    jqueryMap = {
      $container : $container,
      $nav       : $container.find('#side'),
      $content   : $container.find('#content-main'),
      $dates     : $container.find('#content-dates'),
      $socket    : $container.find('#content-socket'),
      $seo       : $container.find('#content-seo')
    };
  };
  // End DOM method /setJqueryMap/

  // Begin client-side router methods

  // Base route 
  function index() {
    currentMod.hide();
    currentMod = jqueryMap.$content; 
    jqueryMap.$content.show();
    }

  // One function per feature module
  // Demo two views in same module
  function dates() { 
    // Don't be bad if user keeps clicking same menu choice
    if( currentMod != jqueryMap.$dates ) 
	currentMod.hide();
    // Remember where we're at
    currentMod = jqueryMap.$dates;
    spa.dates.postSection();
    }

  // socket.io uses websockets for client-server data exchange
  function socket() {
    if( currentMod != jqueryMap.$socket )
      currentMod.hide();
    currentMod = jqueryMap.$socket
    spa.socket.postSection();
    }

  // Page crawling when there are no pages
  function seo() {
    if( currentMod != jqueryMap.$seo )
      currentMod.hide();
    currentMod = jqueryMap.$seo;
    spa.seo.postSection();
    // Nothing going on here yet
    }

  // End DOM client-side router methods

  //--------------------- END DOM METHODS ----------------------

  //------------------- BEGIN PUBLIC METHODS -------------------

  // Begin Public method /initModule/
  initModule = function ( $container ) {
    // load HTML and map jQuery collections
    stateMap.$container = $container;
    $container.html( configMap.main_html );

    // Keep track of our elements
    setJqueryMap();

    // Initialize each feature module
    spa.dates.initModule(jqueryMap.$dates);
    jqueryMap.$socket.hide();
    jqueryMap.$seo.hide();
    spa.socket.initModule(jqueryMap.$socket);
    spa.seo.initModule(jqueryMap.$seo);

    // Default content is "home" screen
    currentMod = jqueryMap.$content;

    // Set up routes
    page('/', index);
    page('/dates', dates);
    page('/socket', socket);
    page('/seo', seo);
    page();
    
    $("#log").on("click", function () {
      alert("Coming Soon");
    });

    $("#sign").on("click", function () {
      alert("Coming Soon");
    });
    
    $("#logIn").on("click", function () {
      alert("Coming Soon");
    });

    $("#signUp").on("click", function () {
      alert("Coming Soon");
    });


    $("#signUp").hide();
    $("#logIn").hide();

    if ($(window).width() <= 770) {
      $("#logs").hide();
      $("#signUp").show();
      $("#logIn").show();
    }


    $(window).resize(function () {
      var win = $(this);
      if (win.width() <= 770) {
        console.log('small');
        $("#logs").hide();
        $("#signUp").show();
        $("#logIn").show();
      } else {
        $("#logs").show();
        $("#signUp").hide();
        $("#logIn").hide();
      }
    });


  };

  // Public API
  return { initModule : initModule };
  //------------------- END PUBLIC METHODS ---------------------
}());
