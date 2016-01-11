Websites = new Mongo.Collection("websites");

Websites.allow({
	update:function(userId, doc){
		console.log("testing security on item update");
		if (Meteor.user()){// they are logged in
			return true;
		} else {// user not logged in - do not let them update  (rate) the image. 
			return false;
		}
	},

	insert:function(userId, doc){
		console.log("testing security on item insert");
		if (Meteor.user()){// they are logged in
			// the user is logged in, the image has the correct user id
			return true;
		}
		else {// user not logged in
			return false;
		}
	},
	remove:function(userId, doc){
		if (Meteor.user()){// they are logged in
			// the user is logged in, the image has the correct user id
			return true;
		}
		else {// user not logged in
			return false;
		}
	}
})

if (Meteor.isClient) {

	Router.configure({
		layoutTemplate: 'ApplicationLayout'
	});

	Router.route('/', function () {
		this.render('navbar', {
			to:"navbar"
		});
		this.render('linkList', {
			to:"main"
		});
	});

	Router.route('/link/:_id', function () {
		this.render('navbar', {
			to:"navbar"
	  	});	
	  	this.render('linkDetails', {
	    	to:"main", data:function(){
	    		return Websites.findOne({_id:this.params._id});
	    	}
		});
	});
	Router.route('/update/:_id', function () {
		this.render('navbar', {
			to:"navbar"
	  	});	
	  	this.render('update_item', {
	    	to:"main", data:function(){
	    		return Websites.findOne({_id:this.params._id});
	    	}
		});
	});

	Accounts.ui.config({
		passwordSignupFields: "USERNAME_AND_EMAIL"
	});

  	Session.set("websiteLimit", 6);

	lastScrollTop = 0; 
	$(window).scroll(function(event){
		// test if we are near the bottom of the window
		if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
			// where are we in the page? 
			var scrollTop = $(this).scrollTop();
			// test if we are going down
			if (scrollTop > lastScrollTop){
				// yes we are heading down...
				Session.set("websiteLimit", Session.get("websiteLimit") + 2);
			}
		lastScrollTop = scrollTop;
		}
	})
	/////
	// template helpers 
	/////
	Session.set("searchFilter", undefined );

	// helper function that returns all available websites
	Template.comment_list.helpers({
		comments:function(){
			console.log( this._id );
			return Websites.findOne({_id:this._id}).comments;
		}
	});
	Template.website_list.helpers({
		websites:function(){
			if ( Session.get( "searchFilter") ){
				var searchString = Session.get( "searchFilter");
				console.log( searchString );
				return Websites.find(
					{ $or : [ 
						{ item: { '$regex': searchString, '$options': 'i' }}, 
						{ description: { '$regex': searchString, '$options': 'i' }}, 
						{ testDut: { '$regex': searchString, '$options': 'i' }},
						{ status: { '$regex': searchString, '$options': 'i' }} ,
						{ assignedTo: { '$regex': searchString, '$options': 'i' }}, 
						{ addedBy: { '$regex': searchString, '$options': 'i' }}, 
						{ priority: { '$regex': searchString, '$options': 'i' }},
						]},
					{ sort: { priority: -1}});
			} else {
				return Websites.find({}, { sort: { createdOn: -1}, 
										   limit:Session.get("websiteLimit")});
			}
		}
	});
	Template.linkList.helpers({
		username:function(){
			if ( Meteor.user()){
				return Meteor.user().username;
			} else {
				return "Guest"
			}
		},
		filterSet:function(){
			if ( Session.get( "searchFilter") ){
				return true
			} else {
				return false
			}

		},
		searchWord:function(){
			return Session.get( "searchFilter");
		},
		total:function(){
			return Websites.find().count();
		}
	});
	Template.linkDetails.helpers({
		username:function(){
			if ( Meteor.user()){
				return Meteor.user().username;
			} else {
				return "Guest"
			}
		},
	});

	/////
	// template events 
	/////
	Template.linkList.events({
		"submit .js-search-form":function(event){
			var search = event.target.search.value;
			console.log( search );
			Session.set("searchFilter", search );
			$("#search-form")[0].reset();
			return false;// prevent the button from reloading the page
		},
    	'click .js-unset-filter':function(event){
        	Session.set("searchFilter", undefined);
    	}, 
	});
	Template.linkDetails.events({
		"submit .js-comment-form":function(event){
			var comment = { user: Meteor.user().username,
							comment: event.target.comment.value };

			console.log( comment );
			console.log(this._id)
			//  put your website saving code in here!
			console.log(this.comments)
			if (Meteor.user()){
				Websites.update({_id:this._id},
					{$push: { comments: comment }});
				//document.getElementById("save-website-form").reset();
				$("#comment-form")[0].reset();
			}
			return false;// prevent the button from reloading the page
		}
	});
	Template.website_item.events({
		"click .js-delete-item":function(event){
			// example of how you can access the id for the item in the database
			// (this is the data context for the template)
			var item_id = this._id;
			console.log("Deleting item with id "+item_id);
       		$("#"+item_id).hide('slow', function(){
				Websites.remove({"_id":item_id});
       		})  
		},
	});

	Template.update_item.events({
		"click .js-toggle-update-form":function(event){
			$("#update_form").toggle('slow');
		},
		"submit .js-save-update-form":function(event){
			
			//  put your website saving code in here!
			console.log( )
			if (Meteor.user()){
				Websites.update({_id:this._id}, 
					{ $set : {
						item: event.target.item.value,
						description: event.target.description.value,
						priority:event.target.priority.value,
						testDut: event.target.testDut.value,
						assignedTo: event.target.assignedTo.value,
						log: event.target.log.value,
						status: event.target.status.value
					}
				});
				//document.getElementById("save-website-form").reset();
				//$("#save-update-form")[0].reset();
				$(".js-toggle-update-form").click();

			}
			return false;// stop the form submit from reloading the page

		}
	});
	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){
			//  put your website saving code in here!
			if (Meteor.user()){
				Websites.insert({
					item: event.target.item.value,
					description: event.target.description.value,
					priority:event.target.priority.value,
					testDut: event.target.testDut.value,
					log: "",
					status: "Initiated",
					addedBy: Meteor.user().username,
					assignedTo: event.target.assignedTo.value,
					comments:[],
					createdOn:new Date()
				});
				//document.getElementById("save-website-form").reset();
				$("#save-website-form")[0].reset();
				$(".js-toggle-website-form").click();

			}
			return false;// stop the form submit from reloading the page

		}
	});
}


if (Meteor.isServer) {
	// start up function that creates entries in the Websites databases.
  Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()){
    	console.log("No items yet. Creating starter data.");
    	Websites.insert({
    		item:"DS500 Artesyn PSU", 
    		description:"Artesyn SPD-500-W", 
    		priority: "High",
    		testDut:"Upperlake",
    		status:"On going",
    		log:"www.arista.com",
    		addedBy:"Mike lee",
    		assignedTo: "Andre",
    		comments:[ { user: "Dilip",
    					 comment: "Preliminary FVT done, EDVT on going"}, 
    					{ user: "Ethi",
    					 comment: "Please paste the logs"},
    					],
    		createdOn:new Date()
    	});
    	Websites.insert({
    		item:"Micron DIMM 16GB",  
    		description:"Micron DIMM 16GB PartNo APR123456", 
    		priority: "Low",
    		testDut:"Schooner",
    		status:"On going",
    		log:"www.arista.com",
    		addedBy: "Nick Deng",
    		assignedTo: "Raghu",
    		comments:[ { user: "Raghu",
    					 comment: "Test read write failing cold corner" }, 
    					{ user: "Andre",
    					 comment: "Vendor is onsite,debugging"},
    					],
    		createdOn:new Date()
    	});
    	Websites.insert({
    		item:"120GB SSD for Blackbird", 
    		description:"MediaTek 120GB SSD part no APR12453", 
    		priority: "High",
    		testDut:"Glenbrook",
    		status:"Done",
    		log:"www.arista.com",
    		addedBy: "Nick Deng",
    		assignedTo: "Dilip",
    		comments:[ { user: "Snigdha",
    					 comment: "Item qualified as of 6/2015"}, 
    					{ user: "Ethi",
    					 comment: "Please update the status to done"},
    					],
    		createdOn:new Date()
    	});
    	Websites.insert({
    		item:"Samsung eUSB for Oak", 
    		description:"Samsung 8GB eUSB", 
    		priority: "Medium",
    		testDut:"Oak",
    		status:"On going",
    		log:"www.arista.com",
    		addedBy: "Stephen S",
    		assignedTo: "Ethi",
    		comments:[ { user: "Ethi",
    					 comment: "EDVT on going"}, 
    					],
    		createdOn:new Date()
    	});
    }
  });
}
