points = new Meteor.Collection('pointsCollection');
drawings = new Meteor.Collection('drawings')
var canvas;
// we use these for drawing more interesting shapes
var lastX=0;
var lastY=0;
var strokeWidth = 1;
var thickness=1;
var strokeColor = "black";
var brushType = "line";

Meteor.startup( function() {
  canvas = new Canvas();

  Deps.autorun( function() {
    //var linedata = points.findOne({brushType:"line"}).data;
    var cdata = points.findOne({brushType:"circle"}) 
    var ldata = points.findOne({brushType:"line"})
    if( cdata ){
      circledata = points.findOne({brushType:"circle"}).data;
    }
    if( ldata ){
      linedata = points.findOne({brushType:"line"}).data;
    }
    if (canvas) {
      //canvas.draw(linedata, 0 );
      if( cdata ){
        canvas.draw(circledata, 1 );
      }
      if( ldata ){
        canvas.draw(linedata, 0 );
      }
    }
  });
});

Template.saved.helpers({
  files:function(){
    return drawings.find({});
  }
});

Template.saved.events({
  "click button.file-item": function (event) {
    //console.log( this.filename )
    Meteor.call('clear', function() {
      canvas.clear();
    });
    Meteor.call('load', this.filename, function() {
      //alert( "Finished loading")
    });  
  },
});
Template.wall.events({

  "click button.clear": function (event) {
    Meteor.call('clear', function() {
      canvas.clear();
      document.getElementById("line").checked = true;
      lastX=0;
      lastY=0;
      document.getElementById('canvas').click()
    });
  },

  "click .js-toggle-website-form":function(event){
    $("#website_form").toggle('slow');
  }, 
  "submit .js-save-website-form":function(event){

      // here is an example of how to get the url out of the form:
      var name = event.target.name.value;
      console.log("The filename entered is: "+ name);

      Meteor.call('save', name, function() {
        //canvas.clear();
      });
      $("#save-website-form")[0].reset();
      $(".js-toggle-website-form").click();

      return false;// stop the form submit from reloading the page

    },

})

var markPoint = function() {

  var offset = $('#canvas').offset();

// In the first frame, lastX and lastY are 0.
// This means the line gets drawn to the top left of the screen
// Which is annoying, so we test for this and stop it happening.
      strokeColor = document.getElementById('color').value;
      if( document.getElementById('eraser').checked == true ){
        strokeColor = "white";
      }
      thickness = document.getElementById('thickness').value;
      if ( document.getElementById("line").checked == true ){
        brushType = "line";
      }
      else if ( document.getElementById("circle").checked == true ){
        brushType = "circle";
      }

      //points.insert({
      var id = points.findOne( { brushType: brushType })._id
      if( brushType == "line"){
        if (lastX==0) {// check that x was something not top-left. should probably set this to -1
          lastX = (event.pageX - offset.left);
          lastY = (event.pageY - offset.top);
        }
        points.update({ _id:id },
          { $push : { data : {
          //this draws a point exactly where you click the mouse
        // x: (event.pageX - offset.left),
        // y: (event.pageY - offset.top)});


          //We can do more interesting stuff
          //We need to input data in the right format
          //Then we can send this to d3 for drawing


          //1) Algorithmic mouse follower
        // x: (event.pageX - offset.left)+(Math.cos((event.pageX/10  ))*30),
        // y: (event.pageY - offset.top)+(Math.sin((event.pageY)/10)*30)});

          //2) draw a line - requires you to change the code in drawing.js
          x: (event.pageX - offset.left),
          y: (event.pageY - offset.top),
          x1: lastX,
          y1: lastY,
          // We could calculate the line thickness from the distance
          // between current position and last position
          //w: 0.05*(Math.sqrt(((event.pageX - offset.left)-lastX) * (event.pageX - offset.left)
          //  + ((event.pageY - offset.top)-lastY) * (event.pageY - offset.top))),
          // Or we could just set the line thickness using buttons and variable
          w: thickness,
          // We can also use strokeColor, defined by a selection
          c: strokeColor,


        }}}); // end of points.insert()
        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);
      } else {
        points.update({ _id:id },
          { $push : { data : {
          x: (event.pageX - offset.left),
          y: (event.pageY - offset.top),
          w: thickness,
          c: strokeColor,
        }}});
      }
}

Template.canvas.events({
  'click': function (event) {
    //if (Session.get('draw')) {
     markPoint();
     lastX=0;
     lastY=0;
    //}
  },
  'mousedown': function (event) {
    Session.set('draw', true);
  },
  'mouseup': function (event) {
    Session.set('draw', false);
    lastX=0;
    lastY=0;
  },
  'mousemove': function (event) {
    if (Session.get('draw')) {
      markPoint();
    }
  }
});

Template.wall.onCreated(function() {
  this.subscribe("points");
});

Template.canvas.onRendered(function() {
  $(".clear").click();
  document.getElementById('canvas').click();
});
