import { createApp } from 'vue';
import { setAssetPath } from '@esri/calcite-components/dist/components';

import App from './App.vue';
import './style.css';

setAssetPath(location.href + 'assets');
// setAssetPath('https://js.arcgis.com/calcite-components/1.2.0/assets');

const app = createApp(App);

/**
 * This is a workaround for listening to custom events
 * that contain capital letters.  Adapted from:
 * https://github.com/vuejs/core/issues/5401#issuecomment-1041214293
 */
const eventDirective = {
	beforeMount(el, { arg, value }) {
		el.addEventListener(arg, value);
	},
	beforeUnmount(el, { arg, value }) {
		el.removeEventListener(arg, value);
	},
};
app.directive('event', eventDirective);

app.mount('#app');
