var event = require('event');
var closest = require('closest');
var Accordion = require('accordion');

/**
 * A group of accordions
 * @constructor
 * @param   {Object}        options
 * @param   {HTMLElement}   options.el                  The element
 * @param   {string}        [options.triggerSelector]   The trigger element selectors
 * @param   {string}        [options.accordionSelector] The accordion element selectors
 */
function AccordionGroup(options) {
  var self = this;

  var groupElement      = options.el;

  this.triggerSelector   = options.triggerSelector || '.js-trigger';
  this.triggerElements   = groupElement.querySelectorAll(this.triggerSelector);

  this.accordionSelector = options.accordionSelector || '.js-accordion';
  this.accordionElements = groupElement.querySelectorAll(this.accordionSelector);

  if (this.triggerElements.length !== this.accordionElements.length) {
    throw new Error('There must be as many trigger elements as accordion elements.');
  }

  for (var i=0; i<this.triggerElements.length; ++i) {
    event.bind(this.triggerElements[i], 'click', this.onTriggerClicked.bind(this));
  }

  this._accordions  = [];
  for (var i=0; i<this.accordionElements.length; ++i) {

    var accordion = new Accordion({el: this.accordionElements[i]});

    accordion
      .on('open', function() {
        for (var i=0; i<self._accordions.length; ++i) {
          if (this !== self._accordions[i]) {
            self._accordions[i].close();
          }
        }
      })
      .on('opened', function() {
        var index = self._accordions.indexOf(this);
        self.triggerElements[index].classList.add('is-open');
      })
      .on('closed', function() {
        var index = self._accordions.indexOf(this);
        self.triggerElements[index].classList.remove('is-open');
      })
    ;

    this._accordions.push(accordion);
  }

}

/**
 * @private
 * @param   {Event} event
 */
AccordionGroup.prototype.onTriggerClicked = function(event) {
  var triggerElement  = closest(event.target, this.triggerSelector, true, true);
  var triggerIndex    = Array.prototype.indexOf.call(this.triggerElements, triggerElement);
  this._accordions[triggerIndex].toggle();
};

module.exports = AccordionGroup;