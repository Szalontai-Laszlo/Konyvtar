angular.module('konyvtar', [])
.controller('konyvtarCtrl', [
    '$scope',
    '$http',
    function ($scope, $http) {
        $scope.getBooks = () => {
            $http.get('./php/konyvtar.php')
                .then(res => {
                    if(!res.error){
                        $scope.books = res.data.data;
                        console.log($scope.books);
                        $scope.$applyAsync();
                    } else{
                        console.log("Hiba:" + res.error);
                    }
                })
        }
        $scope.getBooks();
    }
])