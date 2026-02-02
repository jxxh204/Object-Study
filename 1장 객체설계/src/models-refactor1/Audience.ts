import { Bag } from './Bag';

export class Audience {
  private bag: Bag;
  private name: string;

  constructor(name: string, bag: Bag) {
    this.name = name;
    this.bag = bag;
  }

  getBag(): Bag {
    return this.bag;
  }

  getName(): string {
    return this.name;
  }
}
