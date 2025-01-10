import { defineSchema, primitive } from '@/utils/persist';

export class Bottle {
  constructor() {
    this.volume = 500;
  }
}

defineSchema(Bottle, {
  volume: primitive(),
});
