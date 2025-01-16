<template>
    <div class="dashboard">Hola, soy el dashboard</div>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            message: "Welcome to the dashboard!",
        };
    },
};
</script>

<style scoped>
.dashboard {
    padding: 20px;
}

h1 {
    color: #333;
}

p {
    color: #666;
}
</style>
