<template>
    <div class="card row mt-4">
        <div class="col-12 pt-4">
            <p class="title center">Solicitar Puerta</p>
        </div>
        <div class="col-12 col-md-6 p-7">
            <form @submit.prevent="handleSubmit">
                <div class="input-container">
                    <label for="modelo">Modelo:</label>
                    <select id="modelo" v-model="modelo">
                        <option value="P400">P400</option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="alto">Alto: {{ alto }}</label>
                    <input
                        type="range"
                        id="alto"
                        v-model="alto"
                        min="80"
                        max="96"
                        @input="drawDoor"
                    />
                </div>
                <div class="input-container">
                    <label for="ancho">Ancho: {{ ancho }}</label>
                    <input
                        type="range"
                        id="ancho"
                        v-model="ancho"
                        min="24"
                        max="36"
                        @input="drawDoor"
                    />
                </div>
                <div class="input-container">
                    <label for="precio">Precio:</label>
                    <input
                        type="number"
                        id="precio"
                        v-model="precio"
                        readonly
                    />
                </div>
                <br />
                <div class="col-12">
                    <div class="disclaimer col-12">
                        <span class="disclaimer-icon">
                            <i class="fas fa-info-circle"></i>
                        </span>
                        <span class="disclaimer-text">
                            El precio se calcula a 0.25$us extra por pulgada
                            cuadrada.
                        </span>
                    </div>
                </div>
                <br />
                <button type="submit" class="ui-button ui-btn-primary">
                    Guardar
                </button>
            </form>
        </div>
        <div class="col-12 col-md-6 flex-justify-center">
            <canvas ref="doorCanvas" width="300" height="500"></canvas>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            alto: 80,
            ancho: 24,
            modelo: "P400",
            precio: 300,
        };
    },
    methods: {
        drawDoor() {
            const canvas = this.$refs.doorCanvas;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.precio = 300 + (this.alto * this.ancho - 1920) * 0.25;
            // Escalar dimensiones para que se ajusten al canvas y centramos
            const scale = 4;
            const doorWidth = this.ancho * scale;
            const doorHeight = this.alto * scale;
            const x = (canvas.width - doorWidth) / 2;
            const y = (canvas.height - doorHeight) / 2;

            // Dibujar el rectángulo de la puerta y las cotas
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, doorWidth, doorHeight);

            ctx.font = "12px Arial";
            ctx.fillStyle = "black";

            //Cota horizontal (ancho)
            ctx.beginPath();
            ctx.moveTo(x, y + doorHeight + 20);
            ctx.lineTo(x + doorWidth, y + doorHeight + 20);
            ctx.stroke();
            ctx.fillText(
                `${this.ancho}"`,
                x + doorWidth / 2 - 10,
                y + doorHeight + 35
            );

            ctx.beginPath();
            ctx.moveTo(x, y + doorHeight + 15);
            ctx.lineTo(x, y + doorHeight + 25);
            ctx.moveTo(x + doorWidth, y + doorHeight + 15);
            ctx.lineTo(x + doorWidth, y + doorHeight + 25);
            ctx.stroke();

            // Cota vertical (alto)
            ctx.beginPath();
            ctx.moveTo(x - 20, y);
            ctx.lineTo(x - 20, y + doorHeight);
            ctx.stroke();
            ctx.save();
            ctx.translate(x - 35, y + doorHeight / 2 + 5);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(`${this.alto}"`, 0, 0);
            ctx.restore();

            ctx.beginPath();
            ctx.moveTo(x - 25, y);
            ctx.lineTo(x - 15, y);
            ctx.moveTo(x - 25, y + doorHeight);
            ctx.lineTo(x - 15, y + doorHeight);
            ctx.stroke();
        },
        async handleSubmit() {
            const data = {
                modelo: this.modelo,
                alto: this.alto,
                ancho: this.ancho,
                precio: this.precio,
            };

            try {
                const response = await fetch("/api/solicitud-puertas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: errorData.message,
                    });
                } else {
                    const result = await response.json();
                    Swal.fire({
                        icon: "success",
                        title: "Solicitud creada con éxito",
                        text: result.message,
                    });
                    this.alto = 80;
                    this.ancho = 24;
                    this.precio = 300;
                    this.drawDoor();
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Ocurrió un error",
                    text: error.message,
                });
            }
        },
    },
    mounted() {
        this.drawDoor();
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
