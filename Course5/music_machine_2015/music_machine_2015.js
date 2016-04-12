
//This code is for everyone. Could go in common.js
MusicMachine = new Mongo.Collection("musicMachine");

Router.route('/', {
    waitOn: function () {
    	console.log("Waiting");
        return Meteor.subscribe('musicMachine');
    },
    action: function () {
        // render all templates and regions for this route
        this.render();
    }
});

if (Meteor.isClient) {
  Meteor.startup(function () {
});
  Meteor.subscribe('musicMachine');

  Template.playground.helpers({

    "startdac": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.start == 1 ) {
        	var val = MusicMachine.findOne({});
        	playAll();
        	$(".startButton").html( "MUTE ALL");
        } else {
        	stopAll();
        	$(".startButton").html( "UNMUTE ALL");
        }
        Session.set( 'startdac', starter.start );
      }
      return Session.get('startdac');
    },

    "drums": function () {

      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.drums) {
          playDrums();
          $(".myButton1").html( "STOP");
        } else {
          stopDrums();

          $(".myButton1").html( "START");
        }
        Session.set( 'drums', starter.drums );
      }
      return Session.get('drums');
    },

    "bass": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.bassline) {
          playBass();
          $(".myButton2").html( "STOP");
        } else {
          stopBass();
          $(".myButton2").html( "START");
        }
        Session.set( 'bass', starter.bassline );
      }
      return Session.get('bass');
    },

    "arp": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.arp ) {
          playArp();
          $(".myButton3").html( "STOP");
        } else {
          stopArp();
          $(".myButton3").html( "START");
        }
        Session.set( 'arp', starter.arp );
      }
      return Session.get('arp');
    },

    "bassdrum": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.bassdrum) {
          playBassdrum();
          $(".myButton4").html( "STOP");
        } else {
          stopBassdrum();
          $(".myButton4").html( "START");
        }
        Session.set( 'bassdrum', starter.bassdrum );
      }
      return Session.get('bassdrum');
    },

    "hithat": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.hithat ) {
          playHithat();
          $(".myButton5").html( "STOP");
        } else {
          stopHithat();
          $(".myButton5").html( "START");
        }
        Session.set( 'hithat', starter.hithat );
      }
      return Session.get('hithat');
    },

    "cymbal": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.cymbal ) {
          playCymbal();
          $(".myButton6").html( "STOP");
        } else {
          stopCymbal();
          $(".myButton6").html( "START");
        }
        Session.set( 'cymbal', starter.cymbal );
      }
      return Session.get('cymbal');
    },

    "snare": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.snare ) {
          playSnare();
          $(".myButton7").html( "STOP");
        } else {
          stopSnare();
          $(".myButton7").html( "START");
        }
        Session.set( 'snare', starter.snare );
      }
      return Session.get('snare');
    },
    "bass2": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.bass2 ) {
          playBass2();
          $(".myButton8").html( "STOP");
        } else {
          stopBass2();
          $(".myButton8").html( "START");
        }
        Session.set( 'bass2', starter.bass2 );
      }
      return Session.get('bass2');
    },
    //don't forget the commas between each function
//the last one doesn't have to have one!


  	"sliderVal1":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider1').data('uiSlider').value(slider.slide1);
        setSpeed(1, slider.slide1/50);
        return slider.slide1;
      }
    },

  	"sliderVal2":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider2').data('uiSlider').value(slider.slide2);
        setVolume(1, slider.slide2/50);
        return slider.slide2;
      }
    },

  	"sliderVal3":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider3').data('uiSlider').value(slider.slide3);
        setSpeed(2, slider.slide3/50);
        return slider.slide3;
      }
    },

  	"sliderVal4":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider4').data('uiSlider').value(slider.slide4);
        setVolume(2, slider.slide4/50);
        return slider.slide4;
      }
    },
  	"sliderVal5":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider5').data('uiSlider').value(slider.slide5);
        setSpeed(3, slider.slide5/50);
        return slider.slide5;
      }
    },

  	"sliderVal6":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider6').data('uiSlider').value(slider.slide6);
        setVolume(3, slider.slide6/50);
        return slider.slide6;
      }
    },
  	"sliderVal7":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider7').data('uiSlider').value(slider.slide7);
        setSpeed(4, slider.slide7/50);
        return slider.slide7;
      }
    },

  	"sliderVal8":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider8').data('uiSlider').value(slider.slide8);
        setVolume(4, slider.slide8/50);
        return slider.slide8;
      }
    },
  	"sliderVal9":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider9').data('uiSlider').value(slider.slide9);
        setSpeed(5, slider.slide9/50);
        return slider.slide9;
      }
    },

  	"sliderVal10":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider10').data('uiSlider').value(slider.slide10);
        setVolume(5, slider.slide10/50);
        return slider.slide10;
      }
    },
  	"sliderVal11":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider11').data('uiSlider').value(slider.slide11);
        setSpeed(6, slider.slide11/50);
        return slider.slide11;
      }
    },

  	"sliderVal12":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider12').data('uiSlider').value(slider.slide12);
        setVolume(6, slider.slide12/50);
        return slider.slide12;
      }
    },
  	"sliderVal13":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider13').data('uiSlider').value(slider.slide13);
        setSpeed(7, slider.slide13/50);
        return slider.slide13;
      }
    },

  	"sliderVal14":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider14').data('uiSlider').value(slider.slide14);
        setVolume(7, slider.slide14/50);
        return slider.slide14;
      }
    },
  	"sliderVal15":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider15').data('uiSlider').value(slider.slide15);
        setSpeed(8, slider.slide15/50);
        return slider.slide15;
      }
    },

  	"sliderVal16":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider16').data('uiSlider').value(slider.slide16);
        setVolume(8, slider.slide16/50);
        return slider.slide16;
      }
    },


  });


  Template.playground.events({
     "click button.startButton": function () {
      var currentDac = Session.get('startdac');
      currentDac = !currentDac
      Session.set('startdac', currentDac );
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {start: currentDac}});
    },
     "click button.myButton1": function () {
      var currentDac = Session.get('drums');
      currentDac = !currentDac
      console.log( currentDac )
      Session.set('drums', currentDac );
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {drums: currentDac}});
    },
      "click button.myButton2": function () {
      var currentDac = Session.get('bass');
      currentDac = !currentDac
      Session.set('bass', currentDac );
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {bassline: currentDac}});

    },
      "click button.myButton3": function () {
      var currentDac = Session.get('arp');
      currentDac = !currentDac
      Session.set('arp', currentDac );
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {arp: currentDac}});

    },
      "click button.myButton4": function () {
      var currentDac = Session.get('bassdrum');
      currentDac = !currentDac
      Session.set('bassdrum', currentDac );
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {bassdrum: currentDac}});
    },
      "click button.myButton5": function () {
      var currentDac = Session.get('hithat');
      currentDac = !currentDac
      Session.set('hithat', currentDac );
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {hithat: currentDac}});

    },
      "click button.myButton6": function () {
      var currentDac = Session.get('cymbal');
      currentDac = !currentDac
      Session.set('cymbal', currentDac );
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {cymbal: currentDac}});

    },
      "click button.myButton7": function () {
      var currentDac = Session.get('snare');
      currentDac = !currentDac
      Session.set('snare', currentDac );
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {snare: currentDac}});
    },
      "click button.myButton8": function () {
      var currentDac = Session.get('bass2');
      currentDac = !currentDac
      Session.set('bass2', currentDac );
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {bass2: currentDac}});
    },
  });

  Template.playground.onRendered(function() {
    $('h2').hide();
    var handler1 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide1: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider1').data('uiSlider')) {
        $("#slider1").slider({
            slide: handler1,
            min: 0,
            max: 100
        });
    }
    var handler2 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide2: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider2').data('uiSlider')) {
        $("#slider2").slider({
            slide: handler2,
            min: 0,
            max: 100
        });
    }
    var handler3 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide3: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider3').data('uiSlider')) {
        $("#slider3").slider({
            slide: handler3,
            min: 0,
            max: 100
        });
    }
    var handler4 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide4: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider4').data('uiSlider')) {
        $("#slider4").slider({
            slide: handler4,
            min: 0,
            max: 100
        });
    }
    var handler5 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide5: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider5').data('uiSlider')) {
        $("#slider5").slider({
            slide: handler5,
            min: 0,
            max: 100
        });
    }
    var handler6 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide6: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider6').data('uiSlider')) {
        $("#slider6").slider({
            slide: handler6,
            min: 0,
            max: 100
        });
    }
    var handler7 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide7: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider7').data('uiSlider')) {
        $("#slider7").slider({
            slide: handler7,
            min: 0,
            max: 100
        });
    }
    var handler8 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide8: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider8').data('uiSlider')) {
        $("#slider8").slider({
            slide: handler8,
            min: 0,
            max: 100
        });
    }
    var handler9 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide9: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider9').data('uiSlider')) {
        $("#slider9").slider({
            slide: handler9,
            min: 0,
            max: 100
        });
    }
    var handler10 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide10: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider10').data('uiSlider')) {
        $("#slider10").slider({
            slide: handler10,
            min: 0,
            max: 100
        });
    }
    var handler11 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide11: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider11').data('uiSlider')) {
        $("#slider11").slider({
            slide: handler11,
            min: 0,
            max: 100
        });
    }
    var handler12 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide12: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider12').data('uiSlider')) {
        $("#slider12").slider({
            slide: handler12,
            min: 0,
            max: 100
        });
    }
    var handler13 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide13: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider13').data('uiSlider')) {
        $("#slider13").slider({
            slide: handler13,
            min: 0,
            max: 100
        });
    }
    var handler14 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide14: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider14').data('uiSlider')) {
        $("#slider14").slider({
            slide: handler14,
            min: 10,
            max: 100
        });
    }
    var handler15 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide15: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider15').data('uiSlider')) {
        $("#slider15").slider({
            slide: handler15,
            min: 0,
            max: 100
        });
    }
    var handler16 = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide16: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider16').data('uiSlider')) {
        $("#slider16").slider({
            slide: handler16,
            min: 0,
            max: 100
        });
    }
  });
}

if (Meteor.isServer) {
      MusicMachine.remove({});
      if (MusicMachine.find().count() === 0) {
	      MusicMachine.insert({slide1: 50, slide2: 0, slide3:50, slide4:0, slide5:50,
	      					   slide6: 0, slide7: 50, slide8:0, slide9:50, slide10:0,
	      					   slide11: 50, slide12: 0, slide13:50, slide14:0, slide15:50,
	      					   slide16: 0 });
      }
	Meteor.publish("musicMachine", function(){
  		return MusicMachine.findOne();
  	})
}