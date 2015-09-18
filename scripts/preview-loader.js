
$(document).on("mobileinit", function() {
    $.extend($.mobile, {
        linkBindingEnabled: true,
        ajaxEnabled: true,
        defaultPageTransition: 'flow'
    });

    function getWidgetToLoad() {
        var component = document.location.search;
        if (component.length > 0) {
            component = component.substr(1); // remove question mark
            return component;
        }

        return null;
    }

    /*fade | flip | flow | pop | slide | slidedown | slidefade | slideup | turn | none*/

    for (var i = 0; i < components.length; i++) {
        var name = components[i];

        $.widget("custom." + name, {
            _create: function () {
                var self = this;

                self.element.load("../project/sources/components/" + this.widgetName + ".html", function () {
                    self.element.enhanceWithin();
                });
            }
        });

        if (getWidgetToLoad() == name) {
            (function (name) {
                setTimeout(function () {
                    var container = $('#container');
                    container[name]();
                }, 1);
            })(name);
        }
    }
});
