import { defineCustomElement } from 'vue';
import Datepicker from './components/Custom-Datepicker.ce.vue';
const CustomDatepicker = defineCustomElement(Datepicker);
customElements.define('custom-datepicker', CustomDatepicker);