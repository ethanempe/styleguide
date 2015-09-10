angular.module('StyleGuide', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'hljs'])
	.config(function (hljsServiceProvider) {
		hljsServiceProvider.setOptions({
			// replace tab with 4 spaces
			tabReplace: '    '
		})
	})

	.controller('Menu', ['$scope', '$http', function($scope, $http) {
		$scope.state = {
			'category': 0,
			'menuCollapsed': true,
			'linkSelected': 0
		};

		$scope.menu = [
			{
				title: 'Lorem ipsum dolor',
				list:
				[
					'Lorem ipsum',
					'Nisi, fugiat',
					'Illum, vero',
					'Id, repellat',
					'Voluptatibus, nam',
					'Quas, minus',
					'Fugiat, quod',
					'Nemo, voluptatum',
					'Architecto, quia',
					'Possimus, fugit'
				]
			},
			{
				title: 'Aspernatur, molestiae, rerum',
				list:
				[
					'Lorem ipsum',
					'Nisi, fugiat',
					'Illum, vero',
					'Id, repellat',
					'Voluptatibus, nam',
					'Quas, minus',
					'Fugiat, quod',
					'Nemo, voluptatum',
					'Architecto, quia',
					'Possimus, fugit'
				]
			},
			{
				title: 'Ea totam, asperiores',
				list:
				[
					'Lorem ipsum',
					'Nisi, fugiat',
					'Illum, vero',
					'Id, repellat',
					'Voluptatibus, nam',
					'Quas, minus',
					'Fugiat, quod',
					'Nemo, voluptatum',
					'Architecto, quia',
					'Possimus, fugit'
				]
			},
			{
				title: 'Cupiditate, ea, architecto',
				list:
				[
					'Lorem ipsum',
					'Nisi, fugiat',
					'Illum, vero',
					'Id, repellat',
					'Voluptatibus, nam',
					'Quas, minus',
					'Fugiat, quod',
					'Nemo, voluptatum',
					'Architecto, quia',
					'Possimus, fugit'
				]
			},
			{
				title: 'Possimus, consectetur, quia',
				list:
				[
					'Lorem ipsum',
					'Nisi, fugiat',
					'Illum, vero',
					'Id, repellat',
					'Voluptatibus, nam',
					'Quas, minus',
					'Fugiat, quod',
					'Nemo, voluptatum',
					'Architecto, quia',
					'Possimus, fugit'
				]
			}
		];

		var response = $http.get('project/styles.css');
		response.success(function(data, status, headers, config) {
			$scope.styles = data;
		});
		response.error(function(data, status, headers, config) {
			console.log("Sometin' went wrong. :(");
		});

		response = $http.get('project/checkboxes.html');
		response.success(function(data, status, headers, config) {
			$scope.previewHtml = data;
			$scope.previewHtml = enhanceWithin($scope.previewHtml);
			console.log($scope.previewHtml);
		});
		response.error(function(data, status, headers, config) {
			console.log("Sometin' went wrong. :(");
		});

		$scope.toggleMenu = function() {
			$scope.state.menuCollapsed = !$scope.state.menuCollapsed;
		}

	}]);
