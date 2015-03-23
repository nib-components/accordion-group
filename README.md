accordion-group
===============

Show only one accordion body at a time within an accordion-group.

Used in conjunction with [nib-components/accordion](https://github.com/nib-components/accordion) component.

    component install nib-components/accordion

## API

    var AccordionGroup = require('accordion-group');

    new AccordionGroup({
      el: document.querySelector('.js-accordion-group')
    });


## Example markup

    <div class="js-accordion-group">
        <div class="js-accordion is-closed">
            <div class="js-body">
                Show and hide me
            </div>
        </div>
        <div class="js-accordion is-closed">
            <div class="js-body">
                Show and hide me
            </div>
        </div>
        <div class="js-accordion is-closed">
            <div class="js-body">
                Show and hide me
            </div>
        </div>
    </div>