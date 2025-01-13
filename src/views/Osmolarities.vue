<template>
  <TableWrapper>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead class="text-right">
            <Link :href="osmolarityPdf">Osmolality</Link>
          </TableHead>
          <TableHead class="text-right hidden sm:table-cell">
            <Link href="https://kg-m3.com">Density</Link>
          </TableHead>
          <TableHead class="text-right">Osmolarity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in data">
          <TableCell>{{ item.name }}</TableCell>
          <TableCell class="text-right">{{ format(item.osmolality) }} mOsm/kg</TableCell>
          <TableCell class="text-right hidden sm:table-cell">
            {{ format(item.density, { minDigits: 3, maxDigits: 3 }) }} kg/l
          </TableCell>
          <TableCell class="text-right">
            {{ format(item.osmolality * item.density) }} mOsm/l
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableWrapper>
</template>

<script setup>
import osmolarityPdf from '@/assets/pdf/osmolality.pdf';
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
import { format } from '@/utils/format';

// https://kg-m3.com
const density = {
  softDrink: 1.04,
  sportsDrink: 1.027,
  fruitJuice: 1.06,
};

const data = [
  { name: 'Coke', osmolality: 493, density: density.softDrink },
  { name: 'Fanta', osmolality: 415, density: density.softDrink },
  { name: 'Fruit juice', osmolality: 724, density: density.fruitJuice },
  { name: 'Gatorade', osmolality: 353, density: density.sportsDrink },
  { name: 'Isostar', osmolality: 312, density: density.sportsDrink },
  { name: 'Powerade', osmolality: 368, density: density.sportsDrink },
  { name: 'Red Bull', osmolality: 601, density: density.softDrink },
  { name: 'Sprite', osmolality: 479, density: density.softDrink },
];
</script>
