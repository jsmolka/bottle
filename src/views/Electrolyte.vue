<template>
  <div class="flex flex-col items-center gap-1">
    <Element :atom="atom" />
    {{ Math.round(1000 * mass) }} mg
  </div>
</template>

<script setup>
import { Atom } from '@/modules/chemistry';
import Element from '@/views/Element.vue';

defineProps({
  atom: { type: Atom, required: true },
  mass: { type: Number, required: true },
});
</script>
