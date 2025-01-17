// main.js
import Mutable from "./Classes/Mutable.js"; // Sin llaves, ya que es exportación por defecto
let data = [
    {
        id: 1,
        name: "Juan Pérez",
        birthdate: "1990-05-15",
        status: "active",
        salary: 35000,
        position: "Software Developer",
        profile: "Front-End",
        address: "Calle Falsa 123, Ciudad, País",
        email: "juan.perez@example.com",
        phone: "+1234567890",
    },
    {
        id: 2,
        name: "María Gómez",
        birthdate: "1988-12-20",
        status: "inactive",
        salary: 42000,
        position: "Project Manager",
        profile: "Management",
        address: "Avenida Central 456, Ciudad, País",
        email: "maria.gomez@example.com",
        phone: "+0987654321",
    },
    {
        id: 3,
        name: "Carlos Ruiz",
        birthdate: "1995-07-02",
        status: "active",
        salary: 38000,
        position: "Data Analyst",
        profile: "Data Science",
        address: "Calle Sol 789, Ciudad, País",
        email: "carlos.ruiz@example.com",
        phone: "+1122334455",
    },
];
new Mutable({
    container: "product_table",
    data: data,
    options: {
        hideColumns: ["name", "id"],
        paginator: { recordsPerPage: 20, optionsRecordsPerPage: [1, 7, 10, 20, 50] },
        columns: [
            {
                name: "id",
                type: "number",
                filter: true,
                value: "",
                searchable: true,
                sortable: true,
                render: function (value) {
                    return `<B>${value}</B>`;
                },
            },
            {
                name: "name",
                type: "text",
                filter: true,
                value: "",
                searchable: true,
                sortable: true,
            },
            {
                name: "birthdate",
                type: "date-range",
                filter: true,
                value: "",
                searchable: true,
                sortable: true,
            },
            {
                name: "status",
                type: "text",
                filter: true,
                value: "",
                searchable: true,
                sortable: true,
                render: function (param) {
                    if (param == "active") {
                        return `<i class="fad fa-times-circle"><i>`;
                    } else {
                        return `<i class="fad fa-check-circle"><i>`;
                    }
                },
            },
            {
                name: "salary",
                type: "number",
                filter: true,
                value: "",
                searchable: true,
                sortable: true,
            },
        ],
        sortableAll: true,
        searchableAll: true,
        filterableAll: false,
        selectableAll: false,
    },
    buttons: function (record) {
        return `<div class="mutable-container-buttons"><button class='mutable-btn info'><i class='fas fa-info'></i></button>
    <button class='mutable-btn warning'><i class='fas fa-ban'></i></button>
    <button class='mutable-btn success'><i class='fas fa-check'></i></button>
    <button class='mutable-btn danger'><i class='fas fa-trash'></i></button>
    </div>`;
    },
    buttonAux: {
        //Este objeto recibe todos los objetos checked, solo se muestra si selectableAll esta en true;
        content: "",
        classes: "",
        toltip: "",
        action: function (records) {},
    },
    buttonsTest: [
        {
            //Este es una variacion en BETA de los buttons
            visible: true,
            content: "",
            classes: "",
            toltip: "",
            action: function (record) {
                if (record.status != 1) {
                    this.visible = false;
                }
            },
        },
    ],
});
