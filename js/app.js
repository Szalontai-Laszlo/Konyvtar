angular.module('konyvtar', [
    'ui.router',
    'app.common'
])
.config([
    '$stateProvider',
    '$urlRouterProvider',
    ($stateProvider, $urlRouterProvider) => {
      $stateProvider
        .state('root', {
          abstract: true,
          views: {
            '@': {
              templateUrl: './html/root.html'
            },
            'header@root': {
              templateUrl: './html/header.html'
            },
            'footer@root': {
              templateUrl: './html/footer.html'
            },
            'modal@root': {
              templateUrl: './html/modal.html',
              controller: 'konyvekCtrl'
            }
          }
        })
        .state('konyvek', {
          url: '/konyvek',
          parent: 'root',
          controller: 'konyvekCtrl',
          templateUrl: './html/konyvek.html'
        })
        .state('kolcsonzesek', {
          url: '/kolcsonzes',
          parent: 'root',
          controller: 'kolcsonzesekCtrl',
          templateUrl: './html/kolcsonzesek.html'
        })
      $urlRouterProvider.otherwise('/konyvek');
    }
])
.controller('konyvekCtrl', [
    '$scope',
    '$http',
    function ($scope, $http) {
        $scope.getBooks = () => {
            $http.get('./php/konyvtar.php')
                .then(res => {
                    if(!res.data.error){
                        $scope.books = res.data.data;
                        $scope.$applyAsync();
                    } else{
                        console.log("Hiba:" + res.error);
                    }
                })
        }
		    $scope.addBook = function() {
		    	$http.post('./php/addBook.php', {'author': $scope.authorModel,
		    									 'title': $scope.titleModel,
		    									 'category': $scope.categoryModel}
		    	)
		    	.then(res => {
		    		if(!res.data.error){
		    			alert('Sikeres Felvétel!');
              $scope.getBooks();
              $scope.$applyAsync();
		    		}else{
		    			alert('Sikertelen Felvétel:' + res.data.error);
		    		}
		    	})
		    	.catch(e => {console.log(e)})
		    }
        $scope.getBooks();
    }
])
.controller('kolcsonzesekCtrl', [
    '$scope',
    '$http',
    function ($scope, $http){
        $scope.getBorrow = () => {
            $http.get('./php/kolcsonzes.php')
            .then(res => {
                if(!res.data.error){
                    $scope.borrows = res.data.data;
                    console.log($scope.borrows)
                    $scope.$applyAsync();
                } else{
                    console.log("Hiba:" + res.error);
                }
            })
        }
        $scope.getBorrow();
    }
])