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
        $scope.removeBook = (bookName) => {
            $http.post('./php/removeBook.php', {name: bookName})
            .then(res => {
                if(!res.data.error){
		    			alert('Sikeres Törlés!');
                        $scope.getBooks();
                        $scope.$applyAsync();
                        
		    	}else{
		    		alert('Sikertelen Törlés:' + res.data.error);
		    	}
            })
        }
        $scope.getBooks();
    }
])
.controller('kolcsonzesekCtrl', [
    '$scope',
    '$http',
    function ($scope, $http){
        const formatDateISO = (date) => {
            return date.toLocaleDateString('en-CA');  
        };

        $scope.currentDate = new Date();
        console.log(formatDateISO($scope.currentDate));
        // $scope.maiEv = new Date().getFullYear().toString();
        // $scope.maiHonap = (new Date().getMonth()+1).toString();
        // $scope.maiNap = new Date().getDate().toString();
        // $scope.maiDatum = $scope.maiEv + $scope.maiHonap + $scope.maiNap
        console.log($scope.currentDate);
        $scope.getBooks = () => {
            $http.get('./php/konyvtar.php')
                .then(res => {
                    if(!res.data.error){
                        $scope.books = res.data.data;
                        $scope.$applyAsync();
                        console.log($scope.books);
                    } else{
                        console.log("Hiba:" + res.error);
                    }
                })
        }
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
        $scope.addBorrow = () => {
          $http.post('./php/addBorrow.php', {
                      name: $scope.nameModel,
                      date: $scope.dateModel,
                      title: $scope.titleModel

          })
          .then(res =>{
            if(!res.data.error){
		    			alert('Sikeres Felvétel!');
                        $scope.getBorrows();
                        $scope.$applyAsync();
                        
		    		}else{
		    			alert('Sikertelen Felvétel:' + res.data.error);
		    		}
          })
        }
        $scope.getBorrow();
        $scope.getBooks();
    }
])