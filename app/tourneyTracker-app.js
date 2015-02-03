angular.module('tourneyTracker', [
    'ngResource'
])
    .controller('mainCtrl', function($scope) {

        $scope.currentFilter = null;
        $scope.gameTypes = ['Foosball', 'Pool'];
        $scope.isCreating = false;

        function openTournamentForm($scope) {
            this.isCreating = true;
        }
        $scope.openTournamentForm = openTournamentForm;

        function cancelTournamentForm($scope) {
            this.isCreating = false;
        }
        $scope.cancelTournamentForm = cancelTournamentForm;

        function setCurrentFilter(filter) {
            $scope.currentFilter = filter;
        }
        $scope.setCurrentFilter = setCurrentFilter;

        function showTournamentDetails(id, $scope) {
            this.tournament.visible = this.tournament.visible ? false : true;
        }
        $scope.showTournamentDetails = showTournamentDetails;

        function hideTournamentDetails(id, $scope) {
            this.tournament.visible = false;
        }
        $scope.hideTournamentDetails = hideTournamentDetails;
    })
