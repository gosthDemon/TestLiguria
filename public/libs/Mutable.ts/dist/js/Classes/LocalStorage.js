import { InMutableHash } from "./InMutableHash.js";
import { OrderBy, Paginator } from "./MutableEntity.js";
export class LocalStorage {
    constructor(container, options = null) {
        this.inMutableHash = new InMutableHash();
        this.hideColumns = [];
        this.orderBy = new OrderBy();
        this.paginator = new Paginator();
        this.inMutableHash = new InMutableHash(container);
        if (localStorage.getItem(this.inMutableHash.id) == null) {
            if (options != null && typeof options == "object") {
                this.hideColumns = options.hideColumns;
            }
            localStorage.setItem(this.inMutableHash.id, JSON.stringify(this));
        }
        else {
            let localStorage = this.get();
            this.hideColumns = localStorage.hideColumns;
            this.orderBy = localStorage.orderBy;
            this.paginator = localStorage.paginator;
        }
    }
    get() {
        let item = localStorage.getItem(this.inMutableHash.id);
        return item ? JSON.parse(item) : null;
    }
    set() {
        localStorage.setItem(this.inMutableHash.id, JSON.stringify(this));
    }
}
