(function( $, undefined ) {

$.widget( "mobile.filteringselect", $.extend( {
    initSelector: 'input[list]',

    _buildList: function(search) {
        this.filterList = $('<div>');
        this.filterList.attr('id', this.id + '-target');
        this.filterList.attr('class', 'filter-select-list');
        this.filterList[0].hidden = true;

        this.items.sort();

        // Add DOM element for each item.
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            var option = $('<div>');
            option.attr('class', 'option');
            option.attr('value', this.map[item.toUpperCase()].value);
            option.text(item);
            this.filterList.append(option);
        }

        // Map each item to a reference to the DOM Element.
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            this.map[item.toUpperCase()].elem = this.filterList.children()[i];
        }

        this.element.append(this.filterList);
    },

    refreshList: function(query) {
        query = query.toUpperCase();

        for (var i = 0; i < this.items.length; i++) {
            var key = this.items[i].toUpperCase();
            var elem = this.map[key].elem;

            // Hide items that do not match the query.
            if (key.indexOf(query) < 0) {
                elem.hidden = true;
            }
            else {
                elem.hidden = false;
            }
        }

        // Remove any item hovers
        if (this.hoverElem != undefined) {
            this.hoverElem.removeClass('hover');
            this.hoverElem = null;
        }
    },

    _parseDomData: function() {
        this.id = this.element.attr('list');
        this.placeholder = this.element.attr('placeholder');

        this.items = [];
        this.map = {};
        var domDatalist = $('#' + this.id);
        var domOptionList = domDatalist.children();
        for (var i = 0; i < domOptionList.length; i++) {
            var item = domOptionList[i];
            var itemName = item.innerHTML;
            this.items[i] = itemName;
            this.map[itemName.toUpperCase()] = { value: $(item).prop('value') };
        }

        // Remove the Data list
        domDatalist.remove();
    },

    _create: function() {
        console.log('here');
        // Get the info from the DOM
        this._parseDomData();

        //  Build new DOM
        var filterParent = $('<div>');
        filterParent.attr('class', 'filter-select');

		this.filterInput = $('<input>');
        this.filterInput.attr('type', 'text');
        this.filterInput.attr('data-wrapper-class', 'filter-select-input nc-icon-outline ui-1_zoom');
        this.filterInput.attr('placeholder', this.placeholder);
        filterParent.append(this.filterInput);
        filterParent.enhanceWithin();

        this.submitInput = $('<input>');
        this.submitInput.attr('name', this.id);
        this.submitInput.attr('type', 'hidden');
        filterParent.append(this.submitInput);

        // Replace the old element
        filterParent.insertAfter(this.element);
        this.element.remove();
        this.element = filterParent;

        this.build();
    },

    hideList: function() {
        this.filterList[0].hidden = true;
    },

    showList: function() {
        var elem = this.element[0];

        var listHeight = window.innerHeight - elem.offsetTop - elem.offsetHeight - 30;
        this.filterList.css('max-height', listHeight + 'px');

        this.refreshList(this.filterInput.val());
        this.filterList[0].hidden = false;
    },

    getElemByI: function(index) {
        var item = this.items[index];
        var elem = this.map[item.toUpperCase()].elem;
        return $(elem);
    },

    updateHoverItem: function(index) {
        this.hoverElem = this.getElemByI(index);
        this.hoverI = index;
        this.hoverElem.addClass('hover');
    },

    build: function() {
        var self = this;

        this._buildList();

        var isHidden = function(index) {
            if (index == -1) return false;
            var elem = self.getElemByI(index);
            return elem[0].hidden;
        }

        var isInvalid = function(index) {
            if (index >= self.items.length || index < 0) {
                return true;
            }
        }

        var hoverNext = function(index, dir) {
            var nextI;

            // No element is highlighted
            if (index == null) {
                nextI = 0;

                if (isHidden(nextI)) {
                    hoverNext(nextI, dir);
                    return;
                }
            }
            // Some element is already highlighted
            else {
                nextI = (dir == 'next') ? index+1 : index-1;

                if (isInvalid(nextI)) {
                    return;
                }

                if (isHidden(nextI)) {
                    hoverNext(nextI, dir);
                    return;
                }
            }

            if (self.hoverElem != undefined)
                self.hoverElem.removeClass('hover');

            self.updateHoverItem(nextI);
        }

        var elemClicked = function(e) {
            var elem;

            if ($.isNumeric(e)) {
                elem = self.getElemByI(e);
            }
            else {
                elem = e;
            }

            self.filterInput.val(elem.text());
            self.submitInput.val(elem.attr('value'));
            self.filterInput.blur();

            if (self.hoverElem) {
                self.hoverElem.removeClass('hover');
                self.hoverElem = undefined;
            }
            if (self.hoverI) {
                self.hoverI = undefined;
            }
        };

        this.filterInput.on('keyup', function(e) {
            e.up = function() { return e.which == 38; }
            e.down = function() { return e.which == 40; }
            e.enter = function() { return e.which == 13; }

            self.submitInput.val(self.filterInput.val());

            if (!(e.up() || e.down())) {
                self.refreshList(self.filterInput.val());
            }

            if ((e.up() || e.down()) && self.hoverElem == undefined) {
                hoverNext(null, 'next');
            }
            else {
                if (e.up()) {
                    hoverNext(self.hoverI, 'prev');
                }
                else if (e.down()) {
                    hoverNext(self.hoverI, 'next');
                }
                else if (e.enter()) {
                    if (!self.hoverI) {
                        hoverNext(null, 'next');
                    }
                    elemClicked(self.hoverI);
                }
            }
        });

        this.filterInput.on('blur', function() {
            self.hideList();
        });

        this.filterInput.on('focus', function() {
            self.showList();
        });

        this.filterList.on('mousedown', function(e) {
            elemClicked($(e.target));
        });

        this.filterList.on('touchdown', function(e) {
            elemClicked($(e.target));
        });
    }
}, $.mobile.behaviors.formReset ) );

})( jQuery );
