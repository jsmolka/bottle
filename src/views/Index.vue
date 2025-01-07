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
            <TableHead>Name</TableHead>
            <TableHead>Mass</TableHead>
            <TableHead>Concentration</TableHead>
            <TableHead>Osmolarity</TableHead>
            <TableHead class="w-0"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="_ in [1, 2, 3, 4]">
            <TableCell>Maltodextrin (n = 5)</TableCell>
            <TableCell>
              <InputNumber class="w-20" :model-value="0" suffix=" g" />
            </TableCell>
            <TableCell>100 g/l</TableCell>
            <TableCell>100 mOsm/l</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <PhTrash class="size-4" />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow class="border-t-2 border-shade-4">
            <TableCell>Total</TableCell>
            <TableCell>400 g</TableCell>
            <TableCell>400 g/l</TableCell>
            <TableCell>400 mOsm/l</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableWrapper>

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
            <TableHead>Mass</TableHead>
            <TableHead>Concentration</TableHead>
            <TableHead>Osmolarity</TableHead>
            <TableHead class="w-0"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="_ in [1, 2, 3, 4]">
            <TableCell>Sodium chloride</TableCell>
            <TableCell>
              <InputNumber class="w-20" :model-value="0" suffix=" g" />
            </TableCell>
            <TableCell>100 g/l</TableCell>
            <TableCell>100 mOsm/l</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <PhTrash class="size-4" />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow class="border-t-2 border-shade-4">
            <TableCell>Total</TableCell>
            <TableCell>400 g</TableCell>
            <TableCell>400 g/l</TableCell>
            <TableCell>400 mOsm/l</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableWrapper>

    <h1>Osmolarity</h1>
    <div>400 > 300 -> <span class="text-green">Slightly hypertonic</span></div>
    <div>500 >> 300 -> <span class="text-yellow">Hypertonic</span></div>
    <div>600 >>> 300 -> <span class="text-red">Extremely hypertonic</span></div>
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
import { PhPlus, PhTrash } from '@phosphor-icons/vue';
</script>

<style>
h1 {
  @apply text-base;
  @apply text-shade-1;
  @apply font-bold;
}
</style>
