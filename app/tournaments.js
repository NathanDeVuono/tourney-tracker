angular.module('tourneyTracker')
    .controller('tournamentCtrl', function($scope, tournamentsService) {
        tournamentsService.getTournaments(function(r) {
            $scope.tournaments = r.tournaments;
        });

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
            tournamentsService.setTournaments($scope.tournaments, function(r){
                alert(r.status);
            });



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
    })
    .service('tournamentsService', function($http) {
        return  {
            getTournaments: function(successCb) {
                $http.get('app/tournaments.json').success(function(r){successCb(r);});
            },
            setTournaments: function(newTournament, successCb){
                $http.post('app/tournaments.json', angular.toJson(newTournament)).then(function(r){successCb(r);});
            }
        };
    });
