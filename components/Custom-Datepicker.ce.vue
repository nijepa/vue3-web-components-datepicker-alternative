<template>
  <div ref="datepickerWrapper" >
    <datepicker
      v-model="date"
      inputFormat="MMM, do yyyy"
      :locale="locale"
      :lowerLimit="setDate()"
      :clearable="true"
    />
  </div>
</template>
<script>
export default{
  inheritAttrs: false
}
</script>
<script setup>
import { ref, computed, watch, useAttrs } from "vue";
import Datepicker from 'vue3-datepicker'
import { de } from 'date-fns/locale'

// setting props
const props = defineProps({
  propdate: {
    type: String,
    default: new Date()
  },
  disabled: {
    type: String,
    default: 'false'
  },
  // id: {
  //   type: String,
  //   default: 'deliveryTime'
  // }
});
const isDisabled = computed(() => {
  return props.disabled !== 'false'
})
// const result = format(new Date(2014, 6, 2), "do MMM yyyy", {
//   locale: de
// })
const datepickerWrapper = ref(null);
const locale = ref(de);
const setDate = () => {
  if (isNaN(props.propdate)) {
    const [day, month, year] = props.propdate.split('.');
    return new Date(+year, +month - 1, +day)
  }
  return props.propdate
}
const date = ref(setDate());

watch(
  () => date.value,
  (newValue, oldValue) => {
    const value = dateSelected(newValue)
    const dateVal = new CustomEvent("selected", {
      bubbles: true,
      composed: true,
      detail: { val: value }
    })
    datepickerWrapper.value.dispatchEvent(dateVal);
  }
);

const dateSelected = (e) => {
  if (e) {
    const d = new Date(e.toString())
    let dateFormat = new Intl.DateTimeFormat('de', { month: '2-digit', day: '2-digit', year: 'numeric' })
    return dateFormat.format(d)
  }
  return ''
}
// defineExpose({
//   date
// })
// creating & emitting events
const emit = defineEmits(["selected"]);
</script>
<style>
.v3dp__datepicker {
  --popout-bg-color: var(--vdp-bg-color, #fff);
  --box-shadow: var(
    --vdp-box-shadow,
    0 4px 10px 0 rgba(128, 144, 160, 0.1),
    0 0 1px 0 rgba(128, 144, 160, 0.81)
  );
  --text-color: var(--vdp-text-color, #000000);
  --border-radius: var(--vdp-border-radius, 3px);
  --heading-size: var(--vdp-heading-size, 2.5em); /* 40px for 16px font */
  --heading-weight: var(--vdp-heading-weight, bold);
  --heading-hover-color: var(--vdp-heading-hover-color, #eeeeee);
  --arrow-color: var(--vdp-arrow-color, currentColor);

  --elem-color: var(--vdp-elem-color, currentColor);
  --elem-disabled-color: var(--vdp-disabled-color, #d5d9e0);
  --elem-hover-color: var(--vdp-hover-color, #fff);
  --elem-hover-bg-color: var(--vdp-hover-bg-color, #0baf74);
  --elem-selected-color: var(--vdp-selected-color, #fff);
  --elem-selected-bg-color: var(--vdp-selected-bg-color, #0baf74);

  --elem-font-size: var(--vdp-elem-font-size, 0.8em);
  --elem-border-radius: var(--vdp-elem-border-radius, 3px);

  --divider-color: var(--vdp-divider-color, var(--elem-disabled-color));

  position: relative;
}

.v3dp__clearable {
  display: inline;
  position: relative;
  left: -15px;
  cursor: pointer;
}


.v3dp__popout {
  z-index: 10;
  position: absolute;
  /* bottom: 0; */
  text-align: center;
  width: 17.5em;
  background-color: var(--popout-bg-color);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  padding: 8px 0 1em;
  color: var(--text-color);
}

.v3dp__popout * {
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
}

.v3dp__popout :deep(button) {
  background: none;
  border: none;
  outline: none;
}

.v3dp__popout :deep(button:not(:disabled)) {
  cursor: pointer;
}

.v3dp__heading {
  width: 100%;
  display: flex;
  height: var(--heading-size);
  line-height: var(--heading-size);
  font-weight: var(--heading-weight);
}

.v3dp__heading__button {
  background: none;
  border: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--heading-size);
}

button.v3dp__heading__center:hover,
.v3dp__heading__button:not(:disabled):hover {
  background-color: var(--heading-hover-color);
}

.v3dp__heading__center {
  flex: 1;
}

.v3dp__heading__icon {
  height: 12px;
  stroke: var(--arrow-color);
}

.v3dp__heading__button:disabled .v3dp__heading__icon {
  stroke: var(--elem-disabled-color);
}

.v3dp__subheading,
.v3dp__elements {
  display: grid;
  grid-template-columns: var(--popout-column-definition);
  font-size: var(--elem-font-size);
}

.v3dp__subheading {
  margin-top: 1em;
}

.v3dp__divider {
  border: 1px solid var(--divider-color);
  border-radius: 3px;
}

.v3dp__elements :deep(button:disabled) {
  color: var(--elem-disabled-color);
}

.v3dp__elements :deep(button){
  padding: 0.3em 0.6em;
}

.v3dp__elements :deep(button span) {
  display: block;
  line-height: 1.9em;
  height: 1.8em;
  border-radius: var(--elem-border-radius);
}

.v3dp__elements :deep(button:not(:disabled):hover span) {
  background-color: var(--elem-hover-bg-color);
  color: var(--elem-hover-color);
}

.v3dp__elements :deep(button.selected span) {
  background-color: var(--elem-selected-bg-color);
  color: var(--elem-selected-color);
}


.v3dp__column {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 190px;
}
</style>