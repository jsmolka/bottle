import { array, defineSchema, primitive, schema } from '@/utils/persist';

export class Atom {
  constructor(number, name, symbol, mass) {
    this.number = number;
    this.name = name;
    this.symbol = symbol;
    this.mass = mass; // u
  }
}

defineSchema(Atom, {
  number: primitive(),
  name: primitive(),
  symbol: primitive(),
  mass: primitive(),
});

export const hydrogen = new Atom(1, 'Hydrogen', 'H', 1.008);
export const carbon = new Atom(6, 'Carbon', 'C', 12.011);
export const oxygen = new Atom(8, 'Oxygen', 'O', 15.999);
export const sodium = new Atom(11, 'Sodium', 'Na', 22.99);
export const magnesium = new Atom(12, 'Magnesium', 'Mg', 24.305);
export const chlorine = new Atom(17, 'Chlorine', 'Cl', 35.45);
export const potassium = new Atom(19, 'Potassium', 'K', 39.098);

export class Atoms {
  constructor(atom, count) {
    this.atom = atom;
    this.count = count;
  }

  // g/mol
  get mass() {
    return this.atom.mass * this.count;
  }
}

defineSchema(Atoms, {
  atom: schema(Atom),
  count: primitive(),
});

export class Molecule {
  constructor(name, formula) {
    this.name = name;
    this.formula = formula;
  }

  // g/mol
  get mass() {
    let mass = 0;
    for (const atoms of this.formula) {
      mass += atoms.mass;
    }
    return mass;
  }

  massPercentage(atom) {
    let mass = 0;
    for (const atoms of this.formula) {
      if (atoms.atom.number === atom.number) {
        mass += atoms.mass;
      }
    }
    return mass / this.mass;
  }
}

defineSchema(Molecule, {
  name: primitive(),
  formula: array(schema(Atoms)),
});
