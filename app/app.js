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

  app.controller('SwapiController', function($scope, $http){
      $scope.$watchGroup(['search', 'element', 'page'], function() {
        fetch();
      });

      $scope.search = 'a';
      $scope.page = 1;
      $scope.element = 'people';

      function fetch(){
        $http.get("https://swapi.co/api/" +  $scope.element + "/?search=" + $scope.search + "&page=" + $scope.page)
        .then(function(response) {
          $scope.details = response.data;
          $scope.maxPage = $scope.details.count / 10;
        });
      }
    });
})();
