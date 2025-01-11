import { Mixture, Molecule, Substance } from '@/modules/chemistry';
import { array, defineSchema, primitive, schema } from '@/utils/persist';

export class Bottle {
  constructor() {
    this.volume = 500; // l
    this.carbohydrates = [
      Mixture.fromMolecule(Molecule.maltodextrin(5), 60),
      Mixture.fromMolecule(Molecule.fructose, 30),
      Mixture.fromMolecule(Molecule.sucrose, 30),
    ];
    this.electrolytes = [
      Mixture.fromMolecule(Molecule.sodiumChloride, 5),
      Mixture.fromMolecule(Molecule.potassiumChloride, 1),
      Mixture.fromMolecule(Molecule.magnesiumMalate, 1),
      new Mixture(
        'LMNT',
        [
          new Substance(Molecule.sodiumChloride, 1000),
          new Substance(Molecule.potassiumChloride, 150),
          new Substance(Molecule.magnesiumMalate, 155),
        ],
        5,
      ),
    ];
  }
}

defineSchema(Bottle, {
  volume: primitive(),
  carbohydrates: array(schema(Mixture)),
  electrolytes: array(schema(Mixture)),
});
