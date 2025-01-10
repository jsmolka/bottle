<template>
  <div class="flex flex-col items-center gap-1">
    <ElementComponent :element="element" />
    {{ Math.round(1000 * mass) }} mg
  </div>
</template>

<script setup>
import { Element } from '@/modules/chemistry';
import ElementComponent from '@/views/Element.vue';

defineProps({
  element: { type: Element, required: true },
  mass: { type: Number, required: true },
});
</script>
