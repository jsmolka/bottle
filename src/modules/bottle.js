import { Mixture, Molecule } from '@/modules/chemistry';
import { array, defineSchema, primitive, schema } from '@/utils/persist';

export class Bottle {
  constructor() {
    this.volume = 500; // l
    this.carbohydrates = [
      Mixture.fromMolecule(Molecule.glucose, 60),
      Mixture.fromMolecule(Molecule.fructose, 30),
      Mixture.fromMolecule(Molecule.sucrose, 30),
    ];
    this.electrolytes = [
      Mixture.fromMolecule(Molecule.sodiumChloride, 5),
      Mixture.fromMolecule(Molecule.sodiumChloride, 5),
    ];
  }
}

defineSchema(Bottle, {
  volume: primitive(),
  carbohydrates: array(schema(Mixture)),
  electrolytes: array(schema(Mixture)),
});
