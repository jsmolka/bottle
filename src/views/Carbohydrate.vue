<template>
  <div class="flex flex-col items-center">
    <slot />
    <div class="text-shade-1 font-semibold">{{ name }}</div>
    <div>{{ mass }} g ({{ percentage }}%)</div>
  </div>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  mass: { type: Number, required: true },
  percentage: { type: Number, required: true },
});
</script>
