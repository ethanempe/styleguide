(function( $, undefined ) {

$.widget( "mobile.customselectmenu", $.extend( {
    initSelector: "select",

    options: {
        theme: null,
        icon: "carat-d",
        iconpos: "right",
        inline: false,
        corners: true,
        shadow: true,
        iconshadow: false, /* TODO: Deprecated in 1.4, remove in 1.5. */
        overlayTheme: null,
        dividerTheme: null,
        hidePlaceholderMenuItems: true,
        closeText: "Close",
        nativeMenu: true,
        // This option defaults to true on iOS devices.
        preventFocusZoom: /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1,
        mini: false
    },

    _button: function() {
        return $( "<div/>" );
    },

    _setDisabled: function( value ) {
        this.element.attr( "disabled", value );
        this.button.attr( "aria-disabled", value );
        return this._setOption( "disabled", value );
    },

    _focusButton : function() {
        var self = this;

        setTimeout( function() {
            self.button.focus();
        }, 40);
    },

    _selectOptions: function() {
        return this.select.find( "option" );
    },

    // setup items that are generally necessary for select menu extension
    _preExtension: function() {
        var inline = this.options.inline || this.element.jqmData( "inline" ),
            mini = this.options.mini || this.element.jqmData( "mini" ),
            classes = "";
        // TODO: Post 1.1--once we have time to test thoroughly--any classes manually applied to the original element should be carried over to the enhanced element, with an `-enhanced` suffix. See https://github.com/jquery/jquery-mobile/issues/3577
        /* if ( $el[0].className.length ) {
            classes = $el[0].className;
        } */
        if ( !!~this.element[0].className.indexOf( "ui-btn-left" ) ) {
            classes = " ui-btn-left";
        }

        if (  !!~this.element[0].className.indexOf( "ui-btn-right" ) ) {
            classes = " ui-btn-right";
        }

        if ( inline ) {
            classes += " ui-btn-inline";
        }
        if ( mini ) {
            classes += " ui-mini";
        }

        this.select = this.element.removeClass( "ui-btn-left ui-btn-right" ).wrap( "<div class='ui-select" + classes + "'>" );
        this.selectId  = this.select.attr( "id" ) || ( "select-" + this.uuid );
        this.buttonId = this.selectId + "-button";
        this.label = $( "label[for='"+ this.selectId +"']" );
        this.isMultiple = this.select[ 0 ].multiple;
    },

    _destroy: function() {
        var wrapper = this.element.parents( ".ui-select" );
        if ( wrapper.length > 0 ) {
            if ( wrapper.is( ".ui-btn-left, .ui-btn-right" ) ) {
                this.element.addClass( wrapper.hasClass( "ui-btn-left" ) ? "ui-btn-left" : "ui-btn-right" );
            }
            this.element.insertAfter( wrapper );
            wrapper.remove();
        }
    },

    _create: function() {
        this.element.selectmenu("destroy");

        this._preExtension();

        this.button = this._button();
        this.button.jqmData("element", this.element.parent());

        var self = this,

            options = this.options,

            iconpos = options.icon ? ( options.iconpos || this.select.jqmData( "iconpos" ) ) : false,

            button = this.button
                .insertBefore( this.select )
                .attr( "id", this.buttonId )
                .addClass( "ui-btn" +
                    ( options.icon ? ( " ui-icon-" + options.icon + " ui-btn-icon-" + iconpos +
                    ( options.iconshadow ? " ui-shadow-icon" : "" ) ) :    "" ) + /* TODO: Remove in 1.5. */
                    ( options.theme ? " ui-btn-" + options.theme : "" ) +
                    ( options.corners ? " ui-corner-all" : "" ) +
                    ( options.shadow ? " ui-shadow" : "" ) );

        this.setButtonText();

        // Opera does not properly support opacity on select elements
        // In Mini, it hides the element, but not its text
        // On the desktop,it seems to do the opposite
        // for these reasons, using the nativeMenu option results in a full native select in Opera
        if ( options.nativeMenu && window.opera && window.opera.version ) {
            button.addClass( "ui-select-nativeonly" );
        }

        // Add counter for multi selects
        if ( this.isMultiple ) {
            this.buttonCount = $( "<span>" )
                .addClass( "ui-li-count ui-body-inherit" )
                .hide()
                .appendTo( button.addClass( "ui-li-has-count" ) );
        }

        // Disable if specified
        if ( options.disabled || this.element.attr( "disabled" )) {
            this.disable();
        }

        // Events on native select
        this.select.change(function() {
            self.refresh();

            if ( !!options.nativeMenu ) {
                self._delay( function() {
                    self.select.blur();
                });
            }
        });

        this._handleFormReset();

        this._on( this.button, {
            keydown: "_handleKeydown"
        });

        this.build();
    },

    build: function() {
        var self = this;

        this.select
            .appendTo( self.button )
            .bind( "vmousedown", function() {
                // Add active class to button
                self.button.addClass( $.mobile.activeBtnClass );
            })
            .bind( "focus", function() {
                self.button.addClass( $.mobile.focusClass );
            })
            .bind( "blur", function() {
                self.button.removeClass( $.mobile.focusClass );
            })
            .bind( "focus vmouseover", function() {
                self.button.trigger( "vmouseover" );
            })
            .bind( "vmousemove", function() {
                // Remove active class on scroll/touchmove
                self.button.removeClass( $.mobile.activeBtnClass );
            })
            .bind( "change blur vmouseout", function() {
                self.button.trigger( "vmouseout" )
                    .removeClass( $.mobile.activeBtnClass );
            });

        // In many situations, iOS will zoom into the select upon tap, this prevents that from happening
        self.button.bind( "vmousedown", function() {
            if ( self.options.preventFocusZoom ) {
                    $.mobile.zoom.disable( true );
            }
        });
        self.label.bind( "click focus", function() {
            if ( self.options.preventFocusZoom ) {
                    $.mobile.zoom.disable( true );
            }
        });
        self.select.bind( "focus", function() {
            if ( self.options.preventFocusZoom ) {
                    $.mobile.zoom.disable( true );
            }
        });
        self.button.bind( "mouseup", function() {
            if ( self.options.preventFocusZoom ) {
                setTimeout(function() {
                    $.mobile.zoom.enable( true );
                }, 0 );
            }
        });
        self.select.bind( "blur", function() {
            if ( self.options.preventFocusZoom ) {
                $.mobile.zoom.enable( true );
            }
        });

    },

    selected: function() {
        return this._selectOptions().filter( ":selected" );
    },

    selectedIndices: function() {
        var self = this;

        return this.selected().map(function() {
            return self._selectOptions().index( this );
        }).get();
    },

    setButtonText: function() {
        var self = this,
            selected = this.selected(),
            text = this.placeholder,
            span = $( document.createElement( "span" ) );

        this.button.children( "span" ).not( ".ui-li-count" ).remove().end().end().prepend( (function() {
            if ( selected.length ) {
                text = selected.map(function() {
                    return $( this ).text();
                }).get().join( ", " );
            } else {
                text = self.placeholder;
            }

            if ( text ) {
                span.text( text );
            } else {

                // Set the contents to &nbsp; which we write as &#160; to be XHTML compliant - see gh-6699
                span.html( "&#160;" );
            }

            // TODO possibly aggregate multiple select option classes
            return span
                .addClass( self.select.attr( "class" ) )
                .addClass( selected.attr( "class" ) )
                .removeClass( "ui-screen-hidden" );
        })());
    },

    setButtonCount: function() {
        var selected = this.selected();

        // multiple count inside button
        if ( this.isMultiple ) {
            this.buttonCount[ selected.length > 1 ? "show" : "hide" ]().text( selected.length );
        }
    },

    _handleKeydown: function( /* event */ ) {
        this._delay( "_refreshButton" );
    },

    _reset: function() {
        this.refresh();
    },

    _refreshButton: function() {
        this.setButtonText();
        this.setButtonCount();
    },

    refresh: function() {
        this._refreshButton();
    },

    // open and close preserved in native selects
    // to simplify users code when looping over selects
    open: $.noop,
    close: $.noop,

    disable: function() {
        this._setDisabled( true );
        this.button.addClass( "ui-state-disabled" );
    },

    enable: function() {
        this._setDisabled( false );
        this.button.removeClass( "ui-state-disabled" );
    }
}, $.mobile.behaviors.formReset ) );

})( jQuery );


(function( $, undefined ) {

var unfocusableItemSelector = ".ui-disabled,.ui-state-disabled,.ui-li-divider,.ui-screen-hidden,:jqmData(role='placeholder')",
    goToAdjacentItem = function( item, target, direction ) {
        var adjacent = item[ direction + "All" ]()
            .not( unfocusableItemSelector )
            .first();

        // if there's a previous option, focus it
        if ( adjacent.length ) {
            target
                .blur()
                .attr( "tabindex", "-1" );

            adjacent.find( "a" ).first().focus();
        }
    };

$.widget( "mobile.customselectmenu", $.mobile.customselectmenu, {
    _create: function() {
        var o = this.options;

        // Custom selects cannot exist inside popups, so revert the "nativeMenu"
        // option to true if a parent is a popup
        o.nativeMenu = o.nativeMenu || ( this.element.parents( ":jqmData(role='custompopup'),:mobile-custompopup" ).length > 0 );

        return this._super();
    },

    _handleSelectFocus: function() {
        this.element.blur();
        this.button.focus();
    },

    _handleKeydown: function( event ) {
        this._super( event );
        this._handleButtonVclickKeydown( event );
    },

    _handleButtonVclickKeydown: function( event ) {

        if ( this.options.disabled || this.isOpen || this.options.nativeMenu ) {
            return;
        }

        if (event.type === "vclick" ||
                event.keyCode && (event.keyCode === $.mobile.keyCode.ENTER || event.keyCode === $.mobile.keyCode.SPACE)) {

            this._decideFormat();
            //if ( this.menuType === "overlay" ) {
                this.button.attr( "href", "#" + this.popupId ).attr( "data-" + ( $.mobile.ns || "" ) + "rel", "custompopup" );
            //} else {
            //    this.button.attr( "href", "#" + this.dialogId ).attr( "data-" + ( $.mobile.ns || "" ) + "rel", "dialog" );
            //}
            this.isOpen = true;
            // Do not prevent default, so the navigation may have a chance to actually open the chosen format
        }
    },

    _handleListFocus: function( e ) {
        var params = ( e.type === "focusin" ) ?
            { tabindex: "0", event: "vmouseover" }:
            { tabindex: "-1", event: "vmouseout" };

        $( e.target )
            .attr( "tabindex", params.tabindex )
            .trigger( params.event );
    },

    _handleListKeydown: function( event ) {
        var target = $( event.target ),
            li = target.closest( "li" );

        // switch logic based on which key was pressed
        switch ( event.keyCode ) {
            // up or left arrow keys
        case 38:
            goToAdjacentItem( li, target, "prev" );
            return false;
            // down or right arrow keys
        case 40:
            goToAdjacentItem( li, target, "next" );
            return false;
            // If enter or space is pressed, trigger click
        case 13:
        case 32:
            target.trigger( "click" );
            return false;
        }
    },

    _handleMenuPageHide: function() {

        // After the dialog's done, we may want to trigger change if the value has actually changed
        this._delayedTrigger();

        // TODO centralize page removal binding / handling in the page plugin.
        // Suggestion from @jblas to do refcounting
        //
        // TODO extremely confusing dependency on the open method where the pagehide.remove
        // bindings are stripped to prevent the parent page from disappearing. The way
        // we're keeping pages in the DOM right now sucks
        //
        // rebind the page remove that was unbound in the open function
        // to allow for the parent page removal from actions other than the use
        // of a dialog sized custom select
        //
        // doing this here provides for the back button on the custom select dialog
        this.thisPage.page( "bindRemove" );
    },

    _handleHeaderCloseClick: function() {
        if ( this.menuType === "overlay" ) {
            this.close();
            return false;
        }
    },

    _handleListItemClick: function( event ) {
        var listItem = $( event.target ).closest( "li" ),

            // Index of option tag to be selected
            oldIndex = this.select[ 0 ].selectedIndex,
            newIndex = $.mobile.getAttribute( listItem, "option-index" ),
            option = this._selectOptions().eq( newIndex )[ 0 ];

        // Toggle selected status on the tag for multi selects
        option.selected = this.isMultiple ? !option.selected : true;

        // Toggle checkbox class for multiple selects
        if ( this.isMultiple ) {
            listItem.find( "a" )
                .toggleClass( "ui-checkbox-on", option.selected )
                .toggleClass( "ui-checkbox-off", !option.selected );
        }

        // If it's not a multiple select, trigger change after it has finished closing
        if ( !this.isMultiple && oldIndex !== newIndex ) {
            this._triggerChange = true;
        }

        // Trigger change if it's a multiple select
        // Hide custom select for single selects only - otherwise focus clicked item
        // We need to grab the clicked item the hard way, because the list may have been rebuilt
        if ( this.isMultiple ) {
            this.select.trigger( "change" );
            this.list.find( "li:not(.ui-li-divider)" ).eq( newIndex )
                .find( "a" ).first().focus();
        }
        else {
            this.close();
        }

        event.preventDefault();
    },

    build: function() {
        var selectId, popupId, dialogId, label, thisPage, isMultiple, menuId,
            themeAttr, overlayTheme, overlayThemeAttr, dividerThemeAttr,
            menuPage, listbox, list, header, headerTitle, menuPageContent,
            menuPageClose, headerClose,
            o = this.options;

        if ( o.nativeMenu ) {
            return this._super();
        }

        selectId = this.selectId;
        popupId = selectId + "-listbox";
        dialogId = selectId + "-dialog";
        label = this.label;
        thisPage = this.element.closest( ".ui-page" );
        isMultiple = this.element[ 0 ].multiple;
        menuId = selectId + "-menu";
        themeAttr = o.theme ? ( " data-" + $.mobile.ns + "theme='" + o.theme + "'" ) : "";
        overlayTheme = o.overlayTheme || o.theme || null;
        overlayThemeAttr = overlayTheme ? ( " data-" + $.mobile.ns +
            "overlay-theme='" + overlayTheme + "'" ) : "";
        dividerThemeAttr = ( o.dividerTheme && isMultiple ) ? ( " data-" + $.mobile.ns + "divider-theme='" + o.dividerTheme + "'" ) : "";
        menuPage = $( "<div data-" + $.mobile.ns + "role='dialog' class='ui-selectmenu' id='" + dialogId + "'" + themeAttr + overlayThemeAttr + ">" +
            "<div data-" + $.mobile.ns + "role='header'>" +
            "<div class='ui-title'></div>"+
            "</div>"+
            "<div data-" + $.mobile.ns + "role='content'></div>"+
            "</div>" );
        listbox = $( "<div" + themeAttr + overlayThemeAttr + " id='" + popupId +
                "' class='ui-selectmenu'></div>" )
            .insertAfter( this.select )
            .custompopup();
        list = $( "<ul class='ui-selectmenu-list' id='" + menuId + "' role='listbox' aria-labelledby='" + this.buttonId + "'" + themeAttr + dividerThemeAttr + "></ul>" ).appendTo( listbox );
        header = $( "<div class='ui-header ui-bar-" + ( o.theme ? o.theme : "inherit" ) + "'></div>" ).prependTo( listbox );
        headerTitle = $( "<h1 class='ui-title'></h1>" ).appendTo( header );

        if ( this.isMultiple ) {
            headerClose = $( "<a>", {
                "role": "button",
                "text": o.closeText,
                "href": "#",
                "class": "ui-btn ui-corner-all ui-btn-left ui-btn-icon-notext ui-icon-delete"
            }).appendTo( header );
        }

        $.extend( this, {
            selectId: selectId,
            menuId: menuId,
            popupId: popupId,
            dialogId: dialogId,
            thisPage: thisPage,
            menuPage: menuPage,
            label: label,
            isMultiple: isMultiple,
            theme: o.theme,
            listbox: listbox,
            list: list,
            header: header,
            headerTitle: headerTitle,
            headerClose: headerClose,
            menuPageContent: menuPageContent,
            menuPageClose: menuPageClose,
            placeholder: ""
        });

        // Create list from select, update state
        this.refresh();

        if ( this._origTabIndex === undefined ) {
            // Map undefined to false, because this._origTabIndex === undefined
            // indicates that we have not yet checked whether the select has
            // originally had a tabindex attribute, whereas false indicates that
            // we have checked the select for such an attribute, and have found
            // none present.
            this._origTabIndex = ( this.select[ 0 ].getAttribute( "tabindex" ) === null ) ? false : this.select.attr( "tabindex" );
        }
        this.select.attr( "tabindex", "-1" );
        this._on( this.select, { focus : "_handleSelectFocus" } );

        // Button events
        this._on( this.button, {
            vclick: "_handleButtonVclickKeydown"
        });

        // Events for list items
        this.list.attr( "role", "listbox" );
        this._on( this.list, {
            "focusin": "_handleListFocus",
            "focusout": "_handleListFocus",
            "keydown": "_handleListKeydown",
            "click li:not(.ui-disabled,.ui-state-disabled,.ui-li-divider)": "_handleListItemClick"
        });

        // button refocus ensures proper height calculation
        // by removing the inline style and ensuring page inclusion
        this._on( this.menuPage, { pagehide: "_handleMenuPageHide" } );

        // Events on the popup
        this._on( this.listbox, { custompopupafterclose: "_popupClosed" } );

        // Close button on small overlays
        if ( this.isMultiple ) {
            this._on( this.headerClose, { click: "_handleHeaderCloseClick" } );
        }

        return this;
    },

    _popupClosed: function() {
        this.close();
        this._delayedTrigger();
        this.button.removeClass('ui-popup-open');
    },

    _delayedTrigger: function() {
        if ( this._triggerChange ) {
            this.element.trigger( "change" );
        }
        this._triggerChange = false;
    },

    _isRebuildRequired: function() {
        var list = this.list.find( "li" ),
            options = this._selectOptions().not( ".ui-screen-hidden" );

        // TODO exceedingly naive method to determine difference
        // ignores value changes etc in favor of a forcedRebuild
        // from the user in the refresh method
        return options.text() !== list.text();
    },

    selected: function() {
        return this._selectOptions().filter( ":selected:not( :jqmData(placeholder='true') )" );
    },

    refresh: function( force ) {
        var self, indices;

        if ( this.options.nativeMenu ) {
            return this._super( force );
        }

        self = this;
        if ( force || this._isRebuildRequired() ) {
            self._buildList();
        }

        indices = this.selectedIndices();

        self.setButtonText();
        self.setButtonCount();

        self.list.find( "li:not(.ui-li-divider)" )
            .find( "a" ).removeClass( $.mobile.activeBtnClass ).end()
            .attr( "aria-selected", false )
            .each(function( i ) {
                var item = $( this );
                if ( $.inArray( i, indices ) > -1 ) {

                    // Aria selected attr
                    item.attr( "aria-selected", true );

                    // Multiple selects: add the "on" checkbox state to the icon
                    if ( self.isMultiple ) {
                        item.find( "a" ).removeClass( "ui-checkbox-off" ).addClass( "ui-checkbox-on" );
                    } else {
                        if ( item.hasClass( "ui-screen-hidden" ) ) {
                            item.next().find( "a" ).addClass( $.mobile.activeBtnClass );
                        } else {
                            item.find( "a" ).addClass( $.mobile.activeBtnClass );
                        }
                    }
                } else if ( self.isMultiple ) {
                    item.find( "a" ).removeClass( "ui-checkbox-on" ).addClass( "ui-checkbox-off" );
                }
            });
    },

    close: function() {
        if ( this.options.disabled || !this.isOpen ) {
            return;
        }

        var self = this;

        if ( self.menuType === "page" ) {
            self.menuPage.dialog( "close" );
            self.list.appendTo( self.listbox );
        } else {
            self.listbox.custompopup( "close" );
        }

        self._focusButton();
        // allow the dialog to be closed again
        self.isOpen = false;
    },

    open: function() {
        this.button.click();
    },

    _focusMenuItem: function() {
        var selector = this.list.find( "a." + $.mobile.activeBtnClass );
        if ( selector.length === 0 ) {
            selector = this.list.find( "li:not(" + unfocusableItemSelector + ") a.ui-btn" );
        }
        selector.first().focus();

        this.button.addClass('ui-popup-open');
    },

    _decideFormat: function() {
        var self = this,
            $window = this.window,
            selfListParent = self.list.parent(),
            menuHeight = selfListParent.outerHeight(),
            scrollTop = $window.scrollTop(),
            btnOffset = self.button.offset().top,
            screenHeight = $window.height();

        if ( menuHeight > screenHeight - 80 || !$.support.scrollTop ) {

            self.menuPage.appendTo( $.mobile.pageContainer ).page();
            self.menuPageContent = self.menuPage.find( ".ui-content" );
            self.menuPageClose = self.menuPage.find( ".ui-header a" );

            // prevent the parent page from being removed from the DOM,
            // otherwise the results of selecting a list item in the dialog
            // fall into a black hole
            self.thisPage.unbind( "pagehide.remove" );

            //for WebOS/Opera Mini (set lastscroll using button offset)
            if ( scrollTop === 0 && btnOffset > screenHeight ) {
                self.thisPage.one( "pagehide", function() {
                    $( this ).jqmData( "lastScroll", btnOffset );
                });
            }

            self.menuPage.one( {
                pageshow: $.proxy( this, "_focusMenuItem" ),
                pagehide: $.proxy( this, "close" )
            });

            self.menuType = "page";
            self.menuPageContent.append( self.list );
            self.menuPage
                .find( "div .ui-title" )
                    .text( self.label.getEncodedText() || self.placeholder );
        } else {
            self.menuType = "overlay";

            self.listbox.one( { custompopupafteropen: $.proxy( this, "_focusMenuItem" ) } );
        }
    },

    _buildList: function() {
        var self = this,
            o = this.options,
            placeholder = this.placeholder,
            needPlaceholder = true,
            dataIcon = "false",
            $options, numOptions, select,
            dataPrefix = "data-" + $.mobile.ns,
            dataIndexAttr = dataPrefix + "option-index",
            dataIconAttr = dataPrefix + "icon",
            dataRoleAttr = dataPrefix + "role",
            dataPlaceholderAttr = dataPrefix + "placeholder",
            fragment = document.createDocumentFragment(),
            isPlaceholderItem = false,
            optGroup,
            i,
            option, $option, parent, text, anchor, classes,
            optLabel, divider, item;

        self.list.empty().filter( ".ui-listview" ).listview( "destroy" );
        $options = this._selectOptions();
        numOptions = $options.length;
        select = this.select[ 0 ];

        for ( i = 0; i < numOptions;i++, isPlaceholderItem = false) {
            option = $options[i];
            $option = $( option );

            // Do not create options based on ui-screen-hidden select options
            if ( $option.hasClass( "ui-screen-hidden" ) ) {
                continue;
            }

            parent = option.parentNode;
            classes = [];

            // Although using .text() here raises the risk that, when we later paste this into the
            // list item we end up pasting possibly malicious things like <script> tags, that risk
            // only arises if we do something like $( "<li><a href='#'>" + text + "</a></li>" ). We
            // don't do that. We do document.createTextNode( text ) instead, which guarantees that
            // whatever we paste in will end up as text, with characters like <, > and & escaped.
            text = $option.text();
            anchor = document.createElement( "a" );
            anchor.setAttribute( "href", "#" );
            anchor.appendChild( document.createTextNode( text ) );

            // Are we inside an optgroup?
            if ( parent !== select && parent.nodeName.toLowerCase() === "optgroup" ) {
                optLabel = parent.getAttribute( "label" );
                if ( optLabel !== optGroup ) {
                    divider = document.createElement( "li" );
                    divider.setAttribute( dataRoleAttr, "list-divider" );
                    divider.setAttribute( "role", "option" );
                    divider.setAttribute( "tabindex", "-1" );
                    divider.appendChild( document.createTextNode( optLabel ) );
                    fragment.appendChild( divider );
                    optGroup = optLabel;
                }
            }

            if ( needPlaceholder && ( !option.getAttribute( "value" ) || text.length === 0 || $option.jqmData( "placeholder" ) ) ) {
                needPlaceholder = false;
                isPlaceholderItem = true;

                // If we have identified a placeholder, record the fact that it was
                // us who have added the placeholder to the option and mark it
                // retroactively in the select as well
                if ( null === option.getAttribute( dataPlaceholderAttr ) ) {
                    this._removePlaceholderAttr = true;
                }
                option.setAttribute( dataPlaceholderAttr, true );
                if ( o.hidePlaceholderMenuItems ) {
                    classes.push( "ui-screen-hidden" );
                }
                if ( placeholder !== text ) {
                    placeholder = self.placeholder = text;
                }
            }

            item = document.createElement( "li" );
            if ( option.disabled ) {
                classes.push( "ui-state-disabled" );
                item.setAttribute( "aria-disabled", true );
            }
            item.setAttribute( dataIndexAttr, i );
            item.setAttribute( dataIconAttr, dataIcon );
            if ( isPlaceholderItem ) {
                item.setAttribute( dataPlaceholderAttr, true );
            }
            item.className = classes.join( " " );
            item.setAttribute( "role", "option" );
            anchor.setAttribute( "tabindex", "-1" );
            if ( this.isMultiple ) {
                $( anchor ).addClass( "ui-btn ui-checkbox-off ui-btn-icon-right" );
            }

            item.appendChild( anchor );
            fragment.appendChild( item );
        }

        self.list[0].appendChild( fragment );

        // Hide header if it's not a multiselect and there's no placeholder
        if ( !this.isMultiple && !placeholder.length ) {
            this.header.addClass( "ui-screen-hidden" );
        } else {
            this.headerTitle.text( this.placeholder );
        }

        // Now populated, create listview
        self.list.listview();
    },

    _button: function() {
        return this.options.nativeMenu ?
            this._super() :
            $( "<a>", {
                "href": "#",
                "role": "button",
                // TODO value is undefined at creation
                "id": this.buttonId,
                "aria-haspopup": "true",

                // TODO value is undefined at creation
                "aria-owns": this.menuId
            });
    },

    _destroy: function() {

        if ( !this.options.nativeMenu ) {
            this.close();

            // Restore the tabindex attribute to its original value
            if ( this._origTabIndex !== undefined ) {
                if ( this._origTabIndex !== false ) {
                    this.select.attr( "tabindex", this._origTabIndex );
                } else {
                    this.select.removeAttr( "tabindex" );
                }
            }

            // Remove the placeholder attribute if we were the ones to add it
            if ( this._removePlaceholderAttr ) {
                this._selectOptions().removeAttr( "data-" + $.mobile.ns + "placeholder" );
            }

            // Remove the popup
            this.listbox.remove();

            // Remove the dialog
            this.menuPage.remove();
        }

        // Chain up
        this._super();
    }
});

})( jQuery );
