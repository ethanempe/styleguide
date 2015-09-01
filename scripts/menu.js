angular.module('StyleGuide', ['ngAnimate', 'ui.bootstrap'])
	.controller('Header', ['$scope', function($scope) {
		$scope.menuCollapsed = true;

		$scope.toggleMenu = function() {
			$scope.menuCollapsed = !$scope.menuCollapsed;
		}
	}])

	.controller('Menu', ['$scope', function($scope) {
		$scope.name = 'Ethan';
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


	}]);
