<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="alto">Alto:</label>
                <input
                    type="range"
                    id="alto"
                    v-model="alto"
                    min="80"
                    max="96"
                    @input="handleInput"
                />
                <input type="text" :value="alto" readonly class="range-value" />
            </div>
            <div>
                <label for="ancho">Ancho:</label>
                <input
                    type="range"
                    id="ancho"
                    v-model="ancho"
                    min="24"
                    max="36"
                    @input="handleInput"
                />
                <input
                    type="text"
                    :value="ancho"
                    readonly
                    class="range-value"
                />
            </div>
            <div>
                <label for="modelo">Modelo:</label>
                <select id="modelo" v-model="modelo">
                    <option value="P400">P400</option>
                </select>
            </div>
            <button type="submit">Guardar</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            alto: 80,
            ancho: 24,
            modelo: "P400",
        };
    },
    methods: {
        handleInput() {
            console.log(`Alto: ${this.alto}, Ancho: ${this.ancho}`);
        },
        handleSubmit() {
            alert("Guardado");
        },
    },
};
</script>

<style scoped>
.range-value {
    width: 50px;
    text-align: center;
    margin-left: 10px;
}
</style>
