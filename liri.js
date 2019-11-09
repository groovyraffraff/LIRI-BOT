// required 
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

// spotify keys
require("dotenv").config();
var env = process.env;
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: env.SPOTIFY_ID,
    secret: env.SPOTIFY_SECRET
});

//variable objects for easy log in txt (this just makes my life slightly easier idk if this is propper)
var songText = ["Artist: ","Song: ", "Listen to the song: ","Album: "]
var movieText = [ "Title: ","Year: ","IMDB Rating: ","Rotten Tomatoes: ","Country: ","Language: ","Plot: ","Starring: "]
var concertText = ["Venue: ","City: ","Date: "]

//var for lookups like "concert-this", "spotify-this-song", "movie-this", "do-what-it-says"
var searchMethod = process.argv[2];

// variable for artist or movie 
var searchTerm = process.argv[3];

// better looking print 
var newLine = "\r\n";
var lineBreakBar = "_________________________________________________";

// conditional for empty/null song search
// set variables before the function is run
if ((searchMethod === "spotify-this-song") && (searchTerm == null)) {
    searchTerm = "Strawberry Fields The Beatles";
}
// conditional for empty/null movie search)
if ((searchMethod === "movie-this") && (searchTerm == null)) {
    searchTerm = "Mr. Nobody";
}

// function for spotify-this-song
function spotifyThisSong() {
    spotify.search({ type: 'track', query: searchTerm })
            .then(function (response) {
            // stored in variables so info can be easily used to append to log
            var artist = response.tracks.items[0].artists[0]["name"];
            var song = response.tracks.items[0].name;
            var songUrl = response.tracks.items[0].album.artists[0].external_urls.spotify;
            var album = response.tracks.items[0].album.name;
            console.log(lineBreakBar);
            console.log(songText[0] + artist);
            console.log(songText[1] + song);
            console.log(songText[2] + songUrl);
            console.log(songText[3] + album);
            console.log(lineBreakBar);

            // using fs to append results to log.txt
            fs.appendFile('log.txt', lineBreakBar + newLine + artist + newLine + song + newLine + songUrl + newLine + album + newLine + lineBreakBar + newLine, function (err) {
                if (err) throw err;
            })

        })
            .catch (function (err) {
            console.log(err);
        });
}

//movie-this function
function movieThis() {
    axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            var movieTitle = response.data.Title;
            var movieYear = response.data.Year;
            var imdbRating = response.data.Ratings[0].Value;
            var tomatoeRating = response.data.Ratings[1].Value;
            var movieCountry = response.data.Country;
            var movieLanguage = response.data.Language;
            var moviePlot = response.data.Plot;
            var movieStars = response.data.Actors;
            console.log(lineBreakBar);
            console.log(movieText[0] + movieTitle);
            console.log(movieText[1] + movieYear);
            console.log(movieText[2]+ imdbRating);
            console.log(movieText[3] + tomatoeRating);
            console.log(movieText[4]+ movieCountry);
            console.log(movieText[5]+ movieLanguage);
            console.log(movieText[6]+ moviePlot);
            console.log(movieText[7] + movieStars);
            console.log(lineBreakBar);

            // appending to log.txt
            fs.appendFile('log.txt', lineBreakBar + newLine + movieTitle + newLine + movieYear + newLine + imdbRating + newLine + tomatoeRating + newLine + movieCountry + newLine + movieLanguage + newLine + moviePlot + newLine + movieStars + newLine + lineBreakBar + newLine, function (err) {
                if (err) throw err;
            })
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

//concert-this function
function concertThis() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
        axios.get(queryUrl)
            .then(function (response) {
            //variables for the data
            var venue = response.data[0].venue.name;
            var city = response.data[0].venue.city;
            var date = moment(response.data[0].datetime).format('MM/DD/YYYY');
            console.log(lineBreakBar);
            console.log(concertText[0] + venue);
            console.log(concertText[1]+ city);
            console.log(concertText[2] + date);
            console.log(lineBreakBar);
            //logging data to log.txt
            var fs = require('fs')
            fs.appendFile('log.txt', lineBreakBar + newLine + venue + newLine + city + newLine + date + newLine + lineBreakBar + newLine, function (err) {
                if (err) throw err;
            })

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log("Error", error.message);
            }
            console.log("Woops, doesnt look like theres anything here!");
        });
}

//do-what-it-says function 
function doWhatItSays() {
    var fs = require('fs');
    // read from the random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        // split data into array
        var dataArr = data.split(',');
        searchMethod = dataArr[0];
        searchTerm = dataArr[1];
        if (searchMethod === "concert-this") {
            concertThis();
        }

        if (searchMethod === "spotify-this-song") {
            spotifyThisSong();
        }
        if (searchMethod === "movie-this") {
            movieThis();
        }
    })
}
// bands in town 
if (searchMethod === "concert-this") {
    concertThis();
}
//  movie search conditional
if (searchMethod === "movie-this") {
    movieThis();
}
//  spotify query Conditional 
if (searchMethod === "spotify-this-song") {
    spotifyThisSong();
}
// do-what-it-says conditional
if (searchMethod === "do-what-it-says") {
    doWhatItSays();
}