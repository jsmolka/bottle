<template>
  <TableWrapper>
    <Table class="font-feature-tnum">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead class="w-20 min-w-20 text-right">
            <div class="px-2 border-x border-transparent">Mass</div>
          </TableHead>
          <TableHead class="w-32 min-w-32 text-right hidden sm:table-cell">
            Concentration
          </TableHead>
          <TableHead class="w-32 min-w-32 text-right">Osmolarity</TableHead>
          <TableHead class="w-0" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(mixture, index) in props.mixtures">
          <TableCell>{{ mixture.name }}</TableCell>
          <TableCell>
            <InputNumber
              class="text-right"
              v-model="mixture.mass"
              :min="0"
              :max="1000"
              :precision="2"
              suffix=" g"
            />
          </TableCell>
          <TableCell class="text-right hidden sm:table-cell">
            {{ Math.round(concentrations[index]) }} g/l
          </TableCell>
          <TableCell class="text-right">
            {{ Math.round(1000 * osmolarities[index]) }} mOsm/l
          </TableCell>
          <TableCell>
            <Button variant="ghost" size="icon" tabindex="-1" @click="mixtures.splice(index, 1)">
              <PhTrash class="size-4" />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow class="border-t-2 border-shade-4">
          <TableCell>Total</TableCell>
          <TableCell class="text-right">
            <div class="px-2 border-x border-transparent">{{ totalMass }} g</div>
          </TableCell>
          <TableCell class="text-right hidden sm:table-cell">
            {{ Math.round(totalConcentration) }} g/l
          </TableCell>
          <TableCell class="text-right">
            {{ Math.round(1000 * totalOsmolarity) }} mOsm/l
          </TableCell>
          <TableCell />
        </TableRow>
      </TableBody>
    </Table>
  </TableWrapper>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import { InputNumber } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
} from '@/components/ui/table';
import { PhTrash } from '@phosphor-icons/vue';
import { computed } from 'vue';

const props = defineProps({
  mixtures: { type: Array, required: true },
  volume: { type: Number, required: true },
});

const concentrations = computed(() => {
  return props.mixtures.map(({ mass }) => mass / props.volume);
});

const osmolarities = computed(() => {
  return concentrations.value.map(
    (concentration, index) =>
      (concentration / props.mixtures[index].molarMass) * props.mixtures[index].osmolesPerMole,
  );
});

const totalMass = computed(() => {
  let total = 0;
  for (const mixture of props.mixtures) {
    total += mixture.mass;
  }
  return total;
});

const totalConcentration = computed(() => {
  let total = 0;
  for (const concentration of concentrations.value) {
    total += concentration;
  }
  return total;
});

const totalOsmolarity = computed(() => {
  let total = 0;
  for (const osmolarity of osmolarities.value) {
    total += osmolarity;
  }
  return total;
});
</script>
