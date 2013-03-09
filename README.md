Gravity Placeholders
====================

A quick-and-dirty jQuery plugin that hides the labels of the selected
inputs and uses the contained text as a placeholder. Specifically designed 
for Gravity Forms (v1.6.7 at the time of development).

Using the Plugin
----------------

This plugin is designed for text-style inputs and textareas only. To target all
support Gravity Forms inputs, use the following:

    $('.gfield input[type=text],.gfield input[type=email],.gfield input[type=tel],.gfield input[type=url],.gfield textarea').gravityPlaceholders();

To target only standard text inputs:

    $('.gfield input[type=text]').gravityPlaceholders();

For more information on targeting specific inputs, refer to the 
[Gravity Forms Documentation][1].

Authors
-------

**Jason Lengstorf**

* http://twitter.com/jlengstorf
* http://github.com/jlengstorf

Copyright and license
---------------------

Copyright (c) 2012 Jason Lengstorf

Licensed under the MIT License (the "License"); you may not use this work 
except in compliance with the License. You may obtain a copy of the License in 
the license.txt file, or at:

http://opensource.org/licenses/mit-license.php

Unless required by applicable law or agreed to in writing, software 
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT 
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the 
License for the specific language governing permissions and limitations under 
the License.

[1]: http://www.gravityhelp.com/documentation/page/CSS_Targeting_Samples
