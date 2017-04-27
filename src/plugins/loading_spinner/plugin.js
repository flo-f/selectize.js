/**
 * Plugin: "loading_spinner" (selectize.js)
 * Copyright (c) 2017 SmileBack & contributors
 *
 * @author Florian Feigenbutz <flo@netztronauten.berlin>
 */

Selectize.define('loading_spinner', function(options) {
	var self = this;

	options = $.extend({}, options);

    var addLoadingSpinner = function() {
        var html = '<div class="spinner-container"><div class="sk-fading-circle "><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div></div>';
        self.$control.append(html);
        self.disable();
    };

    var removeLoadingSpinner = function() {
        self.$control.find('.spinner-container').remove();
        self.enable();
    };

    var registerLoadEvents = function (options) {
        if (self.$input.data('loadingSpinner')) {
            self.load = (function() {
                var original = self.load;
                return function() {
                    addLoadingSpinner();

                    original.apply(self, arguments);

                    self.on('load', function () {
                        removeLoadingSpinner();
                    });
                };
            })();
        }
    };
    registerLoadEvents(options);
});
