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
    this._accordions.push(new Accordion({el: this.accordionElements[i]}));
  }

}

/**
 * Open an accordion, making sure all the other accordions are closed
 * @param {number} index The accordion index
 */
AccordionGroup.prototype.open = function(index) {
  var self = this;

  function open() {
    self._accordions[index].toggle();
  }

  function close(i) {

    //check if we've closed all the accordions
    if (i>=self._accordions.length) {
      return open();
    }

    //ignore the triggered accordion
    if (i === index) {
      return close(++i);
    }

    //close the accordion
    self._accordions[i]
      .once('closed', function() {
        console.log('Closed', i);
        close(++i);
      })
      .close()
    ;

  }

  close(0);

};

/**
 * @private
 * @param   {Event} event
 */
AccordionGroup.prototype.onTriggerClicked = function(event) {

  var triggerElement  = closest(event.target, this.triggerSelector, true, true);
  var triggerIndex    = Array.prototype.indexOf.call(this.triggerElements, triggerElement);

  this.open(triggerIndex);
};

module.exports = AccordionGroup;