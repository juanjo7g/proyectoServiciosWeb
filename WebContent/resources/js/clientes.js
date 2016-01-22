/**
 * 
 */

var cliente = angular.module('Clientes', [ 'ngRoute', 'ngCookies' ]);

cliente.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'login.html',
		controller : 'ContLogin'
	});
} ]);

cliente.controller('ContLogin', function($scope) {

});

cliente.services('usuario', function($http) {
	
	this.validar = function(user, pws) {
		return $http({
			method: 'GET',
			url: '',
			
		})
	}
})