angular.module('tourneyTracker')
    .controller('tournamentCtrl', function($scope, $http) {

        $http.get('app/tournaments.json').then(function (value) { $scope.tournaments = value.data.tournaments; });

        function resetCreateTournamentForm($scope) {
            $scope.newTournament = {
                name:'',
                game:'',
                startDate:'',
                endDate:''
            };
            $scope.createNewTournamentForm = false;
        }

        function createTournament(newTournament) {
            newTournament.id = $scope.tournaments.length;
            $scope.tournaments.push(newTournament);

            resetCreateTournamentForm();
        }
        $scope.createTournament = createTournament;

        function removeTournament(tournament) {
            $scope.removeMe = confirm('Are you sure? This will remove the tournament from the system completely!');
            if ($scope.removeMe && $scope.tournaments.indexOf(tournament) > -1) {
                var index = $scope.tournaments.indexOf(tournament);
                $scope.tournaments.splice(index, 1);
            }
        }
        $scope.removeTournament = removeTournament;
    });
