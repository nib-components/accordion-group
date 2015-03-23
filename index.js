var Accordion = require('accordion');

/**
 * A group of accordions
 * @param options
 * @constructor
 */
function AccordionGroup(options) {
  var self = this;

  this._accordions = [];
  var accordionElements = document.querySelectorAll(options.selector || AccordionGroup.selector);

  function closeOtherAccordions() {
    var accordion = this;
    self._accordions.forEach(function(otherAccordion) {
      if (accordion !== otherAccordion) {
        otherAccordion.close();
      }
    });

  }

  for (var i=0; i<accordionElements.length; ++i) {

    var accordion = new Accordion({
      el: accordionElements[i],
      triggerEl: accordionElements[i]//TODO: make this customisable
    });

    accordion.on('opened', closeOtherAccordions);

    this._accordions.push(accordion);

  }

}

AccordionGroup.selector = '.js-accordion';

module.exports = AccordionGroup;