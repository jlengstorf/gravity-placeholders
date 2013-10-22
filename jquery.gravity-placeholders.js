/**
 * Gravity Placeholders jQuery Plugin
 *
 * A quick-and-dirty jQuery plugin that hides the labels of the selected
 * inputs and uses the label text as a placeholder. Specifically designed 
 * for Gravity Forms (v1.6.7 at the time of development).
 *
 * Copyright (c) 2013 Jason Lengstorf
 *
 * LICENSE: Permission is hereby granted, free of charge, to any person 
 * obtaining a copy of this software and associated documentation files (the 
 * "Software"), to deal in the Software without restriction, including without 
 * limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to 
 * whom the Software is furnished to do so, subject to the following 
 * conditions:
 *
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 *
 * @author    Jason Lengstorf <jason@lengstorf.com>
 * @version   1.2.1
 * @copyright 2013 Jason Lengstorf
 * @license   MIT License (http://opensource.org/licenses/mit-license.php)
 */
;(function( $, window, document, undefined ) {

    var pluginName = 'gravityPlaceholders',
        defaults   = {
            className: 'showingPlaceholder'
        };

    function GravityPlaceholders( element, options )
    {
        this.element   = element;
        this.options   = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name     = pluginName;

        this.init();
    }

    GravityPlaceholders.prototype.init = function() {
        var options = this.options,
            input   = $(this.element),
            thisID  = input.attr('id'),
            label   = $('label[for='+thisID+']').hide(),

            // Checks for native placeholder support
            is_placeholder = 'placeholder' in document.createElement('input'),

            // Removes the "required" span (if present), returns text
            labelText = label.find('span').remove().end().text();

        // Identifies complex ginputs and uses the nearest label instead
        if (label.next('.ginput_container').hasClass('ginput_complex')) {
            labelText = input.next('label').text();
        }

        // Empties any placeholder values before submission
        input.closest('form').submit(function() {
            this.each(function() {
                var input = $(this);
                if (input.val()===labelText) {
                    input.val('');
                }
            });
        });

        // If the input is empty, uses the label text as a "placeholder"
        if (input.val()==='') {
            if (is_placeholder) {
                input.attr('placeholder', labelText);
            } else {
                input.val( labelText ).addClass(options.className);
            }
        }

        input.bind({
            // Empties the input onfocus if value is the placeholder
            focus: function() {
                if (input.val()===labelText) {
                    input.val('').removeClass(options.className);
                }
            },
            // Puts the placeholder in onblur if no value was entered
            blur: function() {
                if ((input.val()==='' || input.val()===labelText) && !is_placeholder) {
                    input.val(labelText).addClass(options.className);
                }
            }
        });
    };

    $.fn[pluginName] = function( options ) {
        return this.each(function() {
            if (!$.data(this, 'plugin_'+pluginName)) {
                $.data(
                    this,
                    'plugin_' + pluginName,
                    new GravityPlaceholders(this, options)
                );
            }
        });
    };

})( jQuery, window, document );