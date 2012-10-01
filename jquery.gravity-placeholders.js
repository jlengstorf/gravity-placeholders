/**
 * Gravity Placeholders jQuery Plugin
 *
 * A quick-and-dirty jQuery plugin that hides the labels of the selected
 * inputs and uses the contained text as a placeholder. Specifically designed 
 * for Gravity Forms (v1.6.7 at the time of development).
 *
 * Copyright (c) 2012 Jason Lengstorf
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
 * @version   1.0
 * @copyright 2012 Jason Lengstorf
 * @license   MIT License (http://opensource.org/licenses/mit-license.php)
 */
(function($){

    $.fn.gravityPlaceholders = function(  )
    {
        this.closest('form')
            .submit(function() {
                // Empties any placeholder values before submission
                this.each(function() {
                    var input = $(this);
                    if (input.val()===labelText) {
                        input.val('');
                    }
                })
            });

        return this.each(function() {
            var input  = $(this),
                thisID = input.attr('id'),
                label  = $('label[for='+thisID+']').hide(),

                // Removes the "required" span (if present), returns text
                labelText = label.find('span').remove().end().text();

            // If the input is empty, uses the label text as a "placeholder"
            if (input.val() == '') {
                input.val( labelText );
            } 

            input
                .focus(function() {
                    // Empties the input onfocus if value is the placeholder
                    if (input.val()===labelText) {
                        input.val('');
                    }
                })
                .blur(function() {
                    // Puts the placeholder in onblur if no value was entered
                    if (input.val()==='' || input.val()===labelText) {
                        input.val(labelText);
                    }
                });
        });
    };

})(jQuery);
