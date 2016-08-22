myApp.controller('moneyCtrl', function($scope) {

  //money list
  firebase.database().ref('money').orderByKey().on('value', function(snapshot) {
    var maxId = 0;

    if(snapshot.val() != null) {
      //json -> array
      var arr = $.map(snapshot.val(), function(el) {
        //첫판에 el이 undefine 인게 한번 옴.. 왜 그런지 모르겠네?!
        if(el) {
          maxId = el.id;
          return el;
        }
      });

      //비동기 처리시 angular 렌더링 되도록
      $scope.$evalAsync(function() {
        $scope.moneyList = arr.reverse();
      });
    }

    $scope.newMoney = {
      id: Number(maxId) + 1,
      created_at: (new Date()).yyyymmdd(),
      email: userEmail
    };
  });

  //money add
  $scope.addMoney = function(id) {
    firebase.database().ref('money/' + id).set($scope.newMoney);
  }

  //money delete
  $scope.deleteMoney = function(id) {
    firebase.database().ref('money/' + id).remove();
  }

  //category list
  firebase.database().ref('category').orderByKey().on('value', function(snapshot) {

    //json -> array
    var arr = $.map(snapshot.val(), function(el) {
      //첫판에 el이 undefine 인게 한번 옴.. 왜 그런지 모르겠네?!
      if(el) {
        return el;
      }
    });

    //비동기 처리시 angular 렌더링 되도록
    $scope.$evalAsync(function() {
      $scope.categories = arr;
    });
  });

});
