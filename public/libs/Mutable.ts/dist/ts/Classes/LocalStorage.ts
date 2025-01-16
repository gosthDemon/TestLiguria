import { InMutableHash } from "./InMutableHash.js";
import { OrderBy, Paginator } from "./MutableEntity.js";
export class LocalStorage {
  public inMutableHash: InMutableHash = new InMutableHash();
  public hideColumns: string[] = [];
  public orderBy: OrderBy = new OrderBy();
  public paginator: Paginator = new Paginator();
  constructor(container: string, options: any = null) {
    this.inMutableHash = new InMutableHash(container);
    if (localStorage.getItem(this.inMutableHash.id) == null) {
      if (options != null && typeof options == "object") {
        this.hideColumns = options.hideColumns;
      }
      localStorage.setItem(this.inMutableHash.id, JSON.stringify(this));
    } else {
      let localStorage: any = this.get();
      this.hideColumns = localStorage.hideColumns;
      this.orderBy = localStorage.orderBy;
      this.paginator = localStorage.paginator;
    }
  }
  public get() {
    let item = localStorage.getItem(this.inMutableHash.id);
    return item ? JSON.parse(item) : null;
  }
  public set() {
    localStorage.setItem(this.inMutableHash.id, JSON.stringify(this));
  }
}
