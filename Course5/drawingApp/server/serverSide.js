points = new Meteor.Collection('pointsCollection');
drawings = new Meteor.Collection('drawings')

Meteor.startup(function () {
  // create a starter dict
  points.insert({brushType:"line", data:[]});
  points.insert({brushType:"circle", data:[]});
});

Meteor.methods({
  'clear': function () {
    //points.remove({});
    points.update({brushType:"line" }, { $set : { data:[] } });
  	points.update({brushType:"circle" }, { $set : { data:[] } });
  },
  'save': function(name){
  	var data = points.find({}).fetch();
  	drawings.insert({filename:name, data:data});
  },
  'load': function (name) {
    //points.remove({});
    var file = drawings.findOne({filename:name});
    //console.log( file.data )
    file.data.forEach(function( item, index ){
 		points.update({brushType:item.brushType }, { $set : { data:item.data } });;   	
    })   
  },
});
