import Vue from 'vue';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faMap } from '@fortawesome/free-regular-svg-icons';
import {
  faExpand,
  faEllipsisV,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

library.add(faMap, faExpand, faEllipsisV, faBars);

config.autoAddCss = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);
