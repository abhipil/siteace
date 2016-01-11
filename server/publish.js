Meteor.publish("search", function(searchValue) {
    if (!searchValue)
        return Websites.find({});
    var cursor = Websites.find(
        { $text: {$search: searchValue} },
        {}
    );
    return cursor;
});

Meteor.publish("single", function(id) {
    return Websites.find({_id:id});
});

Meteor.publish('allComments', function() {
  return Comments.getAll();
});

Meteor.publish('recommendations',function(userid) {
  return Recommend.find({user:userid});
});

Meteor.publish('siterecommendations',function(userid) {
    var recos = Recommend.findOne({user:this.userId});
    return Websites.find({
        $or : [
            { $text: {$search: recos.strings.toString().replace(/,/g , " ")} }
        ]
    });
});