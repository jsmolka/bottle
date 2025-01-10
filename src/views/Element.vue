<template>
  <div class="flex flex-col items-center gap-1 p-1 bg-shade-7 border border-shade-2">
    <div class="flex justify-between gap-4 text-xs">
      <div>{{ element.number }}</div>
      <div>
        {{
          element.mass.toLocaleString('en-US', {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })
        }}
      </div>
    </div>
    <div class="text-4xl">{{ element.symbol }}</div>
    <div class="text-xs">{{ element.name }}</div>
  </div>
</template>

<script setup>
import { Element } from '@/modules/chemistry';

defineProps({
  element: { type: Element, required: true },
});
</script>
