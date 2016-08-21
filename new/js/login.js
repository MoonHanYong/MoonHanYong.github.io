myApp.controller('loginCtrl', function($scope) {

  $scope.submit = function() {
    firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password)
    .then(function onResolve(result) {
      alert('login succeed!')
    }, function onReject(error) {
      alert(error.message);
    })
    .catch(function(error) {
      alert(error.message);
    });
  };

});
