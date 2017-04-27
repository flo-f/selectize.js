/**
 * Plugin: "depends_on" (selectize.js)
 * Copyright (c) 2017 SmileBack & contributors
 *
 * @author Florian Feigenbutz <flo@netztronauten.berlin>
 */

Selectize.define('depends_on', function(options) {
	var self = this;

    options = $.extend({
        onChange: function() { console.log('No change callback function '
            + 'defined as option for the `depends_on` plugin. '
            + 'Please pass a function named `onChange()` as plugin argument '
            + 'to be notified about changes in the upstream component.'); }
    }, options);

    var registerDependency = function(options) {
        var dependency = self.$input.data('dependsOn');

        if (!dependency) {
            return;
        }

        self.setup = (function() {
            var original = self.setup;
            return function() {
                var onData = function(value) {
                    self.disable();
                    self.clearOptions();
                    if (value === undefined || !value.length) {
                        return;
                    }
                    if (!Array.isArray(value) && options.hasOwnProperty('onChange')) {
                        options.onChange(value);
                    }
                };

                var otherSelectize = $('#' + dependency)[0].selectize;
                // disable component before load event starts
                // .on('load', ...) is only called AFTER data was loaded
                otherSelectize.load = (function() {
                    var original = otherSelectize.load;
                    return function() {
                        onData('');

                        original.apply(otherSelectize, arguments);

                        otherSelectize.on('load', function (value) {
                            onData(value);
                        });
                    };
                })();
                otherSelectize.on('change', onData);

                original.apply(self, arguments);
            };
        })();
    };
    registerDependency(options);
});
