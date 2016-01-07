var cheerio = Meteor.npmRequire('cheerio');
Meteor.methods({
    // Bugs
    // gets url html string and returns the title and meta description
    // note works only for attrib name=description not name=twitter:description, property=og:description,etc
    // possible fix http://stackoverflow.com/questions/20677558/using-javascript-regex-get-meta-tags-data-from-a-web-page
    // 
    // most established sites use property=og:title to store the name of their product, instead of the title
    // crazy internet!! possible fix same as above 
    getsite: function (url) {
        check(url, String);
        try{
            result = Meteor.http.get(url).content;
        }
        catch(ex){
            console.log(ex);
            return false;
        }
        $ = cheerio.load(result);
        return {title: $('title').html().trim(), description: $('meta[name=description]').attr("content")};
}});

// start up function that creates entries in the Websites databases.
Meteor.startup(function () {
// code to run on server at startup
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