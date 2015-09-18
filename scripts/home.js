angular.module('StyleGuide')

.controller('Home', ['projectFactory', function(project) {
    this.shownUpdates = 4;
    this.allUpdatesVisible = false;

    this.displayUpdates = function() {
        return !(project.allUpdates().length == 0);
    }

    this.allUpdatesText = function() {
        if (project.allUpdates().length <= this.shownUpdates) {
            return '';
        }

        if (this.allUpdatesVisible) {
            return "View Less -";
        } else {
            return "View All +";
        }
    }

    this.allUpdates = function() {
        return project.allUpdates();
    }

    this.toggleAllUpdates = function() {
        this.allUpdatesVisible = !this.allUpdatesVisible;
    }

    this.showUpdate = function(index) {
        if (this.allUpdatesVisible || index < this.shownUpdates) {
            return true;
        }
        return false;
    }
}]);
