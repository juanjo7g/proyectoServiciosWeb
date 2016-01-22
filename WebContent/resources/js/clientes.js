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

cliente.service('usuario', function($http) {

	this.validar = function(user, pws) {
		return $http({
			method : 'GET',
			url : 'http://localhost:8080/proyectoServiciosWeb/rest/Usuario',
			params : {
				login : user,
				password : pws
			}
		})
	}
});

cliente.controller('ContLogin', function($scope, usuario) {

	$scope.validar = function() {
		usuario.validar($scope.nombreUsuario, $scope.contrasena).success(
				function(data) {
					if (data != '') {
						alert(data);
					} else {
						alert('Valido');
					}
				})

	}
});