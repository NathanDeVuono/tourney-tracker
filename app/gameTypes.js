angular.module('tourneyTracker')
    .controller('gameTypeCtrl', function($scope){


        function addNewGame(newGame) {
            if ($scope.gameTypes.indexOf(newGame) < 0) {
                $scope.gameTypes.push(newGame);
            }
        }
        $scope.addNewGame = addNewGame;
    });
