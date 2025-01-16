import { MutableEntity } from "./MutableEntity.js";
import { LocalStorage } from "./LocalStorage.js";
import { Column } from "./Column.js";
export default class Mutable {
    constructor(options) {
        this.mutable = new MutableEntity();
        this.localStorage = null;
        if (this.mutable.buildToSelf(options)) {
            this.localStorage = new LocalStorage(options.container, this.mutable.options);
            this.localStorage.get();
            this.renderHeaders();
            this.renderTable();
            this.renderFooter();
        }
    }
    renderHeaders() {
        var _a;
        let mutableContainer = document.getElementById(this.mutable.container);
        const uniqueId = (_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.inMutableHash.id;
        if (mutableContainer != null && uniqueId != undefined) {
            if (!mutableContainer.querySelector(`#${uniqueId}_header`)) {
                let header = document.createElement("div");
                header.id = `${uniqueId}_header`;
                mutableContainer.appendChild(header);
                header = mutableContainer.querySelector(`#${uniqueId}_header`);
                // Renderizar contenido del header
                header.innerHTML = `
                <div class="mutable-actions">
                    ${this.createLeftSection(uniqueId)}
                    ${this.createRightSection(uniqueId)}
                </div>
            `;
                this.setupGlobalClickListener();
                this.buildSearcher();
                this.buildHandlerHiddenColumns();
                this.buildHandlerQuantityPaginator();
            }
        }
    }
    createLeftSection(uniqueId) {
        return `
        <div id="${uniqueId}_left" class="left left">
            <div class="button-container">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style='padding:0px 3px'>
                    <path d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input id="${uniqueId}_searcher" class="searcher" placeholder="Search..." />
            </div>
            ${this.mutable.options.filterableAll
            ? this.createDropdownButton(`${uniqueId}_filters`, "Filtros", `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.32 19.07C14.32 19.68 13.92 20.48 13.41 20.79L12 21.7C10.69 22.51 8.87 21.6 8.87 19.98V14.63C8.87 13.92 8.47 13.01 8.06 12.51L4.21997 8.47C3.70997 7.96 3.31 7.06001 3.31 6.45001V4.13C3.31 2.92 4.22002 2.01001 5.33002 2.01001H18.67C19.78 2.01001 20.69 2.92 20.69 4.03V6.25C20.69 7.06 20.18 8.07001 19.68 8.57001" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16.07 16.52C17.8373 16.52 19.27 15.0873 19.27 13.32C19.27 11.5527 17.8373 10.12 16.07 10.12C14.3027 10.12 12.87 11.5527 12.87 13.32C12.87 15.0873 14.3027 16.52 16.07 16.52Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M19.87 17.12L18.87 16.12" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>`)
            : ""}
        </div>
    `;
    }
    createRightSection(uniqueId) {
        // Verificar si el contenedor con el id ${uniqueId}_right ya existe
        let rightSection = document.getElementById(`${uniqueId}_right`);
        // Si no existe, creamos el HTML como un string
        const rightSectionHTML = `
        <div id="${uniqueId}_right" class="right">
            ${!this.mutable.data.every((item) => item.selectable === false) && this.mutable.options.selectableAll == true
            ? `<button id="${uniqueId}_massiveActionButton" class="massive-action-button">MASIVE ACTIONS</button>` // Si todos los items no son seleccionables, mostramos el botón de acción masiva
            : `
                        ${this.createDropdownButton(`${uniqueId}_HideColumns`, "Columnas", `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.54975 8.41967C3.84264 8.12677 4.31752 8.12677 4.61041 8.41967L11.1304 14.9397C11.6075 15.4168 12.3926 15.4168 12.8697 14.9397L19.3897 8.41967C19.6826 8.12677 20.1575 8.12677 20.4504 8.41967C20.7433 8.71256 20.7433 9.18743 20.4504 9.48033L13.9304 16.0003C12.8675 17.0632 11.1326 17.0632 10.0697 16.0003L3.54975 9.48033C3.25685 9.18743 3.25685 8.71256 3.54975 8.41967Z" fill="#292D32"/>
                            </svg>`)}
                        ${this.createDropdownButton(`${uniqueId}_ItemsPerPage`, `<span id='${uniqueId}_counterPerPage'>10</span>`, `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.54975 8.41967C3.84264 8.12677 4.31752 8.12677 4.61041 8.41967L11.1304 14.9397C11.6075 15.4168 12.3926 15.4168 12.8697 14.9397L19.3897 8.41967C19.6826 8.12677 20.1575 8.12677 20.4504 8.41967C20.7433 8.71256 20.7433 9.18743 20.4504 9.48033L13.9304 16.0003C12.8675 17.0632 11.1326 17.0632 10.0697 16.0003L3.54975 9.48033C3.25685 9.18743 3.25685 8.71256 3.54975 8.41967Z" fill="#292D32"/>
                            </svg>`, true)}
                    `}
        </div>
    `;
        // Si el contenedor no existe, devolver el HTML como texto sin agregarlo al DOM
        if (!rightSection) {
            return rightSectionHTML;
        }
        else {
            // Si el contenedor ya existe, actualizamos el contenido del DOM
            rightSection.innerHTML = rightSectionHTML;
        }
        this.setupGlobalClickListener();
        this.buildHandlerHiddenColumns();
        this.buildHandlerQuantityPaginator();
        // Devolvemos el HTML como string
        return rightSection.outerHTML;
    }
    renderTable() {
        if (this.localStorage) {
            const mutableContainer = document.getElementById(this.mutable.container);
            if (mutableContainer == null) {
                console.error("Mutable container element not found in the DOM.");
                return;
            }
            const uniqueId = this.localStorage.inMutableHash.id;
            if (mutableContainer && !mutableContainer.querySelector(`#${uniqueId}_table`)) {
                const table = document.createElement("div");
                table.id = `${uniqueId}_table`;
                table.classList.add("mutable-table");
                mutableContainer.appendChild(table);
            }
            const container = mutableContainer.querySelector(`#${uniqueId}_table`);
            if (container == null) {
                console.error("Unable to create the table in the DOM.");
            }
            const filteredHeaders = this.mutable.getHeaders(this.mutable.filteredData[0]);
            const hide = this.localStorage.hideColumns;
            let data = [...this.mutable.filteredData];
            const page = this.mutable.options.paginator.page;
            data = this.getRecordsByPage(page);
            if (!container)
                return;
            container.innerHTML = "";
            if (!data[0] || Object.keys(data[0]).length === 0) {
                container.innerHTML = this.renderIfAllColumnsAreHidden();
                return;
            }
            let tableHtml = '<table class="data-table"><thead><tr>';
            if (this.mutable.options.selectableAll) {
                let isSelected = "";
                const allSelectable = this.mutable.data.every((item) => item.selectable === true);
                if (allSelectable) {
                    isSelected = "checked";
                }
                tableHtml += `<th><input type="checkbox" id="${uniqueId}_select_all" ${isSelected}></th>`;
            }
            filteredHeaders.forEach((header) => {
                var _a, _b, _c, _d, _e;
                if (header != "mutable_index") {
                    if (!hide.includes(header) && header != "mutable_index") {
                        let icon = "";
                        if (((_c = (_b = (_a = this.mutable) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.columns) === null || _c === void 0 ? void 0 : _c.length) > 0 || this.mutable.options.sortableAll) {
                            const column = this.mutable.options.columns.find((col) => col.name === header) || null;
                            if ((column != null && column.sortable) || this.mutable.options.sortableAll) {
                                icon = "<i class='far fa-sort-alt'></i>";
                                if (((_e = (_d = this.localStorage) === null || _d === void 0 ? void 0 : _d.orderBy) === null || _e === void 0 ? void 0 : _e.column) === header) {
                                    icon = this.localStorage.orderBy.order === "ASC" ? "<i class='far fa-sort-alpha-up-alt'></i>" : "<i class='far fa-sort-alpha-down'></i>";
                                }
                            }
                        }
                        tableHtml += `<th data-header="${header}">${header.toUpperCase()} ${icon}</th>`;
                    }
                }
            });
            //Verificar que la funcion en this.mutable.buttons no retorne vacio
            if (this.mutable.buttons != null && typeof this.mutable.buttons === "function") {
                const testRecord = {};
                const result = this.mutable.buttons(testRecord);
                if (result != null && result.trim() !== "") {
                    tableHtml += `<th>Acciones</th>`;
                }
            }
            tableHtml += "</tr></thead><tbody>";
            data.forEach((row, index) => {
                tableHtml += "<tr>";
                if (this.mutable.options.selectableAll) {
                    let isSelected = "";
                    if (this.mutable.data[row.mutable_index].selectable) {
                        isSelected = "checked";
                    }
                    tableHtml += `<td><input type="checkbox" ${isSelected} data-index='${row.mutable_index}'></td>`;
                }
                filteredHeaders.forEach((header) => {
                    var _a;
                    if (header != "mutable_index") {
                        if (!hide.includes(header)) {
                            let value = row[header];
                            if (value.length >= 40) {
                                const regex = new RegExp(`.{1,40}(\\s|$)`, "g");
                                value =
                                    ((_a = value
                                        .match(regex)) === null || _a === void 0 ? void 0 : _a.map((segment) => segment.trim()).join("<br>")) || value;
                            }
                            const column = this.mutable.options.columns.find((col) => col.name === header) || null;
                            if (column != null && typeof column.render === "function") {
                                value = column.render(value);
                            }
                            tableHtml += `<td>${value}</td>`;
                        }
                    }
                });
                if (this.mutable.buttons != null && typeof this.mutable.buttons === "function") {
                    if (this.mutable.buttons(row) != "") {
                        if (this.mutable.buttons != null) {
                            let button = this.mutable.buttons(this.mutable.data[row.mutable_index]);
                            if (button != "") {
                                tableHtml += `<td> ${button}</td>`;
                            }
                        }
                    }
                }
                tableHtml += "</tr>";
            });
            tableHtml += "</tbody></table>";
            container.innerHTML = tableHtml;
            const headers = container.querySelectorAll("th[data-header]");
            headers.forEach((th) => {
                th.addEventListener("click", () => {
                    var _a;
                    this.orderBy((_a = th.getAttribute("data-header")) !== null && _a !== void 0 ? _a : "");
                });
            });
            // Asignar evento change al checkbox
            const selectAllCheckbox = container.querySelector(`#${uniqueId}_select_all`);
            if (selectAllCheckbox) {
                selectAllCheckbox.addEventListener("change", (event) => this.selectAll(event));
            }
            const recordCheckboxes = container.querySelectorAll("tbody input[type='checkbox'][data-index]");
            recordCheckboxes.forEach((checkbox) => {
                checkbox.addEventListener("change", (event) => {
                    var _a;
                    const target = event.target;
                    const rowIndex = parseInt((_a = target.getAttribute("data-index")) !== null && _a !== void 0 ? _a : "-1", 10);
                    const isChecked = target.checked;
                    // Llamar a la función tipada para manejar el cambio
                    this.selectOne(rowIndex, isChecked);
                });
            });
        }
    }
    renderIfAllColumnsAreHidden() {
        let tableHtml = '<table class="data-table"><thead><tr>';
        let dataHeaders = this.mutable.getHeaders();
        // Add headers
        dataHeaders.forEach((header) => {
            tableHtml += `<th>${header.toUpperCase()}</th>`;
        });
        tableHtml += "</tr></thead><tbody>";
        tableHtml += `<tr style="text-align: center;" ><td colspan="${Object.keys(this.mutable.data[0]).length}">${this.mutable.messageIsEmpty}</td></tr>`;
        return tableHtml;
    }
    renderFooter() {
        var _a, _b;
        const mutableContainer = document.getElementById(this.mutable.container);
        if (!(mutableContainer instanceof HTMLElement))
            return;
        const uniqueId = (_b = (_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.inMutableHash) === null || _b === void 0 ? void 0 : _b.id;
        if (!uniqueId)
            return;
        const footerId = `${uniqueId}_footer`;
        const existingFooter = mutableContainer.querySelector(`#${footerId}`);
        if (existingFooter)
            existingFooter.remove();
        const recordsLength = this.mutable.filteredData.length;
        const recordsPerPage = this.mutable.options.paginator.recordsPerPage;
        const page = this.mutable.options.paginator.page;
        const totalPages = Math.ceil(recordsLength / recordsPerPage);
        if (totalPages <= 1)
            return;
        const footer = document.createElement("div");
        footer.id = footerId;
        footer.className = "mutable-footer";
        mutableContainer.appendChild(footer);
        const pageSelector = document.createElement("div");
        pageSelector.id = `${uniqueId}_PageSelector`;
        pageSelector.classList.add("mutable-page-selector");
        footer.appendChild(pageSelector);
        const createPageElement = (content, className = "", isDisabled = false, pageNumber = null) => {
            const pageDiv = document.createElement("div");
            pageDiv.className = `page ${className}`;
            if (pageNumber === page) {
                pageDiv.classList.add("active");
            }
            if (isDisabled)
                pageDiv.classList.add("disabled");
            pageDiv.innerHTML = content.toString();
            if (pageNumber && !isDisabled) {
                pageDiv.addEventListener("click", () => {
                    if (pageNumber !== null) {
                        this.mutable.options.paginator.page = pageNumber;
                        this.renderTable();
                        this.renderFooter();
                    }
                });
            }
            return pageDiv;
        };
        // Botón de página anterior
        pageSelector.appendChild(createPageElement(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5304 3.54967C15.8233 3.84256 15.8233 4.31744 15.5304 4.61033L9.01042 11.1303C8.53331 11.6074 8.53331 12.3926 9.01042 12.8697L15.5304 19.3897C15.8233 19.6826 15.8233 20.1574 15.5304 20.4503C15.2375 20.7432 14.7627 20.7432 14.4698 20.4503L7.94976 13.9303C6.88686 12.8674 6.88686 11.1326 7.94976 10.0697L14.4698 3.54967C14.7627 3.25678 15.2375 3.25678 15.5304 3.54967Z" fill="#292D32"/>
            </svg>`, "prev", page === 1, page - 1));
        // Crear elementos de página
        if (totalPages <= 6) {
            // Mostrar todas las páginas si hay menos de 6
            for (let i = 1; i <= totalPages; i++) {
                pageSelector.appendChild(createPageElement(i, i === page ? "active" : "", false, i));
            }
        }
        else {
            // Mostrar primera página
            pageSelector.appendChild(createPageElement(1, page === 1 ? "active" : "", false, 1));
            // Agregar puntos suspensivos si estamos lejos del inicio
            if (page > 4) {
                pageSelector.appendChild(createPageElement("...", "separator"));
            }
            // Rango dinámico (dos páginas antes y después de la activa)
            for (let i = Math.max(2, page - 2); i <= Math.min(totalPages - 1, page + 2); i++) {
                pageSelector.appendChild(createPageElement(i, i === page ? "active" : "", false, i));
            }
            // Agregar puntos suspensivos si estamos lejos del final
            if (page < totalPages - 3) {
                pageSelector.appendChild(createPageElement("...", "separator"));
            }
            // Mostrar última página
            pageSelector.appendChild(createPageElement(totalPages, page === totalPages ? "active" : "", false, totalPages));
        }
        // Botón de página siguiente
        pageSelector.appendChild(createPageElement(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.46957 20.4503C8.17668 20.1574 8.17668 19.6826 8.46957 19.3897L14.9896 12.8697C15.4667 12.3926 15.4667 11.6074 14.9896 11.1303L8.46957 4.61033C8.17668 4.31744 8.17668 3.84256 8.46957 3.54967C8.76246 3.25678 9.23734 3.25678 9.53023 3.54967L16.0503 10.0697C17.1132 11.1326 17.1132 12.8674 16.0503 13.9303L9.53023 20.4503C9.23734 20.7432 8.76246 20.7432 8.46957 20.4503Z" fill="#292D32"/>
            </svg>`, "next", page === totalPages, page + 1));
    }
    /*METODOS*/
    createDropdownButton(id, label, icon, includeOptions = false) {
        return `
        <div class="button-container">
            <div class="container-options">
                <button class="dropdown-button" onclick="toggleDropdown('${id}')">
                    ${label} ${icon}
                </button>
                <div class="dropdown-content" id="${id}">
                    ${includeOptions ? "" : ""}
                </div>
            </div>
        </div>
    `;
    }
    // BUILDERS
    buildHandlerHiddenColumns() {
        if (this.localStorage != null) {
            const uniqueId = this.localStorage.inMutableHash.id;
            let container = document.getElementById(`${uniqueId}_HideColumns`);
            if (container != null) {
                container.innerHTML = "";
                this.mutable.headers.forEach((item) => {
                    var _a;
                    let isChecked = ((_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.hideColumns.includes(item)) ? "" : "checked";
                    let option = `<div class="column-hide-control">
                            <input type="checkbox" class="hideColumn" id="${item}" ${isChecked}>
                            <label for="${item}">${item.toUpperCase()}</label>
                        </div>`;
                    container.innerHTML += option;
                });
                container.querySelectorAll(".hideColumn").forEach((checkbox) => {
                    checkbox.addEventListener("change", (event) => {
                        const target = event.target;
                        if (target && target.id) {
                            const columnId = target.id;
                            const isChecked = target.checked;
                            if (this.localStorage) {
                                if (isChecked) {
                                    this.localStorage.hideColumns = this.localStorage.hideColumns.filter((item) => item !== columnId);
                                }
                                else {
                                    if (!this.localStorage.hideColumns.includes(columnId)) {
                                        this.localStorage.hideColumns = [...this.localStorage.hideColumns, columnId];
                                    }
                                }
                                this.hideColumns();
                            }
                        }
                    });
                });
                this.hideColumns();
            }
        }
    }
    buildHandlerQuantityPaginator() {
        var _a, _b, _c, _d, _e;
        if (this.mutable && this.mutable.validate(this.mutable) && this.localStorage) {
            const uniqueId = (_a = this.localStorage.inMutableHash) === null || _a === void 0 ? void 0 : _a.id;
            if (!uniqueId)
                return;
            const optionsRecordsPerPage = (_c = (_b = this.mutable.options) === null || _b === void 0 ? void 0 : _b.paginator) === null || _c === void 0 ? void 0 : _c.optionsRecordsPerPage;
            const page = (_e = (_d = this.mutable.options) === null || _d === void 0 ? void 0 : _d.paginator) === null || _e === void 0 ? void 0 : _e.page;
            if (!optionsRecordsPerPage || typeof page !== "number")
                return;
            const dropdownItemsPerPage = document.getElementById(`${uniqueId}_ItemsPerPage`);
            if (dropdownItemsPerPage) {
                dropdownItemsPerPage.innerHTML = "";
            }
            else {
                return;
            }
            optionsRecordsPerPage.forEach((quantity) => {
                const button = document.createElement("button");
                button.classList.add("records-per-page");
                button.textContent = quantity.toString();
                button.addEventListener("click", () => {
                    const recordsPerPage = Number(quantity);
                    this.mutable.options.paginator.recordsPerPage = recordsPerPage;
                    this.getRecordsByPage(page);
                    // if (recordsPerPage > this.mutable.filteredData.length) {
                    this.mutable.options.paginator.page = 1;
                    // }
                    this.renderFooter();
                    this.renderTable();
                });
                dropdownItemsPerPage.appendChild(button);
            });
        }
    }
    buildSearcher() {
        if (this.localStorage) {
            const uniqueId = this.localStorage.inMutableHash.id;
            let searcher = document.getElementById(`${uniqueId}_searcher`);
            if (searcher && searcher instanceof HTMLInputElement) {
                searcher.addEventListener("keyup", () => {
                    this.search(searcher.value);
                    this.renderTable();
                    this.mutable.options.paginator.page = 1;
                    this.renderFooter();
                });
            }
        }
    }
    // Builder Filters
    // Builder Text
    //FUNCTIONALTIES
    orderBy(column) {
        if (this.localStorage) {
            this.localStorage.orderBy.column = column;
            if (this.localStorage.orderBy.column !== "") {
                let order = this.localStorage.orderBy.order || "ASC";
                if (order !== "ASC" && order !== "DESC") {
                    throw new Error("Order must be either 'ASC' or 'DESC'.");
                }
                this.mutable.filteredData.sort((a, b) => {
                    if (a[column] > b[column]) {
                        return order === "ASC" ? 1 : -1;
                    }
                    if (a[column] < b[column]) {
                        return order === "ASC" ? -1 : 1;
                    }
                    return 0;
                });
                this.localStorage.orderBy.column = column;
                this.localStorage.orderBy.order = order == "ASC" ? "DESC" : "ASC";
                this.localStorage.set();
            }
            this.renderTable();
        }
    }
    hideColumns() {
        if (this.localStorage) {
            if (!Array.isArray(this.localStorage.hideColumns)) {
                return;
            }
            this.mutable.filteredData = this.mutable.data.map((item, index) => ({
                ...item,
                mutable_index: index,
            }));
            this.mutable.filteredData.forEach((item) => {
                var _a, _b;
                (_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.hideColumns.forEach((prop) => {
                    if (item.hasOwnProperty(prop)) {
                        delete item[prop];
                    }
                });
                (_b = this.localStorage) === null || _b === void 0 ? void 0 : _b.set();
            });
            this.renderTable();
        }
    }
    getRecordsByPage(page = 1) {
        var _a;
        if (this.mutable.validate(this.mutable) && this.localStorage) {
            const uniqueId = (_a = this.localStorage.inMutableHash) === null || _a === void 0 ? void 0 : _a.id;
            const recordsPerPage = this.mutable.options.paginator.recordsPerPage;
            let counterPerPage = document.getElementById(`${uniqueId}_counterPerPage`);
            if (counterPerPage)
                counterPerPage.innerHTML = recordsPerPage.toString();
            const startIndex = recordsPerPage * (page - 1);
            const endIndex = startIndex + recordsPerPage;
            const currentPageData = this.mutable.filteredData.slice(startIndex, endIndex);
            return currentPageData;
        }
        return [];
    }
    search(value) {
        let searchableColumns = this.mutable.options.columns.filter((filter) => filter.searchable);
        if (this.mutable.options.searchableAll) {
            searchableColumns = Object.keys(this.mutable.data[0] || {}).map((key) => {
                return new Column({
                    name: key,
                    type: "text",
                });
            });
        }
        const searchString = value ? value.toString().toLowerCase() : "";
        const normalizedSearchString = searchString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        this.mutable.filteredData = this.mutable.data.filter((record) => {
            return searchableColumns.some((column) => {
                const fieldValue = record[column.name];
                if (column.type === "text" && typeof fieldValue === "string") {
                    const normalizedFieldValue = fieldValue
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");
                    return normalizedFieldValue.includes(normalizedSearchString);
                }
                else if (column.type === "number" && typeof fieldValue === "number") {
                    const fieldValueAsText = fieldValue
                        .toString()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");
                    return fieldValueAsText.includes(normalizedSearchString);
                }
                else if (column.type === "date-range" && typeof fieldValue === "string") {
                    const fieldValueAsText = fieldValue
                        .toUpperCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");
                    return fieldValueAsText.includes(normalizedSearchString);
                }
                return false;
            });
        });
    }
    selectOne(rowIndex, isChecked) {
        var _a, _b;
        this.mutable.data[rowIndex].selectable = isChecked;
        if (((_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.inMutableHash.id) != undefined)
            this.createRightSection((_b = this.localStorage) === null || _b === void 0 ? void 0 : _b.inMutableHash.id);
    }
    selectAll(event) {
        var _a, _b;
        const checkbox = event.target;
        if (checkbox.checked) {
            this.mutable.data.forEach((element) => {
                element.selectable = true;
            });
        }
        else {
            this.mutable.data.forEach((element) => {
                element.selectable = false;
            });
        }
        this.renderTable();
        if (((_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.inMutableHash.id) != undefined)
            this.createRightSection((_b = this.localStorage) === null || _b === void 0 ? void 0 : _b.inMutableHash.id);
    }
    //HELPERS
    static toggleDropdown(element_id) {
        const dropdown = document.getElementById(element_id);
        if (dropdown) {
            dropdown.classList.toggle("show");
        }
    }
    setupGlobalClickListener() {
        document.addEventListener("click", (event) => {
            const target = event.target;
            if (!target.closest(".dropdown-button") && !target.closest(".dropdown-content")) {
                const dropdowns = document.querySelectorAll(".dropdown-content.show");
                dropdowns.forEach((dropdown) => {
                    dropdown.classList.remove("show");
                });
            }
        });
    }
}
window.toggleDropdown = Mutable.toggleDropdown;
