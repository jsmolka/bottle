import { Mixture, Molecule, Solution, Solvent } from '@/modules/chemistry';
import { defineSchema } from '@/utils/persist';

export class Bottle extends Solution {
  constructor() {
    const carbohydrates = new Solvent([
      Mixture.molecule(Molecule.maltodextrin(5), 60),
      Mixture.molecule(Molecule.fructose, 30),
    ]);

    // prettier-ignore
    const electrolytes = new Solvent([
      Mixture.molecule(Molecule.sodiumChloride, 4),
    ]);

    super(1, [carbohydrates, electrolytes]);
  }

  get carbohydrates() {
    return this.solvents[0];
  }

  get electrolytes() {
    return this.solvents[1];
  }
}

defineSchema(Bottle, {});
