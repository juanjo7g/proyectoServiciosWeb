/**
 * linea de codigo
 */

var cliente = angular.module('Clientes', [ 'ngRoute', 'ngCookies' ]);

cliente.config([ '$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
		templateUrl : 'login.html',
		controller : 'ContLogin'
		})
		.when('/clientes', {
			templateUrl : 'clientes.html',
			controller : 'ContCliente'
		});
} ]);

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

cliente.service('cliente', function($http) {

	this.listar = function() {
		return $http({
			method : 'GET',
			url : 'http://localhost:8080/proyectoServiciosWeb/rest/Cliente'
		})
	}
	
	this.crear = function(nuevoCliente) {
		return $http({
			method : 'POST',
			url : 'http://localhost:8080/proyectoServiciosWeb/rest/Cliente',
			params:{
				cedula:nuevoCliente.cedula,
				nombres:nuevoCliente.nombres,
				apellidos:nuevoCliente.apellidos,
				email: nuevoCliente.email,
				usuarioCrea: nuevoCliente.usuarioCrea
			}
		})
	}
});


cliente.controller('ContLogin', function($scope, usuario, $location, $cookies) {

	$scope.validar = function() {
		usuario.validar($scope.nombreUsuario, $scope.contrasena).success(
				function(data) {
					if (data != '') {
						alert(data);
					} else {
						alert('Valido');
						$cookies.nombreUsuario = $scope.nombreUsuario;
						$location.path("/clientes");
					}
				})

	}
});

cliente.controller('ContCliente', function($scope, cliente, $location, $cookies) {
	$scope.nuevoCliente={};
	$scope.listar = function() {
		cliente.listar().success(
				function(data) {
					if (data.clienteWS.length>0) {
						$scope.clientes = data.clienteWS;
					}else {
						$scope.clientes = data;
					}
					
				})

	}
	
	$scope.crearCliente= function(nuevoCliente){
		nuevoCliente.usuarioCrea = $cookies.nombreUsuario;
		cliente.crear(nuevoCliente).success(
				function(data) {
					if (data == 'Cliente creado correctamente') {
						alert(data);
						$scope.listar();
					} else {
						alert(data);
					}
					
				})
	}
	
	$scope.listar();
});

cliente.run(function($rootScope, $cookies, $location) {
	$rootScope.$on('$routeChangeStart', function() {
		if(typeof($cookies.nombreUsuario) == 'undefined'){
			$location.url('/');
		}
	});
});