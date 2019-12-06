import { alias } from '@ember/object/computed';
import { set } from '@ember/object';

import { changeset } from 'ember-changeset';


const ERRORS = '_errors';
const CONTENT = '_content';

export default class {
  constructor() {
    let changesetObject = changeset(...arguments).create();
    changesetObject.reopen({
      clearErrors() {
        set(this, ERRORS, {});
        return this;
      },

      source: alias(CONTENT),
      serverErrors: alias('source.errors')
    });
    return changesetObject
  }
}
