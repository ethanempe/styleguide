angular.module('StyleGuide')

.controller('Menu', ['stateFactory', 'projectFactory', 'urlFactory', function(state, project, url) {
	this.btnClass = function() {
		if (state.menuOpen()) {
			$('html, body').addClass('box-open');
			return 'open';
		} else {
			$('html, body').removeClass('box-open');
		}
		return '';
	}

	this.toggle = function() {
		state.toggleMenu();
	}

	this.updateTime = function() {
		if (project.categories() === undefined)
			return '';
		return project.updateDateTime();
	}

	this.title = function() {
		if (state.page() == 'home') {
			return project.name() + ' Style Guide';
		}
		else if (state.page() == 'preview') {
			var catInd = state.category();
			return project.category(catInd).title;
		}
	}

	this.groups = function() {
		return project.categories();
	}

	this.activeGroup = function() {
		return project.category(state.category()).components;
	}

	this.isActiveElement = function(index) {
		return index == state.elementIndex();
	}

	this.elementLink = function(elem) {
		if (elem === undefined) return;
		var e = project.catAndElem(elem);
		return url.previewURL(e.cat, e.elem);
	}

	this.open = function() {
		return state.menuOpen();
	}
}])

.controller('All', ['$scope', '$http', 'stateFactory', function($scope, $http, state) {
	$scope.state = {
		category: 0,
		menuCollapsed: true,
		elementIndex: 0,
		elementName: 'checkboxes',
		elementMarkdown: '',
		pageTitle: 'Style Guide'
	};

	$scope.activeElement = function(index) {
		if (index == $scope.state.elementIndex) {
			return "active";
		}
	}

	$scope.isMenuOpen = function() {
		return state.menuOpen();
	}

	$scope.toggleMenu = function() {
		state.toggleMenu();
	}

	$scope.getCategory = function() {
		return $scope.state.category;
	}

	$scope.getCategoryComponents = function() {
		return $scope.components[$scope.getCategory()].components;
	}

	$scope.getElementHeight = function() {
		return $scope.state.elementHeight;
	}

	$scope.previewUrl = function() {
		return "project/sources/preview-1.html?" + $scope.state.elementName;
	}

	$scope.setCategory = function(cat) {
		$scope.state.category = cat;
	}

	$scope.setTmpCategory = function(cat) {
		$scope.tmpCategory = cat;
	}

	$scope.selectElement = function(index) {
		// If the menu is open, we must close the menu.
		if (!$scope.state.menuCollapsed) {
			$scope.toggleMenu();
		}

		$scope.state.elementIndex = index;
		$scope.state.elementName = _elementName(index);
		$scope.state.elementHeight = _elementHeight(index);

		refresh();
	}

	$scope.pageTitle = function() {
		if ($scope.components === undefined || $scope.state.isHomepage) {
			if (_settings.projectName !== undefined) {
				return _settings.projectName + " Style Guide";
			}
			return "Style Guide";
		}

		return $scope.components[$scope.state.category].title;
	}

	$scope.elementURL = function(cat, elem) {
		return '#/element-view/' + cat + '/' + elem;
	}

	_catAndElem = {};
	_setupCatAndElem = function() {
		for (var i = 0; i < $scope.components.length; i++) {
			var elements = $scope.components[i].components;

			for (var j = 0; j < elements.length; j++) {
				var elemName = elements[j].name;
				_catAndElem[elemName] = {
					cat: i,
					elem: j
				}
			}
		}
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
		_setupCatAndElem();
		// $scope.selectElement($scope.state.elementIndex);
	}

	_addLinksToUpdateNotes = function() {
		for (var i = 0; i < _settings.updates.length; i++) {
			var text = _settings.updates[i].text;

			var catElemObj = _catAndElem[_settings.updates[i].element];
			var url = $scope.elementURL(catElemObj.cat, catElemObj.elem);

			text = text.replace('*', '<a href="' + url + '">');
			text = text.replace('*', '</a>');
			_settings.updates[i].text = text;
		}
	}

	$scope.getUpdates = function() {
		return _settings.updates;
	}

	_settings = {};

}]);
