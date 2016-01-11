// helper function that returns all available websites
Template.websites.helpers({
	// helps websites template to display the clear search button 
	search: function(){
		if(Session.get("searchValue"))
			return true;
		return false;
	}
});

Template.website.helpers({
	commentid:function(){
		return "comment-"+this._id;
	}
});
Template.website_list.helpers({
	websites:function(){
		return Websites.find({},
			{
				sort: {
					upvotes: -1,
					createdOn:-1
				},
				limit: Session.get("imageLimit")
	     	}
	     );
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
  	},
  	single: function(){
  		if(Session.get('website') === 'single')
  			return true;
  		return false;
  	}
});

Template.website_form.helpers({
	loadings:function(){
		return "loading";
	}
});