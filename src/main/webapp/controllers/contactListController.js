var contactListController;

contactListController = function($scope, $http) {
	$scope.contacts = [];
	$scope.preDeletedContact = {};

    $scope.sortType     = 'name';
    $scope.sortReverse  = false;
    $scope.search		= '';

	$scope.init = function() {
		$scope.listAllContacts();
	};
	
	$scope.listAllContacts = function() {
		$http.get('/contacts').then(function(data) {
			$scope.contacts = data.data;
		});
	};

	$scope.preDelete = function(contact) {
		$scope.preDeletedContact = contact;
		$('#myModal').modal('show');
	};

	$scope.delete = function() {
		if($scope.preDeletedContact != null) {
			$http.delete('/contacts?id='+$scope.preDeletedContact.id);

			$scope.contacts.splice($scope.contacts.indexOf($scope.preDeletedContact),1);

            $('#myModal').modal('hide');
		}
	};

	$scope.bday = function(c) {
		if(c.birthDay==null || c.birthDay == ""){
			return "";
		} else {
			return c.birthDay + "/" + c.birthMonth + "/" + c.birthYear;
		}
	};
};

angular.module('avaliacandidatos').controller("contactListController", contactListController);