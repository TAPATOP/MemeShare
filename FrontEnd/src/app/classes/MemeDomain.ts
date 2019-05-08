export class MemeDomain {
  private name: string;
  private address: string;

  constructor(name: string, address: string) {
    this.name = name;
    this.address = address;
  }

  getName(): string {
    return this.name;
  }

  getAddress(): string {
    return this.address;
  }
}
