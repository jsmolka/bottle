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
  constructor(name, formula, osmolesPerMole) {
    this.name = name;
    this.formula = formula;
    this.osmolesPerMole = osmolesPerMole;
  }

  static maltodextrin(n) {
    return new Molecule(
      `Maltodextrin (n = ${n})`,
      [
        new Atoms(Atom.carbon, 6 * n),
        new Atoms(Atom.hydrogen, 10 * n + 2),
        new Atoms(Atom.oxygen, 5 * n + 1),
      ],
      1,
    );
  }

  static fructose = new Molecule(
    'Fructose',
    [
      new Atoms(Atom.carbon, 6),
      new Atoms(Atom.hydrogen, 12),
      new Atoms(Atom.oxygen, 6),
    ], // prettier-ignore
    1,
  );

  static sucrose = new Molecule(
    'Sucrose',
    [
      new Atoms(Atom.carbon, 12),
      new Atoms(Atom.hydrogen, 22),
      new Atoms(Atom.oxygen, 11)
    ], // prettier-ignore
    1,
  );

  static isomaltulose = new Molecule(
    'Isomaltulose',
    [
      new Atoms(Atom.carbon, 12),
      new Atoms(Atom.hydrogen, 22),
      new Atoms(Atom.oxygen, 11)
    ], // prettier-ignore
    1,
  );

  static sodiumChloride = new Molecule(
    'Sodium chloride',
    [
      new Atoms(Atom.sodium, 1),
      new Atoms(Atom.chlorine, 1)
    ], // prettier-ignore
    2,
  );

  static sodiumCitrate = new Molecule(
    'Sodium citrate',
    [
      new Atoms(Atom.sodium, 3),
      new Atoms(Atom.carbon, 6),
      new Atoms(Atom.hydrogen, 5),
      new Atoms(Atom.oxygen, 7),
    ],
    4,
  );

  static potassiumChloride = new Molecule(
    'Potassium chloride',
    [
      new Atoms(Atom.potassium, 1),
      new Atoms(Atom.chlorine, 1)
    ], // prettier-ignore
    2,
  );

  static potassiumCitrate = new Molecule(
    'Potassium citrate',
    [
      new Atoms(Atom.potassium, 3),
      new Atoms(Atom.carbon, 6),
      new Atoms(Atom.hydrogen, 5),
      new Atoms(Atom.oxygen, 7),
    ],
    4,
  );

  static magnesiumChloride = new Molecule(
    'Magnesium chloride',
    [
      new Atoms(Atom.magnesium, 1),
      new Atoms(Atom.chlorine, 2)
    ], // prettier-ignore
    3,
  );

  static magnesiumCitrate = new Molecule(
    'Magnesium citrate',
    [
      new Atoms(Atom.magnesium, 1),
      new Atoms(Atom.carbon, 6),
      new Atoms(Atom.hydrogen, 6),
      new Atoms(Atom.oxygen, 7),
    ],
    2,
  );

  static magnesiumMalate = new Molecule(
    'Magnesium malate',
    [
      new Atoms(Atom.magnesium, 1),
      new Atoms(Atom.carbon, 4),
      new Atoms(Atom.hydrogen, 4),
      new Atoms(Atom.oxygen, 5),
    ],
    2,
  );

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
  osmolesPerMole: primitive(),
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
  constructor(name, substances, mass) {
    this.name = name;
    this.substances = substances;
    this.mass = mass; // g
  }

  static fromMolecule(molecule, mass) {
    return new Mixture(molecule.name, [new Substance(molecule, 1)], mass);
  }

  // g/mol
  get molarMass() {
    let total = 0;
    let totalProportions = 0;
    for (const substance of this.substances) {
      total += substance.proportion * substance.molecule.molarMass;
      totalProportions += substance.proportion;
    }
    return total / totalProportions;
  }

  get osmolesPerMole() {
    let total = 0;
    let totalProportions = 0;
    for (const substance of this.substances) {
      total += substance.proportion * substance.molecule.osmolesPerMole;
      totalProportions += substance.proportion;
    }
    return total / totalProportions;
  }
}

defineSchema(Mixture, {
  name: primitive(),
  substances: array(schema(Substance)),
  mass: primitive(),
});
