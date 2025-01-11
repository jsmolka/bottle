<template>
  <TableWrapper>
    <Table class="font-feature-tnum">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead class="w-24 min-w-24 text-right">
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
        <TableRow v-for="(mixture, index) in mixtures">
          <TableCell>{{ mixture.name }}</TableCell>
          <TableCell>
            <InputNumber
              class="text-right"
              v-model="mixture.mass"
              :min="0"
              :max="1000"
              suffix=" g"
            />
          </TableCell>
          <TableCell class="text-right hidden sm:table-cell">
            {{ format(mixture.concentration(volume)) }} g/l
          </TableCell>
          <TableCell class="text-right">
            {{ format(1000 * mixture.osmolarity(volume)) }} mOsm/l
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
            <div class="px-2 border-x border-transparent">{{ format(mixtures.totalMass) }} g</div>
          </TableCell>
          <TableCell class="text-right hidden sm:table-cell">
            {{ format(mixtures.totalConcentration(volume)) }} g/l
          </TableCell>
          <TableCell class="text-right">
            {{ format(1000 * mixtures.totalOsmolarity(volume)) }} mOsm/l
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
import { Mixtures } from '@/modules/chemistry';
import { PhTrash } from '@phosphor-icons/vue';

defineProps({
  mixtures: { type: Mixtures, required: true },
  volume: { type: Number, required: true },
});

const format = (value, decimals = 0) => {
  return value.toLocaleString(undefined, {
    useGrouping: false,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};
</script>
