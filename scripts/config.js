angular.module('StyleGuide')

.config(['hljsServiceProvider', '$stateProvider', '$urlRouterProvider', function(hljsServiceProvider, $stateProvider, $urlRouterProvider) {
	hljsServiceProvider.setOptions({
		tabReplace: '    '
	});

	$urlRouterProvider.when('', '/home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'partials/homepage.html',
			resolve: {
				projectLoader: ['ajaxFactory', function(ajax) {
					return ajax.loadAll();
				}]
			},
			controller: ['stateFactory', 'projectFactory', 'projectLoader', function(state, project, loader) {
                state.menuOpen(false);
				state.page('home');
				if (project.categories() === undefined)
					project.init(loader.settings, loader.components);
			}]
		})
		.state('element-view/:cat/:elem', {
			url: '/element-view/:cat/:elem',
			templateUrl: 'partials/view.html',
			resolve: {
				projectLoader: ['ajaxFactory', function(ajax) {
					return ajax.loadAll();
				}]
			},
			controller: ['$http', 'stateFactory', 'projectFactory', 'projectLoader', '$stateParams', '$scope', function($http, state, project, loader, $stateParams, $scope) {
                state.menuOpen(false);
                state.page('preview');
                if (project.categories() === undefined)
					project.init(loader.settings, loader.components);
				state.loadRoute($stateParams.cat, $stateParams.elem);

				var responsePromise = $http.get('project/sources/components/' + state.elementName() + '.md');
				var md_content;
		        var markdownNotes = '';

				responsePromise.success(function(data, status, headers, config) {
					md_content = data;
					var markdownHtml = markdown.toHTML( md_content );

					state.markdownNotes(markdownHtml);
					setTimeout(function () {
						$('pre code').each(function(i, block) {
					    	hljs.highlightBlock(block);
					  	});
				  	}, 10);
				}).error(function(data, status, headers, config) {
					console.log("There was an error making an AJAX call to \"project/sources/components/" + state.elementName() + ".md\"");
					console.log("Status: " + status);

					// Remove any notes and snippets
					state.markdownNotes('');
				});
			}]
		});
}])
