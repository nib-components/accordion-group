var click = require('click');
var assert = require('assert');
var AccordionGroup = require('accordion-group');

/**
 * Create the accordion group
 * @returns {AccordionGroup}
 */
function createGroup() {

  var el = document.createElement('div');
  el.innerHTML = [
    '<div>',
    '  <button class="js-trigger">Show and hide the content #1</button>',
    '  <div class="js-accordion is-closed">',
    '    <button class="js-accordion-trigger">Show and hide the content #1</button>',
    '    <div class="js-body">',
    '      Show and hide me',
    '    </div>',
    '  </div>',
    '  <button class="js-trigger">Show and hide the content #2</button>',
    '  <div class="js-accordion is-closed">',
    '    <button class="js-accordion-trigger">Show and hide the content #1</button>',
    '    <div class="js-body">',
    '      Show and hide me',
    '    </div>',
    '  </div>',
    '  <button class="js-trigger">Show and hide the content #3</button>',
    '  <div class="js-accordion is-closed">',
    '    <button class="js-accordion-trigger">Show and hide the content #1</button>',
    '    <div class="js-body">',
    '      Show and hide me',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n');

  return new AccordionGroup({
    el: el
  });

}

var group;

describe('accordion-group', function() {

  beforeEach(function() {
    group = createGroup();
    document.body.appendChild(group.el);
  });

  afterEach(function() {
    document.body.removeChild(group.el);
    delete group;
  });

  describe('constructor', function() {

    it('should create three accordions', function() {
      assert.equal(group.accordions.length, 3);
    });

  });

  describe('accordion#open', function() {

    it('accordion-group trigger should have the is-open class', function(done) {

      var trigger   = group.triggers[1];
      var accordion = group.accordions[1];

      assert(!trigger.classList.contains('is-open'));
      accordion
        .on('opened', function() {
          assert(trigger.classList.contains('is-open'));
          done();
        })
        .open()
      ;

    });

    it('should close the other accordions', function(done) {

      var accordion1 = group.accordions[0];
      var accordion2 = group.accordions[1];
      var accordion3 = group.accordions[2];

      accordion1
        .on('opened', function() {
          assert(accordion1.isOpen);

          accordion2
            .on('opened', function() {
              assert(!accordion1.isOpen);
              assert(!accordion3.isOpen);
              done();
            })
            .open()
          ;

        })
        .open()
      ;

    });

  });

  describe('accordion#close', function() {

    it('accordion-group trigger should not have the is-open class', function(done) {

      var trigger   = group.triggers[1];
      var accordion = group.accordions[1];

      assert(!trigger.classList.contains('is-open'));
      accordion
        .on('opened', function() {
          assert(trigger.classList.contains('is-open'));
          accordion
            .on('closed', function() {
              assert(!trigger.classList.contains('is-open'));
              done();
            })
            .close()
          ;
        })
        .open()
      ;

    });

  });

  describe('accordion.trigger#click', function() {

    it('should open the accordion', function(done) {

      var accordion = group.accordions[1];
      var trigger   = accordion.trigger;

      accordion.on('opened', function() {
        done();
      });

      click(trigger);

    });

    it('should close the accordion', function(done) {

      var accordion = group.accordions[1];
      var trigger   = accordion.trigger;

      accordion
        .on('opened', function() {

          accordion.on('closed', function() {
            done();
          });

          click(trigger);

        })
        .open()
      ;

    });

  });

  describe('accordion-group.trigger#click', function() {

    it('should open the accordion', function(done) {

      var trigger   = group.triggers[1];
      var accordion = group.accordions[1];

      accordion.on('opened', function() {
        done();
      });

      click(trigger);

    });

    it('should close the accordion', function(done) {

      var trigger   = group.triggers[1];
      var accordion = group.accordions[1];

      accordion
        .on('opened', function() {

          accordion.on('closed', function() {
            done();
          });

          click(trigger);

        })
        .open()
      ;

    });

  });

});

