// Initialize Firebase
var config = {
  apiKey: "AIzaSyDI7pmQo56Gl7J5ABIIvMtg0kLmIPp1P64",
  authDomain: "money-ad865.firebaseapp.com",
  databaseURL: "https://money-ad865.firebaseio.com",
  storageBucket: "money-ad865.appspot.com",
};
firebase.initializeApp(config);

Date.prototype.yyyymmdd = function()
{
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();

    return yyyy + "-" + (mm[1] ? mm : '0'+mm[0]) + "-" + (dd[1] ? dd : '0'+dd[0]);
}

var myApp = angular.module('myApp', []);
var userEmail = '';

myApp.controller('headerController', function($scope, $location) {
  $scope.isActive = function (viewLocation) {
      return $location.absUrl().endsWith(viewLocation);
  };

  $scope.logout = function() {
    console.log('logout');
    firebase.auth().signOut();
  };

  firebase.auth().onAuthStateChanged(function(a) {
    if(!a) {
      window.location = "login.html";
      return;
    }
    $scope.loginEmail = a.email;
    userEmail = a.email;
  });

});
