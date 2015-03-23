accordion-group
===============

A group of accordions where only one accordion can be open at any one time.

Used in conjunction with [nib-components/accordion](https://github.com/nib-components/accordion) component.

    component install nib-components/accordion

## API

    var AccordionGroup = require('accordion-group');

    new AccordionGroup({
      el: document.querySelector('.js-accordion-group')
    });


## Example markup

    <div class="js-accordion-group">

        <button class="js-trigger">Show and hide the content</button>
        <div class="js-accordion is-closed">
            <div class="js-body">
                Show and hide me
            </div>
        </div>

        <button class="js-trigger">Show and hide the content</button>
        <div class="js-accordion is-closed">
            <div class="js-body">
                Show and hide me
            </div>
        </div>

        <button class="js-trigger">Show and hide the content</button>
        <div class="js-accordion is-closed">
            <div class="js-body">
                Show and hide me
            </div>
        </div>

    </div>