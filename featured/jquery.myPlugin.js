/**
 * @fileOverview jquery plugin pattern (featured)
 *               <p>License MIT
 *               <br />Copyright 2012 Christos Pontikis <a href="http://pontikis.net">http://pontikis.net</a>
 *               <br />Project page <a href="https://github.com/pontikis/jquery_plugin_patterns">https://github.com/pontikis/jquery_plugin_patterns</a>
 * @version 1.00
 * @author Christos Pontikis http://pontikis.net
 * @requires jquery
 */

/**
 * See <a href="http://jquery.com">http://jquery.com</a>.
 * @name $
 * @class
 * See the jQuery Library  (<a href="http://jquery.com">http://jquery.com</a>) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See <a href="http://jquery.com">http://jquery.com</a>
 * @name fn
 * @class
 * See the jQuery Library  (<a href="http://jquery.com">http://jquery.com</a>) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf $
 */

/** the foolowing is OPTIONAL in case private methods will be documented  */
/**
 * Pseudo-Namespace containing private methods (for documentation purposes)
 * @name _private_methods
 * @namespace
 */
"use strict";
(function($) {

    var pluginName = 'myPlugin';

    /* public methods ------------------------------------------------------- */
    var methods = {

        /**
         * @lends $.fn.myPlugin
         */
        init: function(options) {

            var elem = this;

            return this.each(function() {

                /**
                 * settings and defaults
                 * using $.extend, settings modification will affect elem.data() and vice versa
                 */
                var settings = elem.data(pluginName);
                if(typeof(settings) == 'undefined') {
                    var defaults = elem.myPlugin('getDefaults');
                    settings = $.extend({}, defaults, options);
                } else {
                    settings = $.extend({}, settings, options);
                }
                elem.data(pluginName, settings);

                var container_id = elem.attr("id");

                // simple validation
                validate_input(container_id);

                // bind events
                elem.unbind("onCustomEvent1").bind("onCustomEvent1", settings.onCustomEvent1);


            });

        },

        /**
         * Get default values
         * @example $(element).myPlugin('getDefaults');
         * @return {Object}
         */
        getDefaults: function() {
            return {
                opt1: 1,
                opt2: 'opt2_value',

                onCustomEvent1: function() {
                }
            };
        },

        /**
         * Get any option set to plugin using its name (as string)
         * @example $(element).myPlugin('getOption', some_option);
         * @param {String} opt
         * @return {*}
         */
        getOption: function(opt) {
            var elem = this;
            return elem.data(pluginName)[opt];
        },

        /**
         * Get all options
         * @example $(element).myPlugin('getAllOptions');
         * @return {*}
         */
        getAllOptions: function() {
            var elem = this;
            return elem.data(pluginName);
        },

        /**
         * Set option
         * @example $(element).myPlugin('setOption', 'option_name',  'option_value',  reinit);
         * @param {String} opt option names
         * @param val
         * @param {Boolean} reinit
         */
        setOption: function(opt, val, reinit) {
            var elem = this;
            elem.data(pluginName)[opt] = val;
            if(reinit) {
                elem.myPlugin('init');
            }
        },

        /**
         * Refresh plugin
         * @example $(element).myPlugin('refresh');
         * @return {*|jQuery}
         */
        refresh: function() {
            var elem = this;
            elem.myPlugin();
        },

        /**
         * Destroy plugin
         * @example $(element).myPlugin('destroy');
         * @return {*|jQuery}
         */
        destroy: function() {
            return $(this).each(function() {
                var $this = $(this);

                $this.removeData(pluginName);
            });
        }
    };

    /* private methods ------------------------------------------------------ */
    /** the foolowing is OPTIONAL in case private methods will be documented  */

    /**
     * @lends _private_methods
     */

    /**
     * Validate input values
     * @param container_id
     */
    var validate_input = function(container_id) {
        // your code here (OPTIONAL)
    };

    /**
     * myPlugin - short description.
     *
     * @class myPlugin
     * @memberOf $.fn
     */
    $.fn.myPlugin = function(method) {

        // OPTIONAL
        if(this.size() != 1) {
            var err_msg = 'You must use this plugin (' + pluginName + ') with a unique element (at once)';
            this.html('<span style="color: red;">' + 'ERROR: ' + err_msg + '</span>');
            $.error(err_msg);
        }

        // Method calling logic
        if(methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if(typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.' + pluginName);
        }

    };

})(jQuery);