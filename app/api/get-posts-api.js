'use strict';

var posts = [];
  
class GetPostsApi {

  static getAllPost() {
    // Host come from utility.js
    var host = "https://reddit-loopback-react-angular.herokuapp.com";
    var url = host+'/api/Posts?access_token=aGNF04XBPW8pbBS31WUb23Gu5B8FqHeTjCZ6Q06mur1RYUddK4eTT5i4Niqiefem';

    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson.sort((a, b) => b.points - a.points);
        posts = responseJson;
        return posts;
      })
      .catch((error) => {
        console.error(error);
      }); 
  }
  
  static searchPostByTitle(qs) {
    return new Promise((resolve, reject) => {
      let result = posts.filter(item => {
        const titleName = `${item.title.toLowerCase()}`;
        return titleName.indexOf(qs.toLowerCase()) > -1;
      });
      
      resolve(result);
    })
  }
}

export default GetPostsApi;
