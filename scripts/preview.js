angular.module('StyleGuide')

.controller('Preview', ['stateFactory', 'projectFactory', 'urlFactory', '$scope', function(state, project, url, $scope) {
    this._markdownNotes = '';

    this.activePreviewURL = function() {
        return url.fullScreenURL(state.elementName());
    }

    this.heightStyle = function() {
        return { height: state.elementHeight() + 'px' };
    }

    this.markdownNotes = function() {
        return state.markdownNotes();
    }

    this.activeClass = function(index) {
        return (index == state.elementIndex()) ? 'active' : '';
    }

}]);
