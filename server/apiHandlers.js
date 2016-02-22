var express = require('express');
var request = require('request-promise') //makes sending GET requests in node easier - this is the promisified version (JW)
var Path = require('path');
var routes = express.Router();


//HOW TO DEAL WITH API KEYS: set them equal to environment variables in the terminal.
//when working with heroku: use herokuConfig (command line interface) to manually set env variables


exports.gameSearcher = function(gameName){
	//Queries the Giant Bomb games API. Returns a JSON object for the closest matching game
	var apiKey = process.env.GIANTBOMB_KEY //remember to set this!
	var baseUrl = "http://www.giantbomb.com/api";
	var gamesSearchUrl = baseUrl + '/search/?api_key=' + apiKey + '&format=json';
	var requestBody = {
		uri: gamesSearchUrl+'&query='+encodeURI(gameName),
		json: true,
		headers: { 'User-Agent': 'ILikeThis recommendation tool v0.01'}
	}
	return request
		.get(requestBody)
		.then(function(games) {
			if (!!games.results[0]){
				games.results.forEach(function(x){
					x.type = 'Games';
					//if there are images, pull the right one out of its container object for convenience on front end
					if (x.image !== null){
						x.largeImage = x.image.medium_url;
					}
					//if there are not images, set a default image
					else{
						x.largeImage = 'http://businessandtech.com/wp-content/uploads/videogames-main_Full.jpg';
					}
					// ;
				})
				var topTenResults = games.results.slice(0,10);
				return topTenResults;
			}
			else{
				return [{
					'workNotFound': true,
					'message': "the API came up empty for that search"
				}]
			}
		})
		.catch(function(err){
			console.error('The games API failed to GET: ', err);
			throw new Error('The games API failed to GET.')
			//Unfortunately, this api is pretty bad at telling you it didn't find what you were searching for... 
			//for example, the search string 'a;lsdkjf' does not throw an error. It just sends back some 
			//random game that starts with the letter 'a' (JW)
		})
}

exports.bookSearcher = function(bookName){
	//Queries the Google Books API and returns an array of JSON objects - the top 10 closest matching books.
	//NOTE: we have an API key, but this query does not require it

	var formattedName = bookName.split(' ').join('+');
	var baseUrl = 'https://www.googleapis.com/books/v1/volumes';
	var bookSearchUrl = baseUrl + '?q=' + formattedName + '&format=json';
	var requestBody = {
		uri: bookSearchUrl,
		json: true
	}	

	return request
		.get(requestBody)
		.then(function(books) {

			//nicely pack all the book objects into an array, instead of the mess that comes back.
			var bookList = books.items.map(function(x){
				return x.volumeInfo;
			})

			// for each book in booklist, get a url for a larger image, as the ones that come back are too small
			//howTo: change the 'zoom' parameter to 0 in the original thumbnail url

			bookList.forEach(function(x){
				var bookObject = x;
				if (bookObject.imageLinks){
					var imageURL = bookObject.imageLinks.thumbnail;
					var splitURL = imageURL.split('zoom=1');
					splitURL[0] = splitURL[0]+'zoom=0';
					var largeImageURL = splitURL[0]+splitURL[1];
					// pack the new url into bookObject
					// bookObject.largeImage = largeImageURL;

					// NOTE: not currently using the larger image - doesn't work for a significant number of books!
					// substituting the original imageURL instead until a better fix is devised. The front end still looks
					// for the 'largeImage' property to grab image links, so we're hooking up imageURL to that.
					bookObject.largeImage = imageURL;
					
				}
				else { // if no image came back for a given book, substitute a default one. (JW)
					bookObject.largeImage = "https://pbs.twimg.com/profile_images/2601029982/profile.jpg"
				}
				bookObject.type = 'Books';
			})

			return bookList;
		})
		.catch(function(err){
			console.error('The books API failed to GET: ', err);
		})
		// As with Giant Bomb for games, the Google Books api isn't great at saying "I don't know." 
		// for example, the search string 'a;lsdkjf' does not throw an error. It just sends back some 
		// random book that starts with the letter 'a' (JW)

}


exports.movieSearcher = function(movieName){
	//Queries the OMDB movies API (provided by IMDB) and returns a JSON object for the closest result
	//NOTE: does not require an api key

	var baseUrl = "http://www.omdbapi.com/";
	var formattedName = movieName.split(' ').join('+');
	var requestBody = {
		uri: baseUrl+'?t='+formattedName+'&y='+'&plot=short&r=json',
		json: true
	}

	return request
		.get(requestBody)
		.then(function(movie) {
			if (movie.Response==='False'){
				console.error("IMDB could not find that movie! Try searching for something else.")
				return [{
					'workNotFound': true,
					'message': "the API came up empty for that search"
				}];
			} else {
				movie.type = 'Movies';
				return [movie];
			}
		})
		.catch(function(err){
			console.error('The movie API failed to GET: ', err)
			throw new Error("The movie API failed to GET. Like, it actually pooped the bed and broke.");
		})

		// LIMITATION: OMDB only returns a single movie - no obvious workaround to get more than one result. Just the 
		// way its built! Researching other alternatives.
}



//here is a rabbit.

//     ^oo1^                               
//    ++o1^+o111111+^                      
//   1+^^^ oo^1NNNooo+^+^                  
//   o^^^^^^01+100+^o0110o+                
//   ooo^^^^100oooo1o000NMM1               
//   11^^^^^+00000000000NMMMN1             
//   ^1+^^^^^^100000MM0NMN0NMMM01^         
//    oMo^^^^^ +11+1o0MMNNMMN00NMMM0^      
//     1Mo+^^+^^^^^^^^+0M00MMMMMMNNNM0     
//      oMMN1+^^^^^^+1oNMMNNMMMMMMMMNNM+   
//      ^MN^ ^^^^^^^^^100NNM0NMMMMMMMMNM1  
//      NM^^^^^^^^^^^^^^^^10M+^+1oNMMMNMM  
//      0+^^^^^^^^^^^^^^^^^+oo     +oMM0^  
//      ^^^^^^^^^^^^^^^^^^^^+o       1NM^  
//     1^^^^^^^^^^^^^^^^^^^^^++        +   
//    ^o^^^^^^^^^^^^^^^^^^^^^^^            
//     o^^^^^^^^^^^^^^^^^^^^^^             
//     NN^^^^^^^^^^^^^ ^^^^^^^^            
//    ^MN^^^^^^ ^^^^^ ^^^^^^^^1+           
//    1M+^^^^^^^^^^^^^^^^^^ ++oo+          
//    0+^^^^^^^^^^^^^^^^^^+10000o          
//   0+^^^^^^^^^^^^ ^^^+1o0000000o         
//  0o^^^^^^^^^^^^^^+1o000000000000^       
// 1Mo^^^o0+^++^^^+o000oo00000o0000o^      
// oM0++1o1MNMo^+1o00000000000000000o      
// 0M0001^ 0MMo1000000000000o000ooo001     
//   o1+   1MM00000000000000o000000000^    
//         ^MMN000000000000000000000001    
//          oMMN000000000000000000o0000    
//          ^MMMMMN000000o0000000000000    
//           NMMMN000oo000000000oo000oo    
//          +MMMNN00000oo00000000000o0o    
//          0MMMMN000000000000oo000000o    
//          MMMMM00000000000000000NMMM^    
//          MMMMMN00000000000o00MMMMM01^^  
//          oMMMMMMN00o000000000MMMNo^^^+^ 
//        ^^^^+1NMMMN00000000000MMM0+^^^^11
//   ^1+^^^+o00o0MMMM000000oo00NNMNNo0++^1o
//   ^+^++^+^^      ^+1o000o001+^          
//              ^^^^^^^oo00o0+             
//            +01111+++1+++^^^             

