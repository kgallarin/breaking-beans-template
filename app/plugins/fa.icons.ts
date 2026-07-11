import { config, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import * as icons from '~/assets/icons/fa-icon-lib';

config.autoAddCss = false;
export default defineNuxtPlugin((nuxtApp): void => {
  library.add(...Object.values(icons));
  nuxtApp.vueApp.component('faIcon', FontAwesomeIcon as Component);
});
