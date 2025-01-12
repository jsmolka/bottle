import { Mixture, Mixtures, Molecule } from '@/modules/chemistry';
import { array, defineSchema, primitive, schema } from '@/utils/persist';

export class Bottle {
  constructor() {
    this.volume = 1; // l
    this.carbohydrates = Mixtures.of(
      Mixture.molecule(Molecule.maltodextrin(5), 60),
      Mixture.molecule(Molecule.fructose, 30),
    );
    this.electrolytes = Mixtures.of(Mixture.molecule(Molecule.sodiumChloride, 4));
  }

  get osmolarity() {
    return (
      this.carbohydrates.totalOsmolarity(this.volume) +
      this.electrolytes.totalOsmolarity(this.volume)
    );
  }
}

defineSchema(Bottle, {
  volume: primitive(),
  carbohydrates: array(schema(Mixture), Mixtures),
  electrolytes: array(schema(Mixture), Mixtures),
});
