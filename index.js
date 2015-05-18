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

  this.el = options.el;

  this.triggerSelector    = options.triggerSelector || '.js-trigger';
  this.triggerElements    = this.el.querySelectorAll(this.triggerSelector);

  this.accordionSelector  = options.accordionSelector || '.js-accordion';
  this.accordionElements  = this.el.querySelectorAll(this.accordionSelector);

  if (this.triggerElements.length !== this.accordionElements.length) {
    throw new Error('There must be as many trigger elements as accordion elements.');
  }

  for (var i=0; i<this.triggerElements.length; ++i) {
    event.bind(this.triggerElements[i], 'click', this.onTriggerClicked.bind(this));
  }

  this.triggers = this.triggerElements;
  this.accordions  = [];
  for (var i=0; i<this.accordionElements.length; ++i) {

    var accordion = new Accordion({el: this.accordionElements[i]});

    accordion
      .on('open', function() {
        for (var i=0; i<self.accordions.length; ++i) {
          if (this !== self.accordions[i]) {
            self.accordions[i].close();
          }
        }
      })
      .on('opened', function() {
        var index = self.accordions.indexOf(this);
        self.triggerElements[index].classList.add('is-open');
      })
      .on('closed', function() {
        var index = self.accordions.indexOf(this);
        self.triggerElements[index].classList.remove('is-open');
      })
    ;

    this.accordions.push(accordion);
  }

  //check the accordion trigger and accordion-group triggers are not the same - otherwise they'll fight each other to open and close and it took ages to debug
  for (var i=0; i<this.triggerElements.length; ++i) {
    if (this.triggerElements[i] === this.accordions[i].trigger) {
      throw new Error('The accordion and accordion group must not have the same trigger element.');
    }
  }

}

/**
 * @private
 * @param   {Event} event
 */
AccordionGroup.prototype.onTriggerClicked = function(event) {
  var triggerElement  = closest(event.target, this.triggerSelector, true, true);
  var triggerIndex    = Array.prototype.indexOf.call(this.triggerElements, triggerElement);
  this.accordions[triggerIndex].toggle();
};

module.exports = AccordionGroup;