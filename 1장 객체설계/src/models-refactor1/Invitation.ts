export class Invitation {
  private when: Date;

  constructor(when: Date) {
    this.when = when;
  }

  getWhen(): Date {
    return this.when;
  }
}
