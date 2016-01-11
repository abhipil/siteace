//routing landing page
Router.route('/', function () {
  this.render("welcome", {
    to: "main"    
  });
});
//routing websites list
Router.route('/websites', function () {
	Session.set('website',"multiple");
	Meteor.subscribe("search", undefined);
  	this.render("nav_common", {
    	to: "navbar"
  	});
  	this.render("websites", {
    	to: "main",
    	data: function(){
    		$('#search').val("");
    		Session.set("searchValue", undefined);
    		return true;
    	}
  	});
});
//routing single website
Router.route('/websites/:_id',function () {
	Session.set('website',"single");
	this.render("nav_common", {
	   	to: "navbar"    
	});
    this.render("website", 
    	{
	    	to: "main",
	    	data: function(){
	    		Meteor.subscribe('single', this.params._id);
	    		Meteor.subscribe('allComments');
				return Websites.findOne({});
			}
	    }
	);
});
// Routing search results
Router.route('/websites/search/:search',function () {
	//Session.set('website',"single");
	Meteor.subscribe("search", Session.get("searchValue"));
	this.render("nav_common", {
	   	to: "navbar"    
	});
    this.render("websites", {
    	to: "main",
    	data: function(){
    		Session.set("searchValue", this.params.search);
			return true;
    	}
  	});
});

Router.route('/websites/recommendations/:username',function(){
	Meteor.subscribe("siterecommendations");
	this.render("nav_common", {
	   	to: "navbar"    
	});
	this.render("websites", {
    	to: "main",
    	data: function(){
			return true;
    	}
  	});
});