(function() {

  var app = angular.module('starWars', ['ui.router']);

  app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/cards');
    $stateProvider

      .state('cards', {
        url: '/cards',
        templateUrl: 'components/cards/cards.html'
      })
      .state('cards.card', {
        url: '/item',
        templateUrl: 'components/card/item.html'
      })
  });

  app.controller('SwapiController', function($rootScope, $scope, $http){
    $scope.$watchGroup(['search', 'element', 'page'], function() {
      fetch();
    });

    $scope.search = 'a';
    $scope.search = '';
    $scope.page = 1;
    $scope.element = 'planets';

    function fetch(){
      $http.get("https://swapi.dev/api/" +  $scope.element + "/?search=" + $scope.search + "&page=" + $scope.page)
      .then(function(response) {
        $scope.details = response.data;
        $scope.maxPage = Math.ceil($scope.details.count / 10);
      });
    }
  });


  app.directive('cards', function() {
    return {
      restrict: 'E',
      templateUrl: 'components/card/card.html',
      replace: true
    }
  });

  app.directive('searchBar', function() {
    return {
      restrict: 'E',
      templateUrl: 'components/search/search.html'
    }
  });
})();
