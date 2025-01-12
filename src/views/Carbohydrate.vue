<template>
  <div class="flex flex-col items-center">
    <slot />
    <div class="text-shade-1 font-semibold">{{ name }}</div>
    <div>
      {{ format(mass) }} g
      <span v-if="ratio > 0">
        ({{ format(ratio, { maxDigits: 2 }) }} {{ ratio === 1 ? 'part' : 'parts' }})
      </span>
    </div>
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
