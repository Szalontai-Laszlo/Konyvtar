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
              templateUrl: './html/modal.html'
            }
          }
        })
        .state('konyvek', {
          url: '/',
          parent: 'root',
          controller: 'konyvekCtrl',
          templateUrl: './html/konyvek.html'
        })
        .state('kolcsonzesek', {
          url: '/',
          parent: 'root',
          controller: 'kolcsonzesekCtrl',
          templateUrl: './html/kolcsonzesek.html'
        })
      $urlRouterProvider.otherwise('/');
    }
])
.controller('konyvekCtrl', [
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
		$scope.addBook = () => {
			$http.POST('./php/addBook.php', {author: $scope.authorModel,
											 title: $scope.titleModel,
											 category: $scope.categoryModel}
			)
			.then(res => {
				if(!res.error){
					alert('Sikeres Felvétel!');
					$scope.getBooks();
				}else{
					alert('Sikertelen Felvétel:' + res.error);
				}
			})
		}
        $scope.getBooks();
    }
])