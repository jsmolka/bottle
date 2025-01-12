<template>
  <Form class="max-w-screen-sm mx-auto p-4">
    <div class="flex flex-col items-center gap-4">
      <Logo class="size-8 text-shade-1" />
      <div>
        A companion app for the
        <Link href="https://www.smolka.dev/posts/the-bottle">bottle post</Link>.
      </div>
    </div>

    <h1>Bottle</h1>
    <FormItem>
      <Label>Volume</Label>
      <InputNumber
        :model-value="1000 * bottle.volume"
        @update:model-value="bottle.volume = $event / 1000"
        :min="1"
        :max="2000"
        suffix=" ml"
      />
    </FormItem>

    <h1 class="flex justify-between items-center gap-4">
      Carbohydrates
      <CarbohydrateDialog>
        <template #trigger>
          <Button size="icon" tabindex="-1">
            <PhPlus class="size-4" />
          </Button>
        </template>
      </CarbohydrateDialog>
    </h1>
    <Mixtures :mixtures="bottle.carbohydrates" :volume="bottle.volume" />

    <div class="flex gap-4">
      <Carbohydrate
        name="Glucose"
        :mass="bottle.carbohydrates.glucosePercentage * bottle.carbohydrates.totalMass || 0"
        :ratio="1"
      >
        <Glucose class="w-full" />
      </Carbohydrate>
      <Carbohydrate
        name="Fructose"
        :mass="bottle.carbohydrates.fructosePercentage * bottle.carbohydrates.totalMass || 0"
        :ratio="bottle.carbohydrates.fructosePercentage / bottle.carbohydrates.glucosePercentage"
      >
        <Fructose class="w-full" />
      </Carbohydrate>
    </div>

    <h1 class="flex justify-between items-center gap-4">
      Electrolytes
      <ElectrolyteDialog>
        <template #trigger>
          <Button size="icon" tabindex="-1">
            <PhPlus class="size-4" />
          </Button>
        </template>
      </ElectrolyteDialog>
    </h1>
    <Mixtures :mixtures="bottle.electrolytes" :volume="bottle.volume" />

    <div class="flex flex-wrap justify-center gap-8 mx-auto">
      <Electrolyte
        v-for="atom of [Atom.sodium, Atom.potassium, Atom.magnesium]"
        :atom="atom"
        :mass="bottle.electrolytes.molarMassPercentage(atom) * bottle.electrolytes.totalMass || 0"
      />
    </div>

    <h1>Osmolarity</h1>
    <svg ref="osmolarityChart" height="86" fill="currentColor">
      <g>
        <text x="0%" y="14" text-anchor="start">Hypotonic</text>
        <text x="50%" y="14" text-anchor="middle">{{ Math.round(1000 * osmolarity) }} mOsm/l</text>
        <text x="100%" y="14" text-anchor="end">Hypertonic</text>
      </g>
      <g>
        <defs>
          <linearGradient id="osmolarity-gradient">
            <stop offset="0%" stop-color="rgb(var(--red))" />
            <stop offset="13.33%" stop-color="rgb(var(--red))" />
            <stop offset="20%" stop-color="rgb(var(--yellow))" />
            <stop offset="30%" stop-color="rgb(var(--yellow))" />
            <stop offset="36.66%" stop-color="rgb(var(--green))" />
            <stop offset="63.33%" stop-color="rgb(var(--green))" />
            <stop offset="70%" stop-color="rgb(var(--yellow))" />
            <stop offset="80%" stop-color="rgb(var(--yellow))" />
            <stop offset="86.66%" stop-color="rgb(var(--red))" />
          </linearGradient>
        </defs>
        <rect x="0%" y="24" width="100%" height="40" fill="url(#osmolarity-gradient)" />
        <line
          :x1="osmolarityX"
          :x2="osmolarityX"
          y1="24"
          y2="64"
          stroke-width="8"
          class="stroke-shade-8"
        />
      </g>
      <g>
        <text x="0%" y="84" text-anchor="start">0</text>
        <text x="16.66%" y="84" text-anchor="middle">100</text>
        <text x="33.33%" y="84" text-anchor="middle">200</text>
        <text x="50%" y="84" text-anchor="middle">300</text>
        <text x="66.66%" y="84" text-anchor="middle">400</text>
        <text x="83.33%" y="84" text-anchor="middle">500</text>
        <text x="100%" y="84" text-anchor="end">>600</text>
      </g>
    </svg>
    <figure class="flex flex-col gap-2">
      <TableWrapper>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead class="text-right">Carbohydrates</TableHead>
              <TableHead class="text-right">Osmolality</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Coca Cola</TableCell>
              <TableCell class="text-right">110 g/kg</TableCell>
              <TableCell class="text-right">500 mOsm/kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fanta</TableCell>
              <TableCell class="text-right">100 g/kg</TableCell>
              <TableCell class="text-right">400 mOsm/kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fruit juice</TableCell>
              <TableCell class="text-right">120 g/kg</TableCell>
              <TableCell class="text-right">700 mOsm/kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gatorade</TableCell>
              <TableCell class="text-right">60 g/kg</TableCell>
              <TableCell class="text-right">350 mOsm/kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Isostar</TableCell>
              <TableCell class="text-right">70 g/kg</TableCell>
              <TableCell class="text-right">300 mOsm/kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Powerade</TableCell>
              <TableCell class="text-right">80 g/kg</TableCell>
              <TableCell class="text-right">350 mOsm/kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Red Bull</TableCell>
              <TableCell class="text-right">110 g/kg</TableCell>
              <TableCell class="text-right">600 mOsm/kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sprite</TableCell>
              <TableCell class="text-right">100 g/kg</TableCell>
              <TableCell class="text-right">500 mOsm/kg</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableWrapper>
      <figcaption class="text-xs text-center">
        Based on a <Link :href="osmolarityPdf">study by Mettler et al.</Link>
      </figcaption>
    </figure>
  </Form>
</template>

<script setup>
import osmolarityPdf from '@/assets/pdf/osmolality.pdf';
import Logo from '@/components/Logo.vue';
import { Button } from '@/components/ui/button';
import { Form, FormItem } from '@/components/ui/form';
import { InputNumber } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@/components/ui/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
} from '@/components/ui/table';
import { Atom } from '@/modules/chemistry';
import { useBottleStore } from '@/stores/bottle';
import { clamp } from '@/utils/numeric';
import Carbohydrate from '@/views/Carbohydrate.vue';
import CarbohydrateDialog from '@/views/CarbohydrateDialog.vue';
import Electrolyte from '@/views/Electrolyte.vue';
import ElectrolyteDialog from '@/views/ElectrolyteDialog.vue';
import Fructose from '@/views/Fructose.vue';
import Glucose from '@/views/Glucose.vue';
import Mixtures from '@/views/Mixtures.vue';
import { PhPlus } from '@phosphor-icons/vue';
import { useResizeObserver } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, ref, useTemplateRef } from 'vue';

const { bottle } = storeToRefs(useBottleStore());

const osmolarity = computed(() => {
  return bottle.value.osmolarity;
});

const osmolarityChart = useTemplateRef('osmolarityChart');
const osmolarityWidth = ref(0);

useResizeObserver(osmolarityChart, ([entry]) => {
  osmolarityWidth.value = entry.contentRect.width;
});

const osmolarityX = computed(() => {
  return clamp(
    ((1000 * osmolarity.value) / 600) * osmolarityWidth.value,
    5,
    osmolarityWidth.value - 5,
  );
});
</script>

<style scoped>
h1 {
  @apply -mb-2;
  @apply text-base;
  @apply text-shade-1;
  @apply font-bold;
}
</style>
