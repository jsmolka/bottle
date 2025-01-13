<template>
  <TableWrapper>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead class="w-[5.25rem] min-w-[5.25rem] text-right">
            <div class="px-2 border-x border-transparent">Mass</div>
          </TableHead>
          <TableHead class="w-[7.50rem] min-w-[7.50rem] text-right hidden sm:table-cell">
            Concentration
          </TableHead>
          <TableHead class="w-[7.50rem] min-w-[7.50rem] text-right">Osmolarity</TableHead>
          <TableHead class="w-0" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(mixture, index) in solvent.mixtures">
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
            <Button
              variant="ghost"
              size="icon"
              tabindex="-1"
              @click="solvent.mixtures.splice(index, 1)"
            >
              <PhTrash class="size-4" />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow class="border-t-2 border-shade-4">
          <TableCell>Total</TableCell>
          <TableCell class="text-right">
            <div class="px-2 border-x border-transparent">{{ format(solvent.mass) }} g</div>
          </TableCell>
          <TableCell class="text-right hidden sm:table-cell">
            {{ format(solvent.concentration(volume)) }} g/l
          </TableCell>
          <TableCell class="text-right">
            {{ format(1000 * solvent.osmolarity(volume)) }} mOsm/l
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
import { Solvent } from '@/modules/chemistry';
import { format } from '@/utils/format';
import { PhTrash } from '@phosphor-icons/vue';

defineProps({
  solvent: { type: Solvent, required: true },
  volume: { type: Number, required: true },
});
</script>
