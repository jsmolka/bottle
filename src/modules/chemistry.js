export class Atom {
  constructor(number, name, symbol, mass) {
    this.number = number;
    this.name = name;
    this.symbol = symbol;
    this.mass = mass; // u
  }
}

export const hydrogen = new Atom(1, 'Hydrogen', 'H', 1.008);
export const carbon = new Atom(6, 'Carbon', 'C', 12.011);
export const oxygen = new Atom(8, 'Oxygen', 'O', 15.999);
export const sodium = new Atom(11, 'Sodium', 'Na', 22.99);
export const magnesium = new Atom(12, 'Magnesium', 'Mg', 24.305);
export const chlorine = new Atom(17, 'Chlorine', 'Cl', 35.45);
export const potassium = new Atom(19, 'Potassium', 'K', 39.098);
