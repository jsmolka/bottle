<template>
  <Dialog @update:open="$event && reset()">
    <template v-if="$slots.trigger">
      <DialogTrigger as-child>
        <slot name="trigger" />
      </DialogTrigger>
    </template>
    <DialogContent>
      <DialogHeader v-show="false">
        <DialogTitle>Carbohydrate</DialogTitle>
        <DialogDescription>Add carbohydrate</DialogDescription>
      </DialogHeader>
      <Form>
        <FormItem>
          <Label>Carbohydrate</Label>
          <Select :items="Carbohydrate.$values" v-model="carbohydrate">
            <template #item="{ item }">
              <SelectItemText>{{ Carbohydrate.$translate(item) }}</SelectItemText>
            </template>
          </Select>
        </FormItem>
        <template v-if="carbohydrate === Carbohydrate.maltodextrin">
          <FormItem>
            <Label>Glucose units [3, 19]</Label>
            <InputNumber v-model="n" :min="3" :max="19" />
          </FormItem>
          <FormItem>
            <Label>Dextrose equivalent [3, 20]</Label>
            <InputNumber :model-value="Math.round(100 * dextroseEquivalent)" suffix=" %" disabled />
          </FormItem>
        </template>
        <FormItem>
          <Label>Mass</Label>
          <InputNumber v-model="mass" :min="0" :max="1000" suffix=" g" />
        </FormItem>
      </Form>
      <DialogFooter>
        <DialogClose as-child>
          <Button @click="add">Add</Button>
        </DialogClose>
        <DialogClose as-child>
          <Button variant="secondary">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormItem } from '@/components/ui/form';
import { InputNumber } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectItemText } from '@/components/ui/select';
import { Mixture, Molecule } from '@/modules/chemistry';
import { useBottleStore } from '@/stores/bottle';
import { Enum } from '@/utils/enum';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const { bottle } = storeToRefs(useBottleStore());

/**
 * @namespace
 * @property {string} maltodextrin
 * @property {string} fructose
 * @property {string} sucrose
 * @property {string} isomaltulose
 */
const Carbohydrate = new Enum([
  { key: 'glucose', translation: 'Glucose' },
  { key: 'fructose', translation: 'Fructose' },
  { key: 'maltodextrin', translation: 'Maltodextrin' },
  { key: 'sucrose', translation: 'Sucrose' },
  { key: 'isomaltulose', translation: 'Isomaltulose' },
]);

const carbohydrate = ref();
const n = ref();
const mass = ref();

const reset = () => {
  carbohydrate.value = Carbohydrate.glucose;
  n.value = 5;
  mass.value = 50;
};

reset();

const dextroseEquivalent = computed(() => {
  return Molecule.glucose.molarMass / Molecule.maltodextrin(n.value).molarMass;
});

const add = () => {
  let molecule = null;
  switch (carbohydrate.value) {
    case Carbohydrate.glucose:
    case Carbohydrate.fructose:
    case Carbohydrate.sucrose:
    case Carbohydrate.isomaltulose:
      molecule = Molecule[carbohydrate.value];
      break;
    case Carbohydrate.maltodextrin:
      molecule = Molecule.maltodextrin(n.value);
      break;
    default:
      return;
  }
  bottle.value.carbohydrates.mixtures.push(Mixture.molecule(molecule, mass.value));
};
</script>
