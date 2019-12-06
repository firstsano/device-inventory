import Service from '@ember/service';
import { computed } from '@ember/object';


export default Service.extend({
  sourceLang: 'ru',
  targetLang: 'en',
  source: computed('sourceLang', function() {
    let sl = this.get('sourceLang');
    return this.get('layouts')[sl];
  }),
  target: computed('targetLang', function() {
    let tl = this.get('targetLang');
    return this.get('layouts')[tl];
  }),

  init() {
    this._super(...arguments);
    this.set('layouts', {
      ru: 'йцукенгшщзфывапролдячсмитьЙЦУКЕНГШЩЗФЫВАПРОЛДЯЧСМИТЬ',
      en: 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
    });
  },

  switchLayout(string) {
    let output = "",
        source = this.get('source'),
        target = this.get('target');
    string.split("").forEach((symbol) => {
      let index = source.indexOf(symbol);
      if (index === -1) {
        output += symbol;
      } else {
        output += target[index];
      }
    });
    return output;
  }
});
