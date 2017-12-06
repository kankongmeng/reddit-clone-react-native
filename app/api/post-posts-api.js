'use strict';
  
class PostPostsApi {

  static postPosts(jsonValue) {
    var host = "https://reddit-loopback-react-angular.herokuapp.com";
    var apiModel = "/api/Posts?access_token=";
    var accessToken = "aGNF04XBPW8pbBS31WUb23Gu5B8FqHeTjCZ6Q06mur1RYUddK4eTT5i4Niqiefem";
    var url = host+apiModel+accessToken;

		return fetch(url, {  
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(jsonValue)
		})
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson;
		})
		.catch((error) => {
			console.error(error);
			throw error;
		}); 
  }
  
}

export default PostPostsApi;
