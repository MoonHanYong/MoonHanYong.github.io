myApp.controller('categoryCtrl', function($scope) {

  //category add
  $scope.addCategory = function(id) {
    firebase.database().ref('category/' + id).set({
      id: id,
      name: $scope.newCategoryName
    });

    $scope.newCategoryName = "";
  }

  //category delete
  $scope.deleteCategory = function(id) {
    firebase.database().ref('category/' + id).remove();
  }

  //category list
  firebase.database().ref('category').orderByKey().on('value', function(snapshot) {
    var maxId = 0;

    //json -> array
    var arr = $.map(snapshot.val(), function(el) {
      //첫판에 el이 undefine 인게 한번 옴.. 왜 그런지 모르겠네?!
      if(el) {
        maxId = el.id;
        return el;
      }
    });

    $scope.newCategoryId = Number(maxId) + 1;

    //비동기 처리시 angular 렌더링 되도록
    $scope.$evalAsync(function() {
      $scope.categories = arr.reverse();;
    });
  });

});
