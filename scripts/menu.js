angular.module('StyleGuide', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'hljs', 'masonry'])

.config(['hljsServiceProvider', '$routeProvider', '$locationProvider', function(hljsServiceProvider, $routeProvider, $locationProvider) {
	hljsServiceProvider.setOptions({
		tabReplace: '    '
	});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$routeProvider.otherwise({
		redirectTo: '/details.html'
	});
}])

.controller('Menu', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.state = {
		category: 0,
		menuCollapsed: true,
		elementIndex: 0,
		elementName: 'checkboxes',
		elementMarkdown: ''
	};

	$scope.activeElement = function(index) {
		if (index == $scope.state.elementIndex) {
			return "active";
		}
	}

	$scope.previewUrl = function() {
		return "project/sources/preview-1.html?" + $scope.state.elementName;
	}

	$scope.toggleMenu = function() {
		$scope.state.menuCollapsed = !$scope.state.menuCollapsed;
	}

	$scope.setTmpCategory = function(cat) {
		$scope.tmpCategory = cat;
	}

	$scope.selectElement = function(index) {
		// If the menu is open, we must change the category and close the menu.
		if (!$scope.state.menuCollapsed) {
			$scope.toggleMenu();
			$scope.state.category = $scope.tmpCategory;
		}

		$scope.state.elementIndex = index;
		$scope.state.elementName = _elementName(index);
		$scope.state.elementHeight = _elementHeight(index);

		refresh();
	}

	$scope.pageTitle = function() {
		if (!$scope.components) { return; }

		if ($location.hash() == '') {
			if (_settings.projectName !== undefined) {
				return _settings.projectName + " Style Guide";
			}
			return "Style Guide";
		}

		return $scope.components[$scope.state.category].title;
	}

	_elementHeight = function(index) {
		var subComponents = $scope.components[$scope.state.category].components;
		var height = subComponents[index].height;
		return height ? height : 250;
	}

	_elementName = function(index) {
		var subComponents = $scope.components[$scope.state.category].components;
		return subComponents[index].name;
	}

	_parseMarkdownCodeSnippet = function(md) {
		var snippet = $(md).filter('pre').find('code').html();

		// Convert to html that hljs can understand.
		snippet = snippet.replace(/&lt;/g, '<');
		snippet = snippet.replace(/&gt;/g, '>');
		snippet = snippet.replace(/&amp;/g, '&');

		return snippet;
	}

	refresh = function() {
		var responsePromise = $http.get('project/sources/components/' + $scope.state.elementName + '.md');
		var md_content;

		responsePromise.success(function(data, status, headers, config) {
			md_content = data;
			var markdownHtml = markdown.toHTML( md_content );

			// Set usage notes section
			$scope.markdownSection = '';
			var list = $(markdownHtml).not('pre');
			for (var i = 0; i < list.length; i++) {
				$scope.markdownSection += list[i].outerHTML;
			}

			// Set html snippet section
			$scope.htmlSnippet = _parseMarkdownCodeSnippet(markdownHtml);
		}).error(function(data, status, headers, config) {
			console.log("There was an error making an AJAX call to \"project/sources/components/" + $scope.state.elementName + ".md\"");
			console.log("Status: " + status);

			// Remove any notes and snippets
			$scope.markdownSection = '';
			$scope.htmlSnippet = '';
		});

	}

	init = function() {
		refresh();
		$scope.selectElement($scope.state.elementIndex);
	}

	_modifySettings = function() {
		for (var i = 0; i < _settings.updates.length; i++) {
			var text = _settings.updates[i].text;
			text = text.replace('*', '<em>');
			text = text.replace('*', '</em>');
			_settings.updates[i].text = text;
		}
	}

	$scope.getUpdates = function() {
		return _settings.updates;
	}

	_settings = {};


	var responsePromise = $http.get('components.json');
	responsePromise.success(function(data, status, headers, config) {
		$scope.components = data;

		// Initialize the page
		init();
	}).error(function(data, status, headers, config) {
		console.log("There was an error making an AJAX call to \"components.json\"");
		console.log("Status: " + status);
	});


	var responsePromise = $http.get('settings.json');
	responsePromise.success(function(data, status, headers, config) {
		_settings = data;
		_modifySettings();
	}).error(function(data, status, headers, config) {
		console.log("There was an error making an AJAX call to \"settings.json\"");
		console.log("Status: " + status);
	});

}]);
