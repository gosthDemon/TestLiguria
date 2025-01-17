<template>
    <component :is="currentComponent" />
</template>

<script>
import FormComponent from "@/components/SolicitudPuerta/Form.vue";
import EditComponent from "@/components/SolicitudPuerta/Edit.vue";
import TableComponent from "@/components/SolicitudPuerta/Table.vue";

export default {
    name: "SolicitudPuerta",
    props: {
        action: {
            type: String,
            required: true,
        },
    },
    computed: {
        currentComponent() {
            return this.action === "create"
                ? FormComponent
                : this.action === "edit"
                ? EditComponent
                : TableComponent;
        },
    },
};
</script>
