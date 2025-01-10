export class Element {
  constructor(number, name, symbol, mass) {
    this.number = number;
    this.name = name;
    this.symbol = symbol;
    this.mass = mass; // u
  }
}

// https://physics.nist.gov/PhysRefData/Handbook/periodictable.htm
export const hydrogen = new Element(1, 'Hydrogen', 'H', 1.00794);
export const carbon = new Element(6, 'Carbon', 'C', 12.011);
export const oxygen = new Element(8, 'Oxygen', 'O', 15.9994);
export const sodium = new Element(11, 'Sodium', 'Na', 22.989768);
export const magnesium = new Element(12, 'Magnesium', 'Mg', 24.305);
export const chlorine = new Element(17, 'Chlorine', 'Cl', 35.4527);
export const potassium = new Element(19, 'Potassium', 'K', 39.0983);
