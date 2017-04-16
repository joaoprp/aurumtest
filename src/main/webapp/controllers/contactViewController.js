var contactViewController;

contactViewController = function($scope, $http, $stateParams) {
    $scope.contact = {};
    $scope.contact.emails = [''];
    $scope.contact.phones = [''];
    $scope.submitted = false;

	$scope.init = function() {
		$scope.getContact();
	};
	
	$scope.getContact = function() {
		$http.get('/contacts?id='+$stateParams.id).then(function(data) {
			$scope.contact = data.data;
		});
	};

    $scope.bday = function(c) {
        if(c.birthDay==null || c.birthDay == ""){
            return "";
        } else {
            return c.birthDay + "/" + c.birthMonth + "/" + c.birthYear;
        }
    };

};

angular.module('avaliacandidatos').controller("contactViewController", contactViewController);