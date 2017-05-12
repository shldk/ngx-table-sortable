import {SORTING_ORDER} from "./sorting-order";

export class SortingSettings {
  constructor(public by: string, public order: SORTING_ORDER) {}

  public set(by: string):void {
    if (by === this.by) {
      this.changeOrder();
      return;
    }

    this.by = by;
    this.order = SORTING_ORDER.ASC;
  }

  private changeOrder():void {
    this.order = this.order === SORTING_ORDER.ASC ? SORTING_ORDER.DESC : SORTING_ORDER.ASC;
  }
}
