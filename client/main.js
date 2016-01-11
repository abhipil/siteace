/////
// Session variables
/////
// error variable
Session.set("currenterror","You did some shit wrong");
Session.set("imageLimit", 8);
Session.set('website',"multiple");

/////
// Subscriptions
/////
Meteor.subscribe("recommendations",Meteor.userId());

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
// some non-Meteor helper functions
/////
function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

function addRecommendKeys(interest){
	var recos = Recommend.findOne();
	var	search_keys = interest.split(" ");
	if(!recos)
		Recommend.insert({
				user: Meteor.userId(),
				strings:search_keys
			});
	else{
		var oldstrings = recos.strings;
		recos.strings = arrayUnique(oldstrings.concat(search_keys));
		Recommend.update({_id: recos._id},recos);
	}
}