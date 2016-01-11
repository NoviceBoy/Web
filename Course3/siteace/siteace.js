Websites = new Mongo.Collection("websites");

Websites.allow({
	update:function(userId, doc){
		console.log("testing security on image update");
		if (Meteor.user()){// they are logged in
			return true;
		} else {// user not logged in - do not let them update  (rate) the image. 
			return false;
		}
	},

	insert:function(userId, doc){
		console.log("testing security on image insert");
		if (Meteor.user()){// they are logged in
			// the user is logged in, the image has the correct user id
			return true;
		}
		else {// user not logged in
			return false;
		}
	},
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
						{ title: { '$regex': searchString, '$options': 'i' }}, 
						{ description: { '$regex': searchString, '$options': 'i' }} 
						]},
					{ sort: { upvotes: -1}});
			} else {
				return Websites.find({}, { sort: { upvotes: -1}, 
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
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Up voting website with id "+website_id);
			// put the code in here to add a vote to a website!
			Websites.update({_id:website_id}, 
							{$set: {upvotes:this.upvotes + 1}});

			return false;// prevent the button from reloading the page
		}, 
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Down voting website with id "+website_id);

			// put the code in here to remove a vote from a website!
			Websites.update({_id:website_id}, 
							{$set: {downvotes:this.downvotes + 1}});

			return false;// prevent the button from reloading the page
		}
	})

	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){

			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;
			console.log("The url they entered is: "+url);
			
			//  put your website saving code in here!
			if (Meteor.user()){
				Websites.insert({
					title: event.target.title.value,
					url: event.target.url.value,
					description: event.target.description.value,
					upvotes:0, 
					downvotes:0,
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
    	console.log("No websites yet. Creating starter data.");
    	  Websites.insert({
    		title:"Goldsmiths Computing Department", 
    		url:"http://www.gold.ac.uk/computing/", 
    		description:"This is where this course was developed.", 
    		upvotes: 782,
    		downvotes: 500,
    		comments:[ { user: "Sasha",
    					 comment: "I study here"}, 
    					{ user: "Lydia",
    					 comment: "I plan to go there this fall"},
    					],
    		createdOn:new Date()
    	});
    	 Websites.insert({
    		title:"University of London", 
    		url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route", 
    		description:"University of London International Programme.", 
    		upvotes: 784,
    		downvotes: 500,
    		comments:[ { user: "Rob",
    					 comment: "Its very near to my place"}, ],
    		createdOn:new Date()
    	});
    	 Websites.insert({
    		title:"Coursera", 
    		url:"http://www.coursera.org", 
    		description:"Universal access to the world’s best education.", 
    		upvotes: 781,
    		downvotes: 500,
    		comments:[ { user: "Aaron",
    					 comment: "I use this all the time"}, ],
    		createdOn:new Date()
    	});
    	Websites.insert({
    		title:"Google", 
    		url:"http://www.google.com", 
    		description:"Popular search engine.",
    		upvotes: 786, 
    		downvotes: 500,
    		comments:[ { user: "Bob",
    					 comment: "A really useful website"}, ],
    		createdOn:new Date()
    	});
    }
  });
}
