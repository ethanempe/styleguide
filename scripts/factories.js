angular.module('StyleGuide')

.factory('urlFactory', function() {
	var service = {
		previewURL: function(cat, elem) {
			return '#/element-view/' + cat + '/' + elem;
		},
		fullScreenURL: function(elemName) {
			return "partials/preview.html?" + elemName;
		}
	};

	return service;
})

.factory('ajaxFactory', ['$http', '$q', function($http, $q) {
    return {
		loadAll: function () {
			return $q.all([this.components(), this.settings()]).then(function (results) {
				return {
					components: results[0],
					settings: results[1]
				};
			});
		},

        components: function() {
            return $http.get('components.json').then(function(result) {
        		if (typeof result.data === 'object') {
        			return result.data
        		} else {
        			// Invalid data
        			console.err("Invalid data returned from components.json");
        			return $q.reject(result.data);
        		}
        	}, function(result) {
        		// Something went wrong
        		console.err("Error running AJAX call to components.json");
        		return $q.reject(result.data);
        	});
        },
        settings: function() {
            return $http.get('settings.json').then(function(result) {
        		if (typeof result.data === 'object') {
        			return result.data;
        		} else {
        			// Invalid data
        			console.err("Invalid data returned from settings.json");
        			return $q.reject(result.data);
        		}
        	}, function(result){
        		// Something went wrong
        		console.err("Error running AJAX call to settings.json");
        		return $q.reject(result.data);
        	});
        }
    };
}])

/**
	Handles all the static data associated with the project
**/
.factory('projectFactory', ['urlFactory', 'ajaxFactory', function(urlFactory, ajax) {
	var _components,
		_settings,
		_catAndElem;

	var _buildElemToCatElemMap = function() {
		var ret = {};
		for (var i = 0; i < _components.length; i++) {
			var elements = _components[i].components;

			for (var j = 0; j < elements.length; j++) {
				var elemName = elements[j].name;
				ret[elemName] = {
					cat: i,
					elem: j
				}
			}
		}
		return ret;
	}

	var _addLinksToElementNotes = function() {
		for (var i = 0; i < _settings.updates.length; i++) {
			var text = _settings.updates[i].text;

			var catElemObj = _catAndElem[_settings.updates[i].element];
			var url = urlFactory.previewURL(catElemObj.cat, catElemObj.elem);

			text = text.replace('*', '<a href="' + url + '">');
			text = text.replace('*', '</a>');
			_settings.updates[i].text = text;
		}
	}

	var service = {
		name: function() {
			if (_settings === undefined || _settings.projectName === undefined) {
				return '';
			}
			return _settings.projectName;
		},
		updateDateTime: function() {
			return _settings.updateDateTime;
		},
		allUpdates: function(index) {
			return _settings.updates;
		},
		update: function(index) {
			return _settings.updates[index];
		},
		categories: function() {
			return _components;
		},
		category: function(index) {
			return _components[index];
		},
		element: function(cat, elem) {
			return _components[cat].components[elem];
		},
		catAndElem: function(elemName) {
			return _catAndElem[elemName];
		},
        init: function(settings, components) {
    		_settings = settings;
    		_components = components;

    		_catAndElem = _buildElemToCatElemMap();
    		_addLinksToElementNotes();
    	}
	};

	return service;
}])

/**
	Handles all the dynamic data associated with the project's state.
**/
.factory('stateFactory', ['projectFactory', function(project) {
	var _category = 0,
		_menuOpen = false,
		_pageTitle = 'Style Guide',
        _page = 'home',
		_markdownNotes = '',
		_element = {
			index: 0,
			name: 'checkboxes',
			markdown: '',
			height: 250
		};

	var service = {
		category: function(set) {
			if (set !== undefined) _category = set;
			return _category;
		},
		menuOpen: function(set) {
			if (set != undefined) {
                _menuOpen = set;
            }
			return _menuOpen;
		},
		toggleMenu: function() {
			return this.menuOpen(!_menuOpen);
		},
		pageTitle: function(set) {
			if (set !== undefined) _pageTitle = set;
			return _pageTitle;
		},
		elementIndex: function(set) {
			if (set !== undefined) _element.index = set;
			return _element.index;
		},
		elementName: function(set) {
			if (set !== undefined) _element.name = set;
			return _element.name;
		},
		elementMarkdown: function(set) {
			if (set !== undefined) _element.markdown = set;
			return _element.markdown;
		},
		elementHeight: function(set) {
			if (set !== undefined) _element.height = set;
			return _element.height;
		},
        page: function(set) {
            if (set !== undefined) _page = set;
            return _page;
        },
		markdownNotes: function(set) {
			if (set !== undefined) _markdownNotes = set;
			return _markdownNotes;
		},
		loadRoute: function(cat, elem) {
			var elemObj = project.element(cat, elem);
			var catObj = project.category(cat);

			this.elementIndex(elem);
			this.elementName(elemObj.name);
			this.elementHeight(elemObj.height);
			this.category(cat);
			this.pageTitle(catObj.title);
		}
	};

	return service;
}]);
