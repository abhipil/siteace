/////
// Session variables
/////
// error variable
Session.set("currenterror","You did some shit wrong");
Session.set("imageLimit", 8);

/////
// accounts-ui
/////
// accounts ui config
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_EMAIL"
});

/////
// comments-ui
/////
// comments ui config
Comments.ui.config({
   template: 'bootstrap' // or ionic, semantic-ui
});

/////
// Iron routing
/////
//routing configure
Router.configure({
  layoutTemplate: "ApplicationLayout"
});
//routing landing page
Router.route('/', function () {
  this.render("welcome", {
    to: "main"    
  });
});
//routing websites list
Router.route('/websites', function () {
  this.render("nav_common", {
    to: "navbar"    
  });
  this.render("websites", {
    to: "main"
  });
});
//routing websites list
Router.route('/websites/:_id', function () {
  this.render("nav_common", {
    to: "navbar"    
  });
  this.render("website", {
    to: "main",
    data:function(){
      return Websites.findOne({_id:this.params._id});
    }    
  });
});

/////
// jQuery magic
/////
//infinite scroll
lastScrollTop = 0;
$(window).scroll(function(event){
  if($(window).scrollTop()+$(window).height()>$(document).height()-100){
    var scrollTop = $(this).scrollTop();
    if(scrollTop>lastScrollTop){
      //does not stop incrementing even after database expires
      Session.set("imageLimit", Session.get("imageLimit")+4);
    }
    lastScrollTop = scrollTop;
  }
});
/////
// template helpers 
/////
// helper function that returns all available websites
Template.website_list.helpers({
	websites:function(){
		return Websites.find({},
			{
				sort: {
					upvotes: -1,
					createdOn:-1
				},
				limit: Session.get("imageLimit")
			});
	}
});

Template.error_modal.helpers({
	error: function(){
		return Session.get("currenterror");
	}
});

Template.website_item.helpers({
	getDate:function(date) {
  		return moment(date).format('lll');
  	}
});

/////
// template events 
/////

Template.website_item.events({
	"click .js-upvote":function(event){
		// put the code in here to add a vote to a website!
		if(Meteor.user()){
			Websites.update(
				this._id, 
				{
					$set: {upvotes: this.upvotes+1}
				}
			);
			return true;
		}
		Session.set("currenterror","Please login or register to upvote");
		$("#myModal").modal('show');
		return false;// prevent the button from reloading the page
	}, 
	"click .js-downvote":function(event){
		// put the code in here to remove a vote from a website!
		if(Meteor.user()){
			Websites.update(
				this._id, 
				{
					$set: {downvotes: this.downvotes+1}
				}
			);
			return true;
		}
		Session.set("currenterror","Please login or register to downvote");
		$("#myModal").modal('show');
		return false;// prevent the button from reloading the page
	}
})

Template.nav_common.events({
	"submit .js-search":function(event){
		console.log(event.target)
		return false;
	}
});
Template.website_form.events({
	"click .js-toggle-website-form":function(event){
		$("#website_form").toggle('slow');
	},
	"click .js-save-website-form-toggle":function(event){
		$("#website_form_hidden").toggle('slow');
		var link = $(".js-save-website-form-toggle").children(".badge")[0].innerHTML;
		if(link === "hide")
			$(".js-save-website-form-toggle").children(".badge")[0].innerHTML = "show more";
		else
			$(".js-save-website-form-toggle").children(".badge")[0].innerHTML = "hide"; 
	},
	"submit .js-save-website-form":function(event){
		var res = false;
		if(Meteor.user()){
			if(!event.target.url.value){
				Session.set("currenterror","Please enter a valid URL for the website to proceed with the submission");
				$("#myModal").modal('show');
				return false;
			}
			if(!event.target.title.value || !event.target.description.value){
				// Bugs
				// Meteor call is asynchronous, meaning the empty fields are filled only after the
				// url has been fetched. The user does not see this happening and for a particularly
				// long fetch may get distracted and click some link
				// fix #1: display loading spinner and make user wait
				// fix #2: Use a synchrounous Method call, simple:reactive-method 
				res = Meteor.call('getsite',event.target.url.value,function(error,result){
						if(error)
						console.log("async");
						if(result){
							if(result.title)
								event.target.title.value = result.title;
							if(result.description)
								event.target.description.value = result.description;
						}
						if(!result.title || !result.description){
							Session.set("currenterror","Looks like the site you entered does not have enough information about itself. Bummer, why dont you just fill out the missing stuff yourself!");
							$("#myModal").modal('show');
						}
						$("#website_form_hidden").show('slow');
						if($(".js-save-website-form-toggle").children(".badge")[0].innerHTML === "hide")
							$(".js-save-website-form-toggle").children(".badge")[0].innerHTML = "show more";
						else
							$(".js-save-website-form-toggle").children(".badge")[0].innerHTML = "hide";					});
			}
			if(!event.target.title.value || !event.target.title.value || !event.target.description.value)
				return false;
			else {
				Websites.insert({
								title: event.target.title.value, 
								url: event.target.url.value, 
								description: event.target.description.value, 
								createdOn: new Date(),
								createdBy: Meteor.userId(),
						        upvotes: 0,
						        downvotes: 0
				});
				return true;			
			}
		}
		return false;// stop the form submit from reloading the page

	},
});