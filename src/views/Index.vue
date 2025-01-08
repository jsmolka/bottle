<template>
  <Form class="max-w-screen-sm mx-auto p-4">
    <Logo class="self-center size-8 text-shade-1" />
    <span class="self-center"
      >A companion app for the
      <Link href="https://www.smolka.dev/posts/the-bottle" target="_blank">bottle post</Link>.</span
    >

    <h1>Bottle</h1>
    <FormItem>
      <Label>Volume</Label>
      <InputNumber :model-value="0" suffix=" ml" />
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
            <TableHead class="w-[35%]">Substrate</TableHead>
            <TableHead class="w-[15%] text-right">Mass</TableHead>
            <TableHead class="w-[25%] text-right">Concentration</TableHead>
            <TableHead class="w-[25%] text-right">Osmolarity</TableHead>
            <TableHead class="w-0"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="_ in [1, 2, 3, 4]">
            <TableCell>Maltodextrin (n = 5)</TableCell>
            <TableCell>
              <InputNumber class="text-right" :model-value="0" suffix=" g" />
            </TableCell>
            <TableCell class="text-right">{{ randomInt(100) }} g/l</TableCell>
            <TableCell class="text-right">{{ randomInt(400) }} mOsm/l</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <PhTrash class="size-4" />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow class="border-t-2 border-shade-4">
            <TableCell>Total</TableCell>
            <TableCell class="text-right">400 g</TableCell>
            <TableCell class="text-right">400 g/l</TableCell>
            <TableCell class="text-right">400 mOsm/l</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableWrapper>

    <div class="flex">
      <div class="grow-[2] bg-shade-4 flex items-center justify-center p-2">66% Glucose</div>
      <div class="grow-[1] bg-shade-6 flex items-center justify-center p-2">33% Fructose</div>
    </div>

    <div class="flex border-2 border-shade-2">
      <div class="grow-[2] flex items-center justify-center p-2">66% Glucose</div>
      <div class="border-r-2 border-shade-2"></div>
      <div class="grow-[1] flex items-center justify-center p-2">33% Fructose</div>
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
            <TableHead class="w-[35%]">Substrate</TableHead>
            <TableHead class="w-[15%] text-right">Mass</TableHead>
            <TableHead class="w-[25%] text-right">Concentration</TableHead>
            <TableHead class="w-[25%] text-right">Osmolarity</TableHead>
            <TableHead class="w-0"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="_ in [1, 2, 3, 4]">
            <TableCell>Sodium chloride</TableCell>
            <TableCell>
              <InputNumber class="text-right" :model-value="0" suffix=" g" />
            </TableCell>
            <TableCell class="text-right">{{ randomInt(100) }} g/l</TableCell>
            <TableCell class="text-right">{{ randomInt(400) }} mOsm/l</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <PhTrash class="size-4" />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow class="border-t-2 border-shade-4">
            <TableCell>Total</TableCell>
            <TableCell class="text-right">400 g</TableCell>
            <TableCell class="text-right">400 g/l</TableCell>
            <TableCell class="text-right">400 mOsm/l</TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </TableWrapper>

    <h1>Osmolarity</h1>
    <svg fill="currentColor" height="200">
      <g>
        <text x="0%" y="20" text-anchor="start">Hypotonic</text>
        <text x="50%" y="20" text-anchor="middle" class="font-semibold">200 mOsm/l</text>
        <text x="100%" y="20" text-anchor="end">Hypertonic</text>
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
        <rect x="0%" y="30" width="100%" height="40" fill="url(#osmolarity-gradient)" />
        <line x1="34%" y1="30" x2="34%" y2="70" class="stroke-shade-8" stroke-width="8" />
      </g>
      <g>
        <text x="0%" y="90" text-anchor="start">0</text>
        <text x="16.66%" y="90" text-anchor="middle">100</text>
        <text x="33.33%" y="90" text-anchor="middle">200</text>
        <text x="50%" y="90" text-anchor="middle">300</text>
        <text x="66.66%" y="90" text-anchor="middle">400</text>
        <text x="83.33%" y="90" text-anchor="middle">500</text>
        <text x="100%" y="90" text-anchor="end">>600</text>
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
import { randomInt } from '@/utils/random';
import { PhPlus, PhTrash } from '@phosphor-icons/vue';
</script>

<style>
h1 {
  @apply text-base;
  @apply text-shade-1;
  @apply font-bold;
}
</style>
