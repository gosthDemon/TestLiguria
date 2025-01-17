<template>
    <div class="card p-4 mt-4">
        <div id="table"></div>
    </div>
</template>

<script>
import Mutable from "../../../../public/libs/Mutable.ts/dist/js/Classes/Mutable.js";

export default {
    name: "SolicitudPuertaTable",
    data() {
        return {
            tableData: [], // Aquí guardaremos los datos de la tabla
        };
    },
    async mounted() {
        // Cargar los datos al montar el componente
        await this.loadData();
    },
    methods: {
        async loadData() {
            try {
                const response = await fetch("/api/solicitud-puertas", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const res = await response.json();
                console.log(res.data);

                if (res.success === false) {
                    Swal.fire({
                        icon: "error",
                        title: "Ocurrió un error",
                        text: res.message,
                    });
                    return;
                }

                this.tableData = res.data; // Guardamos los datos en el estado

                // Inicializamos el Mutable con los nuevos datos
                new Mutable({
                    container: "table",
                    data: this.tableData,
                    options: {
                        filterableAll: false,
                    },
                    buttons: function (record) {
                        return `<div class="mutable-container-buttons">
                                    <button class='mutable-btn info' data-id='${record.id}' data-action='edit'><i class='fas fa-pencil'></i></button>
                                    <button class='mutable-btn danger' data-id='${record.id}' data-action='delete'><i class='fas fa-trash'></i></button>
                                </div>`;
                    },
                });

                // Agregamos el manejador de clics para los botones
                const table = document.getElementById("table");
                table.addEventListener("click", (event) => {
                    const button = event.target.closest("button");
                    if (!button) return;

                    const action = button.dataset.action;
                    const id = button.dataset.id;

                    if (action === "edit") {
                        this.handleEdit(id);
                    } else if (action === "delete") {
                        this.handleDelete(id);
                    }
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Ocurrió un error",
                    text: error.message,
                });
            }
        },

        handleEdit(id) {
            this.$router.push({ path: `/solicitud-puerta/edit/${id}` });
        },

        async handleDelete(id) {
            Swal.fire({
                icon: "warning",
                title: "Eliminar",
                text: `¿Estás seguro de eliminar el registro con ID ${id}?`,
                showCancelButton: true,
                confirmButtonText: "Eliminar",
                cancelButtonText: "Cancelar",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    console.log(`Eliminando registro con ID ${id}`);
                    try {
                        const response = await fetch(
                            `/api/solicitud-puertas/${id}`,
                            {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                },
                            }
                        );

                        const res = await response.json();

                        if (!response.ok) {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text:
                                    res.message ||
                                    "Ocurrió un error al eliminar el registro.",
                            });
                            return;
                        }

                        Swal.fire({
                            icon: "success",
                            title: "Eliminado",
                            text:
                                res.message ||
                                `Registro con ID ${id} eliminado correctamente.`,
                        });

                        // Actualiza la tabla después de eliminar
                        await this.loadData(); // Llamamos a loadData para recargar los datos
                    } catch (error) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text:
                                error.message ||
                                "Error al procesar la solicitud.",
                        });
                    }
                }
            });
        },
    },
};
</script>
