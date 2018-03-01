const $ = require('jquery/dist/jquery.min');
const firebase = require('firebase');
 $(document).ready(function () {
   function initFirebase () {
     $.ajax({
       url: '/firebase',
       method: 'GET',
       success: handler
     })
   }
   function handler (config) {
     firebase.initializeApp(config);
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

$('#auth_phn_btn').click(function(e) {
  e.preventDefault();
  firebase.auth().useDeviceLanguage();
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('auth_phn_btn', {
    'size': 'invisible',
    'callback': function(response) {
      onSignInSubmit();
    }
  });
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  var appVerifier = window.recaptchaVerifier;
  var phone = $('#PhoneNumber').val();
  if (phone) {
    firebase.auth().signInWithPhoneNumber(phone, appVerifier)
    .then(function (confirmationResult) {
      console.log(confirmationResult);
      window.confirmationResult = confirmationResult;
      $('#auth_code').click((e)=> {
        e.preventDefault();
        var code = $('#Code').val();
          confirmationResult.confirm(code).then(function (result) {
          var user = result.user;
          console.log(user);
        }).catch(function (error) {
          console.log('Code error ', error);
        });
      });
    } , (err) => {
      window.recaptchaVerifier.render().then((widgetId) => {
        grecaptcha.reset(widgetId);
      });
        console.log('Not worked ', err);
    });
  }
});
  initFirebase();
});
