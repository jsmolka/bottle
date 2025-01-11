<template>
  <div class="flex flex-col items-center gap-1 p-1 bg-shade-7 border border-shade-2">
    <div class="flex justify-between gap-4 text-xs">
      <div>{{ atom.number }}</div>
      <div>{{ format(atom.mass, 3) }}</div>
    </div>
    <div class="text-4xl">{{ atom.symbol }}</div>
    <div class="text-xs">{{ atom.name }}</div>
  </div>
</template>

<script setup>
import { Atom } from '@/modules/chemistry';
import { format } from '@/utils/format';

defineProps({
  atom: { type: Atom, required: true },
});
</script>
