export class Column {
    constructor(column = null) {
        var _a, _b;
        this.name = "";
        this.type = "text";
        this.filter = false;
        this.value = "";
        this.searchable = false;
        this.sortable = false;
        if (column != null) {
            this.name = column.name;
            this.type = column.type;
            this.filter = column.filter;
            this.searchable = (_a = column.searchable) !== null && _a !== void 0 ? _a : false;
            this.sortable = (_b = column.sortable) !== null && _b !== void 0 ? _b : false;
            this.render = column.render;
        }
    }
    toEvaluation(filter) {
        try {
            if (typeof filter !== "object") {
                throw new Error("The var must be a object");
            }
            if (!("name" in filter) || typeof filter.name !== "string") {
                throw new Error("Name is required and must be a string");
            }
            if (!("type" in filter) || (filter.type != "text" && filter.type != "number" && filter.type != "date-range" && filter.type != "boolean" && filter.type != "select")) {
                throw new Error("Type is required, must be a string from this list (text, number, date-range, boolean, select)");
            }
            if (!("filter" in filter) || typeof filter.filter !== "boolean") {
                throw new Error("Filter is required and must be a boolean");
            }
            if (!("value" in filter) || typeof filter.value !== "string") {
                throw new Error("Value is required and must be a string");
            }
            if ("searchable" in filter && !(typeof filter.searchable == "boolean")) {
                throw new Error("If Searchable is included this must be a boolean");
            }
            if ("sortable" in filter && !(typeof filter.sortable == "boolean")) {
                throw new Error("If Sortable is included this must be a boolean");
            }
            if ("render" in filter && !(typeof filter.render == "function")) {
                throw new Error("If render is included this must be a function");
            }
            else {
                if (filter.render) {
                    const isValidFunction = this.isValidRenderFunction(filter.render);
                    if (!isValidFunction) {
                        throw new Error("The render function must accept a string as a parameter and return a string.");
                    }
                }
            }
            return true;
        }
        catch (e) {
            if (e instanceof Error) {
                console.error(e.message, filter);
            }
            return false;
        }
    }
    isValidRenderFunction(func) {
        try {
            const result = func("test");
            if (typeof result !== "string") {
                return false;
            }
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
