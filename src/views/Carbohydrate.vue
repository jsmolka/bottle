<template>
  <div class="flex flex-col items-center">
    <slot />
    <div class="text-shade-1 font-semibold">{{ name }}</div>
    <div>{{ format(mass) }} g (ratio {{ format(ratio, 2) }})</div>
  </div>
</template>

<script setup>
import { format } from '@/utils/format';

defineProps({
  name: { type: String, required: true },
  mass: { type: Number, required: true },
  ratio: { type: Number, required: true },
});
</script>
