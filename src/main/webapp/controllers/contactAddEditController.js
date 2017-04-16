var contactAddEditController;

contactAddEditController = function($scope, $http, $location, $stateParams) {
	$scope.contact = {};
	$scope.contact.emails = [''];
	$scope.contact.phones = [''];
	$scope.submitted = false;

    $scope.init = function() {
    	console.log($stateParams.id);
    	if (typeof $stateParams.id !== 'undefined' && $stateParams.id !== '')
        	$scope.getContact();
    };

    $scope.getContact = function() {
        $http.get('/contacts?id='+$stateParams.id).then(function(data) {
            $scope.contact = data.data;
        });
    };
	
	$scope.save = function() {

		$scope.submitted = true;

		if ($scope.contact.name != null && $scope.contact.name != "") {
			$http.post("/contacts", $scope.contact);
		}

		$location.path('/contacts');

	};

	$scope.addMorePhones = function() {
		$scope.contact.phones.push('');
	}; 

	$scope.addMoreEmails = function() {
		$scope.contact.emails.push('');
	};

	$scope.deletePhone = function(index){
		if (index > -1) {
    		$scope.contact.phones.splice(index, 1);
		}

		if ($scope.contact.phones.length < 1){
			$scope.addMorePhones();
		}
	};

	$scope.deleteEmail = function(index){
		if (index > -1) {
    		$scope.contact.emails.splice(index, 1);
		}

		if ($scope.contact.emails.length < 1){
			$scope.addMoreEmails();
		}
	};

};

angular.module('avaliacandidatos').controller("contactAddEditController", contactAddEditController);