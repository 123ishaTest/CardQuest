import Vue from 'vue'
import VueApp from './App.vue'
import {App} from "./App";

import './VueFilters';

import "./index.css";

Vue.config.productionTip = false

declare global {
    interface Window {
        App: App;
    }
}

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false


/**
 * Start the application when all html elements are loaded.
 */
window.onload = function () {
    App.start();

    // Expose the App class to the window (and the console)
    // if (process.env.DEBUG && typeof window !== undefined) {

    console.log('Exposing App to console');
    window.App = App;
    // }


    console.log("Launched");

    new Vue({
        render: h => h(VueApp),
    }).$mount('#app')


};


