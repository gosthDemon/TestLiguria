import { Column } from "../Classes/Column.js";
export class MutableEntity {
    public container: string = "";
    public data: Record<string, any>[] = [];
    public filteredData: Record<string, any>[] = [];
    public headers: string[] = [];
    public messageIsEmpty: string = "No se encontraron registros que cumplan con la configuración solicitada";
    public options: {
        scrollable: boolean;
        sortableAll: boolean;
        searchableAll: boolean;
        filterableAll: boolean;
        selectableAll: boolean;
        hideColumns: string[];
        removeColumns: string[];
        columns: Column[];
        orderBy: OrderBy;
        paginator: Paginator;
    } = {
        scrollable: true,
        sortableAll: true,
        filterableAll: true,
        searchableAll: true,
        selectableAll: false,
        hideColumns: [],
        removeColumns: [],
        columns: [],
        orderBy: new OrderBy(),
        paginator: new Paginator(),
    };
    public buttons?: (record: any) => string;

    public buildToSelf(options: any): boolean {
        try {
            this.validate(options);
            this.container = options.container;
            this.data = options.data;
            this.buttons =
                "buttons" in options
                    ? options.buttons
                    : function () {
                          return "";
                      };
            this.headers = this.getHeaders();
            this.filteredData = this.data.map((item, index) => ({
                ...item,
                mutable_index: index,
            }));
            this.data = this.data.map((item, index) => ({
                ...item,
                mutable_index: index,
            }));
            if ("options" in options) {
                "removeColumns" in options.options && Array.isArray(options.options.removeColumns) ? this.removeColumns(options.removeColumns) : null;
                this.messageIsEmpty = "messageIsEmpty" in options ? options.messageIsEmpty : this.messageIsEmpty;
                this.options.hideColumns = "hideColumns" in options.options ? options.options.hideColumns : this.options.hideColumns;
                this.options.removeColumns = "removeColumns" in options.options ? options.options.removeColumns : this.options.removeColumns;
                if (Array.isArray(options.options.columns)) {
                    let pivoteColumn: Column = new Column();
                    options.options.columns.forEach((item: any) => {
                        let isOk: boolean = pivoteColumn.toEvaluation(item);
                        if (isOk) {
                            this.options.columns = [...this.options.columns, new Column(item)];
                        }
                    });
                }
                this.options.orderBy = "orderBy" in options.options ? new OrderBy(options.options.orderBy) : this.options.orderBy;
                this.options.paginator = "paginator" in options.options ? new Paginator(options.options.paginator) : this.options.paginator;
                this.options.searchableAll = "searchableAll" in options.options ? options.options.searchableAll : this.options.searchableAll;
                this.options.sortableAll = "sortableAll" in options.options ? options.options.sortableAll : this.options.sortableAll;
                this.options.filterableAll = "filterableAll" in options.options ? options.options.filterableAll : this.options.filterableAll;
                this.options.selectableAll = "selectableAll" in options.options ? options.options.selectableAll : this.options.selectableAll;
                if (this.options.selectableAll) {
                    this.data = this.data.map((item) => ({
                        ...item,
                        selectable: false,
                    }));
                }
            }
            return true;
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e.message);
            }
            return false;
        }
    }
    public validate(options: any) {
        try {
            if (!("container" in options) || typeof options.container !== "string") {
                throw new Error(`"The 'container' property is required and must be a string."`);
            }
            if (!("data" in options) || !Array.isArray(options.data)) {
                throw new Error("ERROR: The 'data' is required or is not a valid array.");
            }
            if (!this.checkDataStructure(options.data)) {
                throw new Error("ERROR: All objects in the Mutable table must have the same structure.");
            }
            if ("messageIsEmpty" in options && typeof options.messageIsEmpty !== "string") {
                throw new Error(`"The 'messageIsEmpty' property must be a string."`);
            }
            if (typeof options.options === "object") {
                if ("hideColumns" in options.options && (!Array.isArray(options.options.hideColumns) || options.options.hideColumns.some((item: any) => typeof item !== "string"))) {
                    throw new Error(`"The 'hideColumns' must be an array with all its properties of type string"`);
                }
                if ("removeColumns" in options.options && (!Array.isArray(options.options.removeColumns) || options.options.removeColumns.some((item: any) => typeof item !== "string"))) {
                    throw new Error(`"The 'removeColumns' must be an array with all its properties of type string"`);
                }
                if ("columns" in options.options && (!Array.isArray(options.options.columns) || options.options.columns.some((item: any) => typeof item !== "object"))) {
                    throw new Error("The 'columns' in options must be an array containing only objects.");
                }
            }
            if ("buttons" in options && !(typeof options.buttons == "function")) {
                throw new Error("If buttons is included this must be a function");
            } else {
                if (options.buttons) {
                    const isValidFunction = this.isValidRenderFunction(options.buttons);
                    if (!isValidFunction) {
                        throw new Error("The render function must accept a string as a parameter and return a string.");
                    }
                }
            }
            return true;
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e.message);
            }
            throw new Error("Error in format, check 'options'");
        }
    }
    private checkDataStructure<T extends Record<string, any>>(data: T[]): boolean {
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("ERROR: The 'data' attribute contains no records.");
        }
        const keysReference = Object.keys(data[0]);
        const keysSet = new Set(keysReference);
        return data.every((item) => {
            const keysItem = Object.keys(item);
            return keysReference.length === keysItem.length && keysItem.every((key) => keysSet.has(key));
        });
    }
    public getHeaders(data = this.data[0]) {
        return Object.keys(data);
    }
    private removeColumns(removeColumns: string[]) {
        try {
            console.log(removeColumns);

            if (removeColumns.length > 0) {
                const columnsToRemove = new Set(removeColumns); // Optimiza búsquedas
                console.log(`Eliminado ${columnsToRemove}`);
                this.data = this.data.map((record: any) => {
                    return Object.fromEntries(Object.entries(record).filter(([key]) => !columnsToRemove.has(key)));
                });
            }
        } catch (e) {
            if (e instanceof Error) {
                console.error(`An error ocurred: ${e.message}`);
                throw `An error ocurred: ${e.message}`;
            }
        }
    }
    private isValidRenderFunction(func: Function): boolean {
        try {
            const result = func("test");
            if (typeof result !== "string") {
                return false;
            }

            return true;
        } catch (e) {
            return false;
        }
    }
}
export class OrderBy {
    public column: string = "";
    public order: string = "ASC";

    constructor(orderBy: Partial<OrderBy> = {}) {
        if (typeof orderBy === "object") {
            this.column = "column" in orderBy && typeof orderBy.column === "string" ? orderBy.column : this.column;
            this.order = "order" in orderBy && typeof orderBy.order === "string" && ["ASC", "DESC"].includes(orderBy.order) ? orderBy.order : this.order;
        }
    }
}
export class Paginator {
    public enabled: boolean = false;
    public recordsPerPage: number = 10;
    public optionsRecordsPerPage: number[] = [5, 10, 20, 50, 100, 200, 500];
    public page: number = 1;

    constructor(paginator: Partial<Paginator> = {}) {
        if (typeof paginator === "object") {
            this.enabled = typeof paginator.enabled === "boolean" ? paginator.enabled : this.enabled;
            this.recordsPerPage = typeof paginator.recordsPerPage === "number" && paginator.recordsPerPage > 0 ? paginator.recordsPerPage : this.recordsPerPage;
            this.optionsRecordsPerPage =
                Array.isArray(paginator.optionsRecordsPerPage) && paginator.optionsRecordsPerPage.every((item) => typeof item === "number")
                    ? paginator.optionsRecordsPerPage
                    : this.optionsRecordsPerPage;
            this.page = typeof paginator.page === "number" && paginator.page > 0 ? paginator.page : this.page;
        }
    }
}
