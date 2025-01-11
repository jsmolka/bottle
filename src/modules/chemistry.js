import { array, defineSchema, primitive, schema } from '@/utils/persist';
import { merge } from 'lodash-es';

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

  // u
  get mass() {
    return this.atom.mass * this.count;
  }
}

defineSchema(Atoms, {
  atom: schema(Atom),
  count: primitive(),
});

export class Molecule {
  constructor(name, formula, options = {}) {
    options = merge(
      {
        osmolesPerMole: 1,
        glucosePercentage: 0,
        fructosePercentage: 0,
      },
      options,
    );

    this.name = name;
    this.formula = formula;
    this.osmolesPerMole = options.osmolesPerMole; // Osm/mol
    this.glucosePercentage = options.glucosePercentage;
    this.fructosePercentage = options.fructosePercentage;
  }

  static maltodextrin(n) {
    return new Molecule(
      `Maltodextrin (n = ${n})`,
      [
        new Atoms(Atom.carbon, 6 * n),
        new Atoms(Atom.hydrogen, 10 * n + 2),
        new Atoms(Atom.oxygen, 5 * n + 1),
      ],
      { glucosePercentage: 1 },
    );
  }

  static fructose = new Molecule(
    'Fructose',
    [
      new Atoms(Atom.carbon, 6),
      new Atoms(Atom.hydrogen, 12),
      new Atoms(Atom.oxygen, 6),
    ], // prettier-ignore
    { fructosePercentage: 1 },
  );

  static sucrose = new Molecule(
    'Sucrose',
    [
      new Atoms(Atom.carbon, 12),
      new Atoms(Atom.hydrogen, 22),
      new Atoms(Atom.oxygen, 11)
    ], // prettier-ignore
    { glucosePercentage: 0.5, fructosePercentage: 0.5 },
  );

  static isomaltulose = new Molecule(
    'Isomaltulose',
    [
      new Atoms(Atom.carbon, 12),
      new Atoms(Atom.hydrogen, 22),
      new Atoms(Atom.oxygen, 11)
    ], // prettier-ignore
    { glucosePercentage: 0.5, fructosePercentage: 0.5 },
  );

  static sodiumChloride = new Molecule(
    'Sodium chloride',
    [
      new Atoms(Atom.sodium, 1),
      new Atoms(Atom.chlorine, 1)
    ], // prettier-ignore
    { osmolesPerMole: 2 },
  );

  static sodiumCitrate = new Molecule(
    'Sodium citrate',
    [
      new Atoms(Atom.sodium, 3),
      new Atoms(Atom.carbon, 6),
      new Atoms(Atom.hydrogen, 5),
      new Atoms(Atom.oxygen, 7),
    ],
    { osmolesPerMole: 4 },
  );

  static potassiumChloride = new Molecule(
    'Potassium chloride',
    [
      new Atoms(Atom.potassium, 1),
      new Atoms(Atom.chlorine, 1)
    ], // prettier-ignore
    { osmolesPerMole: 2 },
  );

  static potassiumCitrate = new Molecule(
    'Potassium citrate',
    [
      new Atoms(Atom.potassium, 3),
      new Atoms(Atom.carbon, 6),
      new Atoms(Atom.hydrogen, 5),
      new Atoms(Atom.oxygen, 7),
    ],
    { osmolesPerMole: 4 },
  );

  static magnesiumChloride = new Molecule(
    'Magnesium chloride',
    [
      new Atoms(Atom.magnesium, 1),
      new Atoms(Atom.chlorine, 2)
    ], // prettier-ignore
    { osmolesPerMole: 3 },
  );

  static magnesiumCitrate = new Molecule(
    'Magnesium citrate',
    [
      new Atoms(Atom.magnesium, 1),
      new Atoms(Atom.carbon, 6),
      new Atoms(Atom.hydrogen, 6),
      new Atoms(Atom.oxygen, 7),
    ],
    { osmolesPerMole: 2 },
  );

  static magnesiumMalate = new Molecule(
    'Magnesium malate',
    [
      new Atoms(Atom.magnesium, 1),
      new Atoms(Atom.carbon, 4),
      new Atoms(Atom.hydrogen, 4),
      new Atoms(Atom.oxygen, 5),
    ],
    { osmolesPerMole: 2 },
  );

  // g/mol
  get molarMass() {
    let molarMass = 0;
    for (const atoms of this.formula) {
      molarMass += atoms.mass;
    }
    return molarMass;
  }

  // g/l -> Osm/l
  osmolarity(concentration) {
    return (concentration / this.molarMass) * this.osmolesPerMole;
  }

  molarMassPercentage(atom) {
    let molarMass = 0;
    for (const atoms of this.formula) {
      if (atoms.atom.number === atom.number) {
        molarMass += atoms.mass;
      }
    }
    return molarMass / this.molarMass;
  }
}

defineSchema(Molecule, {
  name: primitive(),
  formula: array(schema(Atoms)),
  osmolesPerMole: primitive(),
  glucosePercentage: primitive(),
  fructosePercentage: primitive(),
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

export class Substances extends Array {
  get totalProportion() {
    let proportion = 0;
    for (const substance of this) {
      proportion += substance.proportion;
    }
    return proportion;
  }

  // g/mol
  get molarMass() {
    let molarMass = 0;
    for (const substance of this) {
      molarMass += substance.proportion * substance.molecule.molarMass;
    }
    return molarMass / this.totalProportion;
  }

  // Osm/mol
  get osmolesPerMole() {
    let osmolesPerMole = 0;
    for (const substance of this) {
      osmolesPerMole += substance.proportion * substance.molecule.osmolesPerMole;
    }
    return osmolesPerMole / this.totalProportion;
  }

  // g/l -> Osm/l
  osmolarity(concentration) {
    return (concentration / this.molarMass) * this.osmolesPerMole;
  }

  molarMassPercentage(atom) {
    let molarMass = 0;
    for (const substance of this) {
      molarMass += substance.proportion * substance.molecule.molarMassPercentage(atom);
    }
    return molarMass / this.totalProportion;
  }

  get glucosePercentage() {
    let percentage = 0;
    for (const substance of this) {
      percentage += substance.proportion * substance.molecule.glucosePercentage;
    }
    return percentage / this.totalProportion;
  }

  get fructosePercentage() {
    let percentage = 0;
    for (const substance of this) {
      percentage += substance.proportion * substance.molecule.fructosePercentage;
    }
    return percentage / this.totalProportion;
  }
}

export class Mixture {
  constructor(name, substances, mass) {
    this.name = name;
    this.substances = substances;
    this.mass = mass; // g
  }

  static molecule(molecule, mass) {
    return new Mixture(molecule.name, Substances.of(new Substance(molecule, 1)), mass);
  }

  static lmnt(mass) {
    return new Mixture(
      'LMNT',
      Substances.of(
        new Substance(Molecule.sodiumChloride, 1000),
        new Substance(Molecule.potassiumChloride, 150),
        new Substance(Molecule.magnesiumMalate, 150),
      ),
      mass,
    );
  }

  // l -> g/l
  concentration(volume) {
    return this.mass / volume;
  }

  // l -> Osm/l
  osmolarity(volume) {
    return this.substances.osmolarity(this.concentration(volume));
  }
}

defineSchema(Mixture, {
  name: primitive(),
  substances: array(schema(Substance), Substances),
  mass: primitive(),
});

export class Mixtures extends Array {
  get totalMass() {
    let mass = 0;
    for (const mixture of this) {
      mass += mixture.mass;
    }
    return mass;
  }

  get molarMass() {
    let molarMass = 0;
    for (const mixture of this) {
      molarMass += mixture.mass * mixture.substances.molarMass;
    }
    return molarMass / this.totalMass;
  }

  // l -> g/l
  totalConcentration(volume) {
    let concentration = 0;
    for (const mixture of this) {
      concentration += mixture.concentration(volume);
    }
    return concentration;
  }

  // l -> Osm/l
  totalOsmolarity(volume) {
    let osmolarity = 0;
    for (const mixture of this) {
      osmolarity += mixture.osmolarity(volume);
    }
    return osmolarity;
  }

  molarMassPercentage(atom) {
    let percentage = 0;
    for (const mixture of this) {
      percentage += mixture.mass * mixture.substances.molarMassPercentage(atom);
    }
    return percentage / this.totalMass;
  }

  get glucosePercentage() {
    let percentage = 0;
    for (const mixture of this) {
      percentage += mixture.mass * mixture.substances.glucosePercentage;
    }
    return percentage / this.totalMass;
  }

  get fructosePercentage() {
    let percentage = 0;
    for (const mixture of this) {
      percentage += mixture.mass * mixture.substances.fructosePercentage;
    }
    return percentage / this.totalMass;
  }
}
