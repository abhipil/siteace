var cheerio = Meteor.npmRequire('cheerio');
Meteor.methods({
    // Bugs
    // gets url html string and returns the title and meta description
    // note works only for attrib name=description not name=twitter:description, property=og:description,etc
    // possible fix http://stackoverflow.com/questions/20677558/using-javascript-regex-get-meta-tags-data-from-a-web-page
    // 
    // most established sites use property=og:title to store the name of their product, instead of the title
    // crazy internet!! possible fix same as above 
    //
    // sanitise url string passed below
    getsite: function (url) {
        check(url, String);
        url = "http://"+url;
        try{
            result = Meteor.http.get(url).content;
        }
        catch(ex){
            console.log(ex);
            return false;
        }
        $ = cheerio.load(result);
        return {title: $('title').text().trim(), description: $('meta[name=description]').attr("content")};
    }
});