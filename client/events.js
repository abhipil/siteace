Template.websites.events({
	"click .js-clear-search":function(event){
		Router.go('/websites');
	}
});

Template.website.events({
	"submit .comment-form":function(event){
		if(!Meteor.user()) return;
		var id = this.id.split("-");
		addRecommendKeys(Websites.findOne({_id:id[1]}).title);

	}
});

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
			addRecommendKeys(Websites.findOne({_id:this._id}).title);	
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
});

Template.nav_common.events({
	"click .js-toggle-website-form":function(event){
		$("#website_form").toggle('slow');
		$("#website_form_hidden").hide('slow');
		if($(".js-save-website-form-toggle").children(".badge")[0].innerHTML === "hide")
			$(".js-save-website-form-toggle").children(".badge")[0].innerHTML = "show more";
		return true;
	},
	"submit .js-search":function(event){
		if(Meteor.user()){
			addRecommendKeys(event.target.search.value);
		}
  		Router.go('/websites/search/'+event.target.search.value);
		return false;
	},
	"click .js-collapser":function(event){
		if(Session.get("body-shift"))
			$('body').css("padding-top",Session.get("body-shift"));			
		var shift = Math.floor($("#fixed-navbar").innerHeight())+20;
		shift +="px";
		Session.set("body-shift",shift);
		return true;
	},
	"mouseenter .js-search-input":function(){
		$('[data-toggle="tooltip"]').tooltip();
		return false;
	},
	"click .js-recommend":function(){
		Router.go("/websites/recommendations/"+Meteor.user().username);
		return false;
	}
});	

Template.website_form.events({
	"click .js-save-website-form-toggle":function(event){
		$("#website_form_hidden").toggle('slow');
		if($(".js-save-website-form-toggle").children(".badge")[0].innerHTML === "hide")
			$(".js-save-website-form-toggle").children(".badge")[0].innerHTML = "show more";
		else
			$(".js-save-website-form-toggle").children(".badge")[0].innerHTML = "hide"; 
	},
	"submit .js-save-website-form":function(event){
		var res = false;
		$('.js-form-alert').alert('open');
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
					if(!$(".js-save-website-form-toggle").children(".badge")[0].innerHTML === "hide")
						$(".js-save-website-form-toggle").children(".badge")[0].innerHTML = "hide";
					$('.js-form-alert').alert('close');
				});
			}
			var loading=Blaze.render(Template.loading,document.getElementById("loading"));
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
				$("#website_form").toggle('slow');
				$("#website_form_hidden").hide('slow');
				if($(".js-save-website-form-toggle").children(".badge")[0].innerHTML === "hide")
					$(".js-save-website-form-toggle").children(".badge")[0].innerHTML = "show more";					
				event.target.url.value="";
				event.target.title.value="";
				event.target.description.value="";
			}
		}
		// stop the form submit from reloading the page
		return false;

	},
});
