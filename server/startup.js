// start up function that creates entries in the Websites databases.
Meteor.startup(function () {
// code to run on server at startup
Websites._ensureIndex({
      "title": "text",
      "description": "text"
    });
if (!Websites.findOne()){
	console.log("No websites yet. Creating starter data.");
	  Websites.insert({
		title:"Goldsmiths Computing Department", 
		url:"http://www.gold.ac.uk/computing/", 
		description:"This is where this course was developed.", 
		createdOn:new Date(),
        createdBy: "anon",
        upvotes: 0,
        downvotes: 0
	});
	 Websites.insert({
		title:"University of London", 
		url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route", 
		description:"University of London International Programme.", 
		createdOn:new Date(),
        createdBy: "anon",
        upvotes: 1,
        downvotes: 0
	});
	 Websites.insert({
		title:"Coursera", 
		url:"http://www.coursera.org", 
		description:"Universal access to the world’s best education.", 
		createdOn:new Date(),
        createdBy: "anon",
        upvotes: 2,
        downvotes: 0
	});
	Websites.insert({
		title:"Google", 
		url:"http://www.google.com", 
		description:"Popular search engine.", 
		createdOn:new Date(),
        createdBy: "anon",
        upvotes: 3,
        downvotes: 0
	});
    Websites.insert({
        title:"Youtube", 
        url:"http://www.youtube.com", 
        description:"Popular video hosting site.", 
        createdOn:new Date(),
        createdBy: "anon",
        upvotes: 4,
        downvotes: 0
    });
    Websites.insert({
        title:"Flickr", 
        url:"http://www.flickr.com", 
        description:"Popular image sharing website.", 
        createdOn:new Date(),
        createdBy: "anon",
        upvotes: 5,
        downvotes: 0
    });
    Websites.insert({
        title:"Central Govt of India", 
        url:"http://www.india.gov.in/", 
        description:"Website of the government of India.", 
        createdOn:new Date(),
        createdBy: "anon",
        upvotes: 6,
        downvotes: 0
    });
    Websites.insert({
        title:"Meteor JS framework", 
        url:"http://www.meteor.com/", 
        description:"Highly popular fullstack JS framework", 
        createdOn:new Date(),
        createdBy: "anon",
        upvotes: 7,
        downvotes: 0
    });
}
});