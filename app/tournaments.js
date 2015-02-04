angular.module('tourneyTracker')
    .controller('tournamentCtrl', function($scope, tournamentsService) {
        // $scope.tournaments = tournamentsService.getTournaments();
        tournamentsService.getTournaments().then(function(tournaments){
            $scope.tournaments = tournaments.tournaments;
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
            this.newTournament.id = this.tournaments.length;
            this.tournaments.push(this.newTournament);
            tournamentsService.setTournaments(this.tournaments).then(function(data){
                console.log(data);
            },
            function(status){
                console.log(status);
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
    .service('tournamentsService', function($http, $q, $resource) {
        var resource = $resource('app/tournaments/:id', {id:'@id'}, {'query': {method: 'GET', params: {}, transformResponse: function(data, header){
          //Getting string data in response
        //   var jsonData = angular.fromJson(data); //or angular.fromJson(data)
          var tournaments = [];
          console.log(data);
          angular.forEach(jsonData, function(tournament){
            tournaments.push(tournament);
          });

          return tournaments;
        }} });
        return  {
            getTournaments: function() {
                var deferred = $q.defer();
                $http.get('app/tournaments.json').success(function(data, status, headers, config){
                    deferred.resolve(data);
                }).error(function(data, status, headers, config){
                    deferred.reject(status);
                });
                return deferred.promise;
            },
            // getTournaments: function(){
            //     resource.query();
            // },
            setTournaments: function(newTournament){
                var deferred = $q.defer();
                $http.post('app/tournaments.json', angular.toJson(newTournament)).success(function(data, status, headers, config){
                    deferred.resolve(data);
                }).error(function(data, status, headers, config){
                    deferred.reject(status);
                });
                return deferred.promise;
            }
        };
    });
