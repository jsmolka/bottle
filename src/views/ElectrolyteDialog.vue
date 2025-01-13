<template>
  <Dialog @update:open="$event && reset()">
    <template v-if="$slots.trigger">
      <DialogTrigger as-child>
        <slot name="trigger" />
      </DialogTrigger>
    </template>
    <DialogContent>
      <DialogHeader v-show="false">
        <DialogTitle>Electrolyte</DialogTitle>
        <DialogDescription>Add electrolyte</DialogDescription>
      </DialogHeader>
      <Form>
        <FormItem>
          <Label>Electrolyte</Label>
          <Select :items="Electrolyte.$values" v-model="electrolyte">
            <template #item="{ item }">
              <SelectItemText>{{ Electrolyte.$translate(item) }}</SelectItemText>
            </template>
          </Select>
        </FormItem>
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
import { Mixture } from '@/modules/chemistry';
import { useBottleStore } from '@/stores/bottle';
import { Enum } from '@/utils/enum';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const { bottle } = storeToRefs(useBottleStore());

/**
 * @namespace
 * @property {string} sodiumChloride
 * @property {string} sodiumCitrate
 * @property {string} potassiumChloride
 * @property {string} potassiumCitrate
 * @property {string} magnesiumChloride
 * @property {string} magnesiumCitrate
 * @property {string} magnesiumMalate
 * @property {string} lmnt
 */
const Electrolyte = new Enum([
  { key: 'sodiumChloride', translation: 'Sodium chloride' },
  { key: 'sodiumCitrate', translation: 'Sodium citrate' },
  { key: 'potassiumChloride', translation: 'Potassium chloride' },
  { key: 'potassiumCitrate', translation: 'Potassium citrate' },
  { key: 'magnesiumChloride', translation: 'Magnesium chloride' },
  { key: 'magnesiumCitrate', translation: 'Magnesium citrate' },
  { key: 'magnesiumMalate', translation: 'Magnesium malate' },
  { key: 'lmnt', translation: 'LMNT' },
]);

const electrolyte = ref();
const mass = ref();

const reset = () => {
  electrolyte.value = Electrolyte.sodiumChloride;
  mass.value = 5;
};

reset();

const add = () => {
  let mixture = null;
  switch (electrolyte.value) {
    case Electrolyte.sodiumChloride:
    case Electrolyte.sodiumCitrate:
    case Electrolyte.potassiumChloride:
    case Electrolyte.potassiumCitrate:
    case Electrolyte.magnesiumChloride:
    case Electrolyte.magnesiumCitrate:
    case Electrolyte.magnesiumMalate:
      mixture = Mixture.molecule(Mixture[electrolyte.value], mass.value);
      break;
    case Electrolyte.lmnt:
      mixture = Mixture.lmnt(mass.value);
      break;
    default:
      return;
  }
  bottle.value.electrolytes.mixtures.push(mixture);
};
</script>
