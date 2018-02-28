const $ = require('jquery');
const firebase = require('firebase');
 $(document).ready(function () {
   function initFirebase () {
     $.ajax({
       url: '/firebase',
       method: 'GET',
       success: handler
     })
   }
  $('#signinButton').click(function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(token);
      console.log(user);
  });
});
  function handler (config) {
    firebase.initializeApp(config);
  }
  initFirebase();
});
