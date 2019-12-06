import Component from '@ember/component';
import { computed } from '@ember/object';


const classes = {
  default: "boolean-icon",
  true: "boolean-icon__true",
  false: "boolean-icon__false"
};
const icons = {
  true: "check-circle-o",
  false: "minus-circle"
};

const BooleanIcon = Component.extend({
  tagName: "span",
  classNames: [classes.default],
  withColor: true,
  icon: computed('withColor', function() {
    return this.get('value') ?  icons.true : icons.false;
  }),
  classes: computed('withColor', function() {
    if (!this.get('withColor')) { return []; }
    return this.get('value') ?  classes.true : classes.false;
  })
});

BooleanIcon.reopenClass({
  positionalParams: ["value"]
});

export default BooleanIcon;
