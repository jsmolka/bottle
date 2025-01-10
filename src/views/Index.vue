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
      <InputNumber v-model="bottle.volume" :min="1" :max="2000" suffix=" ml" />
    </FormItem>

    <h1 class="flex justify-between items-center gap-4">
      Carbohydrates
      <Button size="icon">
        <PhPlus class="size-4" />
      </Button>
    </h1>
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead class="w-20 min-w-20 text-right">Mass</TableHead>
            <TableHead class="w-32 min-w-32 text-right hidden sm:table-cell">
              Concentration
            </TableHead>
            <TableHead class="w-32 min-w-32 text-right">Osmolarity</TableHead>
            <TableHead class="w-0" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="_ in [1, 2, 3, 4]">
            <TableCell>Maltodextrin (n = 5)</TableCell>
            <TableCell>
              <InputNumber
                class="text-right"
                :model-value="1000"
                :min="0"
                :max="1000"
                suffix=" g"
              />
            </TableCell>
            <TableCell class="text-right hidden sm:table-cell">10000 g/l</TableCell>
            <TableCell class="text-right">10000 mOsm/l</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" tabindex="-1">
                <PhTrash class="size-4" />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow class="border-t-2 border-shade-4">
            <TableCell>Total</TableCell>
            <TableCell class="text-right">10000 g</TableCell>
            <TableCell class="text-right hidden sm:table-cell">10000 g/l</TableCell>
            <TableCell class="text-right">10000 mOsm/l</TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </TableWrapper>

    <div class="flex gap-4">
      <Carbohydrate name="Glucose" :mass="100" :percentage="50">
        <Glucose class="w-full" />
      </Carbohydrate>
      <Carbohydrate name="Fructose" :mass="100" :percentage="50">
        <Fructose class="w-full" />
      </Carbohydrate>
    </div>

    <h1 class="flex justify-between items-center gap-4">
      Electrolytes
      <Button size="icon">
        <PhPlus class="size-4" />
      </Button>
    </h1>
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead class="w-20 min-w-20 text-right">Mass</TableHead>
            <TableHead class="w-32 min-w-32 text-right hidden sm:table-cell">
              Concentration
            </TableHead>
            <TableHead class="w-32 min-w-32 text-right">Osmolarity</TableHead>
            <TableHead class="w-0" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="_ in [1, 2, 3, 4]">
            <TableCell>Sodium chloride</TableCell>
            <TableCell>
              <InputNumber
                class="text-right"
                :model-value="1000"
                :min="0"
                :max="1000"
                suffix=" g"
              />
            </TableCell>
            <TableCell class="text-right hidden sm:table-cell">10000 g/l</TableCell>
            <TableCell class="text-right">10000 mOsm/l</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" tabindex="-1">
                <PhTrash class="size-4" />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow class="border-t-2 border-shade-4">
            <TableCell>Total</TableCell>
            <TableCell class="text-right">10000 g</TableCell>
            <TableCell class="text-right hidden sm:table-cell">10000 g/l</TableCell>
            <TableCell class="text-right">10000 mOsm/l</TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </TableWrapper>

    <div class="flex flex-wrap justify-center gap-8 mx-auto">
      <Electrolyte :atom="sodium" :mass="1.5" />
      <Electrolyte :atom="potassium" :mass="1.5" />
      <Electrolyte :atom="magnesium" :mass="1.5" />
    </div>

    <h1>Osmolarity</h1>
    <svg height="86" fill="currentColor">
      <g>
        <text x="0%" y="14" text-anchor="start">Hypotonic</text>
        <text x="50%" y="14" text-anchor="middle">200 mOsm/l</text>
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
        <line x1="34%" y1="24" x2="34%" y2="64" class="stroke-shade-8" stroke-width="8" />
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
  </Form>
</template>

<script setup>
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
import { magnesium, potassium, sodium } from '@/modules/chemistry';
import { useBottleStore } from '@/stores/bottle';
import Carbohydrate from '@/views/Carbohydrate.vue';
import Electrolyte from '@/views/Electrolyte.vue';
import Fructose from '@/views/Fructose.vue';
import Glucose from '@/views/Glucose.vue';
import { PhPlus, PhTrash } from '@phosphor-icons/vue';
import { storeToRefs } from 'pinia';

const { bottle } = storeToRefs(useBottleStore());
</script>

<style scoped>
h1 {
  @apply -mb-2;
  @apply text-base;
  @apply text-shade-1;
  @apply font-bold;
}
</style>
