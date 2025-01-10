import { array, defineSchema, primitive, schema } from '@/utils/persist';

export class Atom {
  constructor(number, name, symbol, mass) {
    this.number = number;
    this.name = name;
    this.symbol = symbol;
    this.mass = mass; // u
  }

  static hydrogen = new Atom(1, 'Hydrogen', 'H', 1.008);
  static carbon = new Atom(6, 'Carbon', 'C', 12.011);
  static oxygen = new Atom(8, 'Oxygen', 'O', 15.999);
  static sodium = new Atom(11, 'Sodium', 'Na', 22.99);
  static magnesium = new Atom(12, 'Magnesium', 'Mg', 24.305);
  static chlorine = new Atom(17, 'Chlorine', 'Cl', 35.45);
  static potassium = new Atom(19, 'Potassium', 'K', 39.098);
}

defineSchema(Atom, {
  number: primitive(),
  name: primitive(),
  symbol: primitive(),
  mass: primitive(),
});

export class Atoms {
  constructor(atom, count) {
    this.atom = atom;
    this.count = count;
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

  static glucose = new Molecule('Glucose', [
    new Atoms(Atom.carbon, 6),
    new Atoms(Atom.hydrogen, 12),
    new Atoms(Atom.oxygen, 6),
  ]);

  static fructose = new Molecule('Fructose', [
    new Atoms(Atom.carbon, 6),
    new Atoms(Atom.hydrogen, 12),
    new Atoms(Atom.oxygen, 6),
  ]);

  // g/mol
  get molarMass() {
    let mass = 0;
    for (const atoms of this.formula) {
      mass += atoms.atom.mass * atoms.count;
    }
    return mass;
  }
}

defineSchema(Molecule, {
  name: primitive(),
  formula: array(schema(Atoms)),
});

export class Substance {
  constructor(molecule, proportion) {
    this.molecule = molecule;
    this.proportion = proportion;
  }
}

defineSchema(Substance, {
  molecule: schema(Molecule),
  proportion: primitive(),
});

export class Mixture {
  constructor(substances, mass) {
    this.substances = substances;
    this.mass = mass; // g
  }

  static fromMolecule(molecule, mass) {
    return new Mixture([new Substance(molecule, 1)], mass);
  }

  // g/mol
  get molarMass() {
    let mass = 0;
    let prop = 0;
    for (const substance of this.substances) {
      mass += substance.proportion * substance.molecule.molarMass;
      prop += substance.proportion;
    }
    return mass / prop;
  }
}

defineSchema(Mixture, {
  substances: array(schema(Substance)),
  mass: primitive(),
});
