export abstract class Plan {
  constructor(
    public id: number,
    public name: string,
    public price: number
  ) {}
}